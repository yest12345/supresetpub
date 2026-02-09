#!/bin/bash

# 修复 502 Bad Gateway 错误

echo "=== 步骤 1: 检查应用进程 ==="
ps aux | grep -E "next-server|node.*start" | grep -v grep || echo "❌ 应用未运行"
echo ""

echo "=== 步骤 2: 检查端口 3000 ==="
netstat -tlnp | grep 3000 || echo "❌ 端口 3000 未监听"
echo ""

echo "=== 步骤 3: 检查应用日志 ==="
cd /var/www/supreset@SODA/nextjs-mysql
if [ -f "app.log" ]; then
    echo "最近的错误日志："
    tail -30 app.log | grep -i error || tail -20 app.log
else
    echo "⚠️ 未找到 app.log 文件"
fi
echo ""

echo "=== 步骤 4: 测试本地访问 ==="
curl -s -o /dev/null -w "HTTP状态码: %{http_code}\n" http://localhost:3000 || echo "❌ 无法访问 localhost:3000"
echo ""

echo "=== 步骤 5: 检查 Nginx 错误日志 ==="
sudo tail -20 /var/log/nginx/error.log | grep -i "502\|upstream\|connect" || echo "无相关错误"
echo ""

echo "=== 诊断完成 ==="


