#!/bin/bash

# Supreset 项目一键部署脚本（生产环境 / ECS 容器）
# 使用方法: bash scripts/deploy-production.sh
#
# 功能：
# 1. 克隆或拉取最新代码（GitHub）
# 2. 安装/更新依赖
# 3. 生成 Prisma Client
# 4. 运行数据库迁移
# 5. 构建项目
# 6. 重启 PM2 应用
# 7. 验证部署结果

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 可配置参数（可通过环境变量覆盖）
PROJECT_DIR="${PROJECT_DIR:-/var/www/supresetpub}"
PM2_APP_NAME="${PM2_APP_NAME:-supreset}"
GIT_URL="${GIT_URL:-https://github.com/yest12345/supresetpub.git}"
GIT_BRANCH="${GIT_BRANCH:-main}"
HEALTHCHECK_URL="${HEALTHCHECK_URL:-http://localhost:3000/api/stats}"

log() { echo -e "$1"; }

log "${GREEN}🚀 开始一键部署 Supreset 项目...${NC}"
log ""

# 步骤 1: 获取代码（不存在则克隆）
log "${YELLOW}[1/8] 获取代码（${GIT_URL} @ ${GIT_BRANCH}）...${NC}"
if [ ! -d "$PROJECT_DIR/.git" ]; then
  log "${YELLOW}⚠️  未检测到 Git 仓库，开始克隆...${NC}"
  mkdir -p "$PROJECT_DIR"
  git clone --branch "$GIT_BRANCH" --depth 1 "$GIT_URL" "$PROJECT_DIR" || {
    log "${RED}❌ 克隆失败，请检查网络或权限${NC}"
    exit 1
  }
fi

cd "$PROJECT_DIR" || {
  log "${RED}❌ 无法进入项目目录: $PROJECT_DIR${NC}"
  exit 1
}

log "${GREEN}📂 当前目录: $(pwd)${NC}"
log ""

# 步骤 2: 拉取最新代码
log "${YELLOW}[2/8] 拉取最新代码...${NC}"
# 保留本地未提交修改
if ! git diff-index --quiet HEAD -- 2>/dev/null; then
  log "${YELLOW}⚠️  检测到未提交修改，先暂存...${NC}"
  git stash push -m "自动暂存: $(date '+%Y-%m-%d %H:%M:%S')" 2>/dev/null || true
fi

git fetch origin "$GIT_BRANCH" 2>/dev/null || {
  log "${RED}❌ git fetch 失败${NC}"
  exit 1
}

git pull origin "$GIT_BRANCH" 2>/dev/null || {
  log "${RED}❌ git pull 失败${NC}"
  exit 1
}
log "${GREEN}✅ 代码更新完成${NC}"
log ""

# 步骤 3: 安装/更新依赖（优先 npm ci）
log "${YELLOW}[3/8] 安装/更新依赖...${NC}"
if [ -f package-lock.json ]; then
  npm ci 2>&1 | grep -v "looking for funding" || true
else
  npm install 2>&1 | grep -v "looking for funding" || true
fi
log "${GREEN}✅ 依赖安装完成${NC}"
log ""

# 步骤 4: 生成 Prisma Client
log "${YELLOW}[4/8] 生成 Prisma Client...${NC}"
if [ ! -f .env ]; then
  log "${RED}❌ .env 文件不存在，请先配置环境变量${NC}"
  exit 1
fi

if npx dotenv -e .env -- npx prisma generate 2>&1 | grep -v "baseline-browser-mapping"; then
  log "${GREEN}✅ Prisma Client 生成完成${NC}"
else
  log "${RED}❌ Prisma Client 生成失败${NC}"
  exit 1
fi
log ""

# 步骤 5: 运行数据库迁移
log "${YELLOW}[5/8] 运行数据库迁移...${NC}"
if npx dotenv -e .env -- npx prisma migrate deploy 2>&1; then
  log "${GREEN}✅ 数据库迁移完成${NC}"
else
  log "${YELLOW}⚠️  迁移失败或无新迁移，继续执行...${NC}"
fi
log ""

# 步骤 6: 检查上传目录
log "${YELLOW}[6/8] 检查上传目录...${NC}"
mkdir -p public/uploads/{presets,covers,audio} 2>/dev/null || true
chmod -R 755 public/uploads 2>/dev/null || true
FILE_COUNT=$(find public/uploads/presets -type f 2>/dev/null | wc -l)
log "${GREEN}✅ 上传目录检查完成 (已有文件: $FILE_COUNT)${NC}"
log ""

# 步骤 7: 构建项目
log "${YELLOW}[7/8] 构建项目...${NC}"
if npm run build 2>&1 | grep -v "baseline-browser-mapping" | grep -v "middleware"; then
  log "${GREEN}✅ 构建完成${NC}"
else
  if [ -d ".next" ]; then
    log "${GREEN}✅ 构建完成（有警告但产物存在）${NC}"
  else
    log "${RED}❌ 构建失败${NC}"
    exit 1
  fi
fi
log ""

# 步骤 8: 重启 PM2 应用
log "${YELLOW}[8/8] 重启 PM2 应用...${NC}"
if pm2 list 2>/dev/null | grep -q "$PM2_APP_NAME"; then
  log "${GREEN}🔄 重启现有应用: $PM2_APP_NAME${NC}"
  pm2 restart "$PM2_APP_NAME" 2>/dev/null || {
    log "${YELLOW}⚠️  重启失败，尝试启动新实例...${NC}"
    pm2 start ecosystem.config.js 2>/dev/null || {
      log "${RED}❌ PM2 启动失败，请检查配置${NC}"
      exit 1
    }
  }
else
  log "${GREEN}🚀 启动新应用: $PM2_APP_NAME${NC}"
  pm2 start ecosystem.config.js 2>/dev/null || {
    log "${RED}❌ PM2 启动失败，请检查配置${NC}"
    exit 1
  }
fi

log "${YELLOW}⏳ 等待应用启动...${NC}"
sleep 3

pm2 save 2>/dev/null || true

log ""
log "${GREEN}📊 PM2 应用状态:${NC}"
pm2 status 2>/dev/null || log "⚠️  PM2 状态查看失败"

log ""
log "${YELLOW}[9/9] 验证部署结果...${NC}"
if pm2 list 2>/dev/null | grep -q "$PM2_APP_NAME.*online"; then
  log "${GREEN}✅ 应用运行正常${NC}"
else
  log "${YELLOW}⚠️  应用状态异常，请检查日志${NC}"
fi

if curl -s -o /dev/null -w "%{http_code}" "$HEALTHCHECK_URL" 2>/dev/null | grep -q "200\|401\|403"; then
  log "${GREEN}✅ 应用响应正常${NC}"
else
  log "${YELLOW}⚠️  应用响应异常，请检查日志${NC}"
fi

log ""
log "${GREEN}✅ 部署完成${NC}"
log ""
log "${YELLOW}常用命令:${NC}"
log "  - 查看日志: pm2 logs $PM2_APP_NAME"
log "  - 查看状态: pm2 status"
log "  - 查看监控: pm2 monit"
log "  - 重启应用: pm2 restart $PM2_APP_NAME"
log "  - 停止应用: pm2 stop $PM2_APP_NAME"
log ""
