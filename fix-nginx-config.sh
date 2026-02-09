#!/bin/bash

# 修复 Nginx 配置以支持文件下载

PROJECT_DIR="/var/www/supreset@SODA/nextjs-mysql"
NGINX_CONFIG="/etc/nginx/sites-available/supreset"

echo "=== 修复 Nginx 配置 ==="
echo "项目目录: $PROJECT_DIR"
echo ""

# 备份原配置
echo "备份原配置..."
sudo cp $NGINX_CONFIG ${NGINX_CONFIG}.backup.$(date +%Y%m%d_%H%M%S)
echo "✅ 备份完成"
echo ""

# 创建新的 Nginx 配置
echo "创建新的 Nginx 配置..."
sudo tee $NGINX_CONFIG > /dev/null <<EOF
server {
    listen 80;
    server_name supreset.soda.work 47.109.131.215;

    # 上传文件大小限制（50MB）
    client_max_body_size 50M;

    # 静态文件服务 - Next.js 构建文件
    location /_next/static {
        alias $PROJECT_DIR/.next/static;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    # 静态文件服务 - 上传的文件（重要！）
    location /uploads {
        alias $PROJECT_DIR/public/uploads;
        expires 30d;
        add_header Cache-Control "public";
        # 允许访问所有文件类型
        types {
            application/octet-stream .fst .fxp .rpl .rfxchain .patch .aupreset .exs .cst .adg .adv .alp .amxd .preset .songtemplate .tfx .ptxt .vstpreset .fxb;
            image/jpeg .jpg .jpeg;
            image/png .png;
            image/gif .gif;
            image/webp .webp;
            audio/mpeg .mp3;
            audio/wav .wav;
            audio/ogg .ogg;
            audio/mp4 .m4a;
        }
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

# 测试配置
echo "测试 Nginx 配置..."
sudo nginx -t
if [ $? -eq 0 ]; then
    echo "✅ 配置测试通过"
    echo ""
    echo "重新加载 Nginx..."
    sudo systemctl reload nginx
    echo "✅ Nginx 已重新加载"
else
    echo "❌ 配置测试失败，请检查错误信息"
    exit 1
fi

echo ""
echo "=== 修复完成 ==="
echo ""
echo "请测试下载功能："
echo "1. 访问 http://supreset.soda.work/presets"
echo "2. 点击任意预设的下载按钮"
echo "3. 检查是否能正常下载"


