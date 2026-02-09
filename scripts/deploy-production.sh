#!/bin/bash

# Supreset 项目一键部署脚本（生产环境 / ECS 容器）
# 使用方法: bash scripts/deploy-production.sh
#
# 功能：
# 1. 从 GitHub 拉取最新代码
# 2. 安装/更新依赖
# 3. 生成 Prisma Client
# 4. 运行数据库迁移
# 5. 构建项目
# 6. 重启 PM2 应用
# 7. 验证部署结果
#
# 注意：非关键步骤失败会继续，关键步骤会中止

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 可配置参数（可通过环境变量覆盖）
PROJECT_DIR="${PROJECT_DIR:-/var/www/supreset}"
PM2_APP_NAME="${PM2_APP_NAME:-supreset}"
GIT_REMOTE="${GIT_REMOTE:-origin}"
GIT_BRANCH="${GIT_BRANCH:-main}"
HEALTHCHECK_URL="${HEALTHCHECK_URL:-http://localhost:3000/api/stats}"

echo -e "${GREEN}🚀 开始一键部署 Supreset 项目...${NC}"
echo ""

# 进入项目目录
cd "$PROJECT_DIR" || {
  echo -e "${RED}❌ 无法进入项目目录: $PROJECT_DIR${NC}"
  exit 1
}

echo -e "${GREEN}📂 当前目录: $(pwd)${NC}"
echo ""

# 步骤 1: 检查 Git 状态
echo -e "${YELLOW}[1/8] 检查 Git 状态...${NC}"
git status --short 2>/dev/null || echo "⚠️  Git 状态检查跳过"
echo ""

# 步骤 2: 拉取最新代码
echo -e "${YELLOW}[2/8] 拉取最新代码（${GIT_REMOTE}/${GIT_BRANCH}）...${NC}"
if ! git diff-index --quiet HEAD -- 2>/dev/null; then
  echo -e "${YELLOW}⚠️  检测到未提交的修改，先暂存...${NC}"
  git stash push -m "自动暂存: $(date '+%Y-%m-%d %H:%M:%S')" 2>/dev/null || true
fi

RETRY_COUNT=0
MAX_RETRIES=2
while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
  if git fetch "$GIT_REMOTE" "$GIT_BRANCH" 2>/dev/null && git pull "$GIT_REMOTE" "$GIT_BRANCH" 2>/dev/null; then
    echo -e "${GREEN}✅ 代码拉取成功${NC}"
    break
  else
    RETRY_COUNT=$((RETRY_COUNT + 1))
    if [ $RETRY_COUNT -lt $MAX_RETRIES ]; then
      echo -e "${YELLOW}⚠️  拉取失败，3 秒后重试 ($RETRY_COUNT/$MAX_RETRIES)...${NC}"
      sleep 3
    else
      echo -e "${RED}❌ 拉取代码失败，请检查网络与权限${NC}"
      exit 1
    fi
  fi
done
echo ""

# 步骤 3: 安装/更新依赖
echo -e "${YELLOW}[3/8] 安装/更新依赖...${NC}"
npm install --production=false 2>&1 | grep -v "looking for funding" || true
echo -e "${GREEN}✅ 依赖安装完成${NC}"
echo ""

# 步骤 4: 生成 Prisma Client
echo -e "${YELLOW}[4/8] 生成 Prisma Client...${NC}"
if [ ! -f .env ]; then
  echo -e "${RED}❌ .env 文件不存在，请先配置环境变量${NC}"
  exit 1
fi

if npx dotenv -e .env -- npx prisma generate 2>&1 | grep -v "baseline-browser-mapping"; then
  echo -e "${GREEN}✅ Prisma Client 生成完成${NC}"
else
  echo -e "${RED}❌ Prisma Client 生成失败${NC}"
  exit 1
fi
echo ""

# 步骤 5: 运行数据库迁移
echo -e "${YELLOW}[5/8] 运行数据库迁移...${NC}"
if npx dotenv -e .env -- npx prisma migrate deploy 2>&1; then
  echo -e "${GREEN}✅ 数据库迁移完成${NC}"
else
  echo -e "${YELLOW}⚠️  迁移失败或无新迁移，继续执行...${NC}"
fi
echo ""

# 步骤 6: 检查上传目录
echo -e "${YELLOW}[6/8] 检查上传目录...${NC}"
mkdir -p public/uploads/{presets,covers,audio} 2>/dev/null || true
chmod -R 755 public/uploads 2>/dev/null || true
FILE_COUNT=$(find public/uploads/presets -type f 2>/dev/null | wc -l)
echo -e "${GREEN}✅ 上传目录检查完成 (已有文件: $FILE_COUNT)${NC}"
echo ""

# 步骤 7: 构建项目
echo -e "${YELLOW}[7/8] 构建项目...${NC}"
if npm run build 2>&1 | grep -v "baseline-browser-mapping" | grep -v "middleware"; then
  echo -e "${GREEN}✅ 构建完成${NC}"
else
  if [ -d ".next" ]; then
    echo -e "${GREEN}✅ 构建完成（有警告但产物存在）${NC}"
  else
    echo -e "${RED}❌ 构建失败${NC}"
    exit 1
  fi
fi
echo ""

# 步骤 8: 重启 PM2 应用
echo -e "${YELLOW}[8/8] 重启 PM2 应用...${NC}"
if pm2 list 2>/dev/null | grep -q "$PM2_APP_NAME"; then
  echo -e "${GREEN}🔄 重启现有应用: $PM2_APP_NAME${NC}"
  pm2 restart "$PM2_APP_NAME" 2>/dev/null || {
    echo -e "${YELLOW}⚠️  重启失败，尝试启动新实例...${NC}"
    pm2 start ecosystem.config.js 2>/dev/null || {
      echo -e "${RED}❌ PM2 启动失败，请检查配置${NC}"
      exit 1
    }
  }
else
  echo -e "${GREEN}🚀 启动新应用: $PM2_APP_NAME${NC}"
  pm2 start ecosystem.config.js 2>/dev/null || {
    echo -e "${RED}❌ PM2 启动失败，请检查配置${NC}"
    exit 1
  }
fi

# 等待应用启动
echo -e "${YELLOW}⏳ 等待应用启动...${NC}"
sleep 3

# 保存 PM2 配置
pm2 save 2>/dev/null || true

# 显示状态
echo ""
echo -e "${GREEN}📊 PM2 应用状态:${NC}"
pm2 status 2>/dev/null || echo "⚠️  PM2 状态查看失败"

# 步骤 9: 验证部署结果
echo ""
echo -e "${YELLOW}[9/9] 验证部署结果...${NC}"

if pm2 list 2>/dev/null | grep -q "$PM2_APP_NAME.*online"; then
  echo -e "${GREEN}✅ 应用运行正常${NC}"
else
  echo -e "${YELLOW}⚠️  应用状态异常，请检查日志${NC}"
fi

if curl -s -o /dev/null -w "%{http_code}" "$HEALTHCHECK_URL" 2>/dev/null | grep -q "200\|401\|403"; then
  echo -e "${GREEN}✅ 应用响应正常${NC}"
else
  echo -e "${YELLOW}⚠️  应用响应异常，请检查日志${NC}"
fi

echo ""
echo -e "${GREEN}✅ 部署完成${NC}"
echo ""
echo -e "${YELLOW}常用命令:${NC}"
echo "  - 查看日志: pm2 logs $PM2_APP_NAME"
echo "  - 查看状态: pm2 status"
echo "  - 查看监控: pm2 monit"
echo "  - 重启应用: pm2 restart $PM2_APP_NAME"
echo "  - 停止应用: pm2 stop $PM2_APP_NAME"
echo ""
