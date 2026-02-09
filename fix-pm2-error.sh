#!/bin/bash

# 修复 PM2 启动错误

cd /var/www/supreset@SODA/nextjs-mysql

echo "=== 步骤 1: 停止所有 PM2 进程 ==="
pm2 stop all
pm2 delete all
sleep 2
echo "✅ 已停止所有进程"
echo ""

echo "=== 步骤 2: 检查必要文件 ==="
if [ ! -f ".env" ]; then
    echo "❌ .env 文件不存在"
    exit 1
fi

if [ ! -d ".next" ]; then
    echo "⚠️ .next 目录不存在，需要重新构建"
    echo "正在构建..."
    npm run build
    if [ $? -ne 0 ]; then
        echo "❌ 构建失败"
        exit 1
    fi
fi
echo "✅ 文件检查通过"
echo ""

echo "=== 步骤 3: 检查端口占用 ==="
if netstat -tlnp | grep -q 3000; then
    echo "⚠️ 端口 3000 被占用，正在释放..."
    PID=$(netstat -tlnp | grep 3000 | awk '{print $7}' | cut -d'/' -f1)
    kill -9 $PID 2>/dev/null
    sleep 2
fi
echo "✅ 端口已释放"
echo ""

echo "=== 步骤 4: 使用 PM2 启动应用 ==="
# 设置环境变量并启动
pm2 start npm --name "supreset" -- start --update-env
sleep 5

echo "=== 步骤 5: 检查启动状态 ==="
pm2 status

if pm2 list | grep -q "supreset.*online"; then
    echo "✅ 应用启动成功"
else
    echo "❌ 应用启动失败，查看错误日志："
    pm2 logs supreset --lines 30 --err
    exit 1
fi

echo ""
echo "=== 步骤 6: 保存 PM2 配置 ==="
pm2 save

echo ""
echo "=== 修复完成 ==="
echo "查看日志: pm2 logs supreset"
echo "查看状态: pm2 status"


