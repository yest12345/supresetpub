#!/bin/bash

# 重启 Next.js 应用以修复 502 错误

cd /var/www/supreset@SODA/nextjs-mysql

echo "=== 步骤 1: 停止现有进程 ==="
pkill -f next-server || echo "没有运行中的进程"
pkill -f "npm start" || echo "没有运行中的 npm 进程"
sleep 3

echo "=== 步骤 2: 检查端口是否释放 ==="
if netstat -tlnp | grep -q 3000; then
    echo "⚠️ 端口 3000 仍被占用，强制停止..."
    PID=$(netstat -tlnp | grep 3000 | awk '{print $7}' | cut -d'/' -f1)
    if [ -n "$PID" ]; then
        kill -9 $PID
        sleep 2
    fi
fi

echo "=== 步骤 3: 检查 .next 目录 ==="
if [ ! -d ".next" ]; then
    echo "⚠️ .next 目录不存在，需要重新构建"
    echo "正在构建..."
    npm run build
    if [ $? -ne 0 ]; then
        echo "❌ 构建失败，请检查错误信息"
        exit 1
    fi
fi

echo "=== 步骤 4: 检查环境变量 ==="
if [ ! -f ".env" ]; then
    echo "❌ .env 文件不存在"
    exit 1
fi

echo "=== 步骤 5: 启动应用 ==="
HOSTNAME=0.0.0.0 nohup npm start > app.log 2>&1 &
sleep 5

echo "=== 步骤 6: 验证启动 ==="
if ps aux | grep -q "[n]ext-server"; then
    echo "✅ 应用已启动"
else
    echo "❌ 应用启动失败，查看日志："
    tail -20 app.log
    exit 1
fi

if netstat -tlnp | grep -q 3000; then
    echo "✅ 端口 3000 正在监听"
else
    echo "❌ 端口 3000 未监听"
    exit 1
fi

echo "=== 步骤 7: 测试本地访问 ==="
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "302" ] || [ "$HTTP_CODE" = "301" ]; then
    echo "✅ 应用响应正常 (HTTP $HTTP_CODE)"
else
    echo "⚠️ 应用响应异常 (HTTP $HTTP_CODE)"
    echo "查看日志："
    tail -20 app.log
fi

echo ""
echo "=== 修复完成 ==="
echo "应用日志位置: /var/www/supreset@SODA/nextjs-mysql/app.log"
echo "查看日志: tail -f app.log"


