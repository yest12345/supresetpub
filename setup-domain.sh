#!/bin/bash

# 配置 supreset.com 域名到 ECS

DOMAIN="supreset.com"
WWW_DOMAIN="www.supreset.com"
OLD_DOMAIN="supreset.soda.work"
IP="47.109.131.215"
NGINX_CONFIG="/etc/nginx/sites-available/supreset"
PROJECT_DIR="/var/www/supreset@SODA/nextjs-mysql"

echo "=== 配置域名: $DOMAIN ==="
echo ""

# 步骤 1: 备份原配置
echo "步骤 1: 备份 Nginx 配置..."
sudo cp $NGINX_CONFIG ${NGINX_CONFIG}.backup.$(date +%Y%m%d_%H%M%S)
echo "✅ 备份完成"
echo ""

# 步骤 2: 更新 Nginx 配置
echo "步骤 2: 更新 Nginx 配置..."
sudo tee $NGINX_CONFIG > /dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN $WWW_DOMAIN $OLD_DOMAIN $IP;

    # 上传文件大小限制（50MB）
    client_max_body_size 50M;

    # 静态文件服务 - Next.js 构建文件
    location /_next/static {
        alias $PROJECT_DIR/.next/static;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    # 静态文件服务 - 上传的文件
    location /uploads {
        alias $PROJECT_DIR/public/uploads;
        expires 30d;
        add_header Cache-Control "public";
        default_type application/octet-stream;
    }

    # Next.js 应用代理
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        
        # 超时设置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
EOF

echo "✅ 配置已更新"
echo ""

# 步骤 3: 测试配置
echo "步骤 3: 测试 Nginx 配置..."
if sudo nginx -t; then
    echo "✅ 配置测试通过"
    echo ""
    
    # 重新加载 Nginx
    echo "步骤 4: 重新加载 Nginx..."
    sudo systemctl reload nginx
    echo "✅ Nginx 已重新加载"
else
    echo "❌ 配置测试失败，请检查错误信息"
    exit 1
fi

echo ""
echo "=== 配置完成 ==="
echo ""
echo "📋 下一步操作："
echo ""
echo "1. DNS 配置（在域名服务商处）："
echo "   - 添加 A 记录: @ -> $IP"
echo "   - 添加 A 记录: www -> $IP"
echo ""
echo "2. 等待 DNS 生效（5-30 分钟）"
echo "   检查命令: nslookup $DOMAIN"
echo ""
echo "3. 测试访问:"
echo "   - http://$DOMAIN"
echo "   - http://$WWW_DOMAIN"
echo ""
echo "4. 配置 SSL 证书（HTTPS，推荐）:"
echo "   sudo certbot --nginx -d $DOMAIN -d $WWW_DOMAIN"
echo ""


