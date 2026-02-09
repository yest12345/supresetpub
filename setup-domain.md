# 配置 supreset.com 域名到 ECS

## 步骤 1: DNS 配置

在你的域名服务商（如阿里云、腾讯云、GoDaddy 等）的 DNS 管理界面：

### 添加 A 记录

- **记录类型**: `A`
- **主机记录**: `@` (表示主域名，即 supreset.com)
- **记录值**: `47.109.131.215` (你的 ECS 公网 IP)
- **TTL**: `600` (或默认值)

### 添加 www 子域名（可选）

- **记录类型**: `A`
- **主机记录**: `www`
- **记录值**: `47.109.131.215`
- **TTL**: `600`

### DNS 生效时间
- 通常 5-30 分钟生效
- 可以使用 `nslookup supreset.com` 或 `dig supreset.com` 检查是否生效

## 步骤 2: 更新 Nginx 配置

在 ECS 服务器上执行：

```bash
sudo nano /etc/nginx/sites-available/supreset
```

更新 `server_name` 配置：

```nginx
server {
    listen 80;
    server_name supreset.com www.supreset.com supreset.soda.work 47.109.131.215;
    # ... 其他配置保持不变
}
```

## 步骤 3: 测试并重新加载 Nginx

```bash
# 测试配置
sudo nginx -t

# 重新加载
sudo systemctl reload nginx
```

## 步骤 4: 配置 SSL 证书（HTTPS，推荐）

使用 Let's Encrypt 免费证书：

```bash
# 安装 Certbot
sudo apt install -y certbot python3-certbot-nginx

# 申请证书（自动配置 Nginx）
sudo certbot --nginx -d supreset.com -d www.supreset.com
```

## 验证

1. 等待 DNS 生效后，访问 `http://supreset.com`
2. 如果配置了 SSL，访问 `https://supreset.com`


