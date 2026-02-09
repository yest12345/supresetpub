#!/bin/bash

# Supreset 项目快速部署脚本
# 使用方法: bash scripts/deploy.sh

set -e

echo "🚀 开始部署 Supreset 项目..."

# 检查 Node.js
if ! command -v node &> /dev/null; then
  echo "❌ Node.js 未安装，请先安装 Node.js 20.x"
  exit 1
fi

echo "✅ Node.js 版本: $(node -v)"

# 检查 npm
if ! command -v npm &> /dev/null; then
  echo "❌ npm 未安装"
  exit 1
fi

echo "✅ npm 版本: $(npm -v)"

# 检查 .env 文件
if [ ! -f .env ]; then
  echo "⚠️  .env 文件不存在，正在从 .env.example 创建..."
  if [ -f .env.example ]; then
    cp .env.example .env
    echo "✅ 已创建 .env 文件，请编辑配置后再运行此脚本"
    exit 1
  else
    echo "❌ .env.example 文件不存在，请手动创建 .env 文件"
    exit 1
  fi
fi

echo "✅ .env 文件存在"

# 安装依赖
echo "📦 安装依赖..."
npm install

# 生成 Prisma Client
echo "🧩 生成 Prisma Client..."
npm run prisma:generate

# 创建上传目录
echo "📁 创建上传目录..."
mkdir -p public/uploads/{presets,covers,audio}
chmod -R 755 public/uploads

# 构建项目
echo "🏗️  构建项目..."
npm run build

echo "✅ 部署完成"
echo ""
echo "下一步："
echo "1. 确保数据库已创建并运行迁移: npm run prisma:migrate"
echo "2. 使用 PM2 启动应用: pm2 start npm --name 'supreset' -- start"
echo "3. 配置 Nginx 反向代理"
echo ""
echo "详细部署指南请查看: dev-docs/ECS_DEPLOYMENT.md"
