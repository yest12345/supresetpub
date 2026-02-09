#!/bin/bash

# 验证应用状态并清理

echo "=== 步骤 1: 清理错误的 PM2 进程 ==="
# 删除 errored 状态的进程
pm2 delete 1 2>/dev/null || echo "进程 1 已删除或不存在"
pm2 delete 0 2>/dev/null || echo "进程 0 已删除或不存在"
echo "✅ 已清理错误进程"
echo ""

echo "=== 步骤 2: 检查运行中的应用 ==="
pm2 status
echo ""

echo "=== 步骤 3: 测试应用访问 ==="
echo "测试本地访问..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "302" ] || [ "$HTTP_CODE" = "301" ]; then
    echo "✅ 应用响应正常 (HTTP $HTTP_CODE)"
else
    echo "⚠️ 应用响应异常 (HTTP $HTTP_CODE)"
fi
echo ""

echo "=== 步骤 4: 检查端口监听 ==="
if netstat -tlnp | grep -q 3000; then
    echo "✅ 端口 3000 正在监听"
    netstat -tlnp | grep 3000
else
    echo "❌ 端口 3000 未监听"
fi
echo ""

echo "=== 步骤 5: 检查 Nginx 配置 ==="
if sudo nginx -t 2>&1 | grep -q "successful"; then
    echo "✅ Nginx 配置正确"
else
    echo "⚠️ Nginx 配置有问题"
    sudo nginx -t
fi
echo ""

echo "=== 步骤 6: 测试通过 Nginx 访问 ==="
echo "测试域名访问..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://supreset.soda.work)
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "302" ] || [ "$HTTP_CODE" = "301" ]; then
    echo "✅ 域名访问正常 (HTTP $HTTP_CODE)"
else
    echo "⚠️ 域名访问异常 (HTTP $HTTP_CODE)"
    echo "测试 IP 访问..."
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://47.109.131.215)
    echo "IP 访问状态: HTTP $HTTP_CODE"
fi
echo ""

echo "=== 步骤 7: 查看应用日志（最后 10 行）==="
pm2 logs supreset --lines 10 --nostream
echo ""

echo "=== 验证完成 ==="
echo ""
echo "如果应用正常运行，现在应该可以访问网站了"
echo "访问: http://supreset.soda.work 或 http://47.109.131.215"


