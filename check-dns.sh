#!/bin/bash

# 检查 DNS 配置是否生效

DOMAIN="supreset.com"
WWW_DOMAIN="www.supreset.com"
EXPECTED_IP="47.109.131.215"

echo "=== 检查 DNS 配置 ==="
echo ""

# 检查主域名
echo "1. 检查 $DOMAIN:"
RESULT=$(nslookup $DOMAIN 2>/dev/null | grep -A 1 "Name:" | tail -1 | awk '{print $2}')
if [ "$RESULT" = "$EXPECTED_IP" ]; then
    echo "   ✅ DNS 已生效: $RESULT"
else
    echo "   ⚠️  DNS 未生效或指向其他 IP: $RESULT"
    echo "   期望 IP: $EXPECTED_IP"
fi
echo ""

# 检查 www 子域名
echo "2. 检查 $WWW_DOMAIN:"
RESULT=$(nslookup $WWW_DOMAIN 2>/dev/null | grep -A 1 "Name:" | tail -1 | awk '{print $2}')
if [ "$RESULT" = "$EXPECTED_IP" ]; then
    echo "   ✅ DNS 已生效: $RESULT"
else
    echo "   ⚠️  DNS 未生效或指向其他 IP: $RESULT"
    echo "   期望 IP: $EXPECTED_IP"
fi
echo ""

# 使用 dig 检查（如果可用）
if command -v dig &> /dev/null; then
    echo "3. 使用 dig 检查:"
    echo "   $DOMAIN:"
    dig +short $DOMAIN
    echo "   $WWW_DOMAIN:"
    dig +short $WWW_DOMAIN
    echo ""
fi

# 测试 HTTP 访问
echo "4. 测试 HTTP 访问:"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 5 http://$DOMAIN 2>/dev/null)
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "302" ] || [ "$HTTP_CODE" = "301" ]; then
    echo "   ✅ 网站可访问 (HTTP $HTTP_CODE)"
else
    echo "   ⚠️  网站无法访问 (HTTP $HTTP_CODE)"
    echo "   可能原因: DNS 未生效或 Nginx 配置问题"
fi
echo ""

echo "=== 检查完成 ==="


