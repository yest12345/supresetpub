# ECS 服务器部署指南

本文档详细说明如何在阿里云 ECS 服务器上部署 Supreset 项目。

## 📋 目录

1. [服务器环境准备](#服务器环境准备)
2. [数据库配置](#数据库配置)
3. [项目部署](#项目部署)
4. [Nginx 配置](#nginx-配置)
5. [进程管理](#进程管理)
6. [域名与SSL](#域名与ssl)
7. [维护与监控](#维护与监控)

---

## 一、服务器环境准备

### 1.1 系统要求

- **操作系统**: Ubuntu 20.04 LTS 或更高版本（推荐）
- **内存**: 至少 2GB（推荐 4GB+）
- **CPU**: 2 核或以上
- **磁盘**: 至少 20GB 可用空间

### 1.2 安装 Node.js

```bash
# 更新系统包
sudo apt update && sudo apt upgrade -y

# 安装 Node.js 20.x（LTS 版本）
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 验证安装
node -v  # 应该显示 v20.x.x
npm -v   # 应该显示 10.x.x

# 安装 PM2（进程管理器）
sudo npm install -g pm2
```

### 1.3 安装 MySQL

```bash
# 安装 MySQL
sudo apt install -y mysql-server

# 启动 MySQL 服务
sudo systemctl start mysql
sudo systemctl enable mysql

# 安全配置（设置 root 密码）
sudo mysql_secure_installation

# 登录 MySQL
sudo mysql -u root -p
```

在 MySQL 中创建数据库和用户：

```sql
-- 创建数据库
CREATE DATABASE supreset CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 创建用户（替换 'your_password' 为强密码）
CREATE USER 'supreset_user'@'localhost' IDENTIFIED BY 'your_password';

-- 授予权限
GRANT ALL PRIVILEGES ON supreset.* TO 'supreset_user'@'localhost';
FLUSH PRIVILEGES;

-- 退出
EXIT;
```

### 1.4 安装 Nginx

```bash
# 安装 Nginx
sudo apt install -y nginx

# 启动 Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# 检查状态
sudo systemctl status nginx
```

---

## 二、数据库配置

### 2.1 配置 MySQL 远程访问（可选）

如果需要从外部访问数据库：

```bash
# 编辑 MySQL 配置文件
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf

# 找到 bind-address，修改为：
bind-address = 0.0.0.0

# 重启 MySQL
sudo systemctl restart mysql
```

**注意**: 生产环境建议仅允许本地访问，确保防火墙规则正确配置。

---

## 三、项目部署

### 3.1 创建项目目录

```bash
# 创建项目目录
sudo mkdir -p /var/www/supreset
sudo chown -R $USER:$USER /var/www/supreset
cd /var/www/supreset
```

### 3.2 上传项目代码

**方式一：使用 Git（推荐）**

```bash
# 安装 Git
sudo apt install -y git

# 克隆项目（替换为你的仓库地址）
git clone https://github.com/your-username/nextjs-mysql.git .

# 或使用 SSH
git clone git@github.com:your-username/nextjs-mysql.git .
```

**方式二：使用 SCP 上传**

在本地电脑执行：

```bash
# 压缩项目（排除 node_modules）
tar -czf supreset.tar.gz --exclude='node_modules' --exclude='.next' nextjs-mysql/

# 上传到服务器（替换为你的服务器IP和用户）
scp supreset.tar.gz user@your-server-ip:/var/www/supreset/

# 在服务器上解压
cd /var/www/supreset
tar -xzf supreset.tar.gz --strip-components=1
```

### 3.3 安装依赖

```bash
cd /var/www/supreset

# 安装项目依赖
npm install --production=false

# 或仅安装生产依赖
npm ci --production=false
```

### 3.4 配置环境变量

```bash
# 创建 .env 文件
nano .env
```

添加以下内容（根据实际情况修改）：

```env
# 数据库连接
DATABASE_URL="mysql://supreset_user:your_password@localhost:3306/supreset"

# JWT 密钥（生成强随机字符串）
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# 环境
NODE_ENV="production"

# Next.js 配置
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

**生成 JWT_SECRET**：

```bash
# 使用 OpenSSL 生成随机密钥
openssl rand -base64 32

# 或使用 Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 3.5 初始化数据库

```bash
# 生成 Prisma Client
npm run prisma:generate

# 运行数据库迁移
npm run prisma:migrate

# 或使用 push（开发环境）
npm run prisma:push

# （可选）运行种子数据
npm run prisma:seed
```

### 3.6 创建上传目录

```bash
# 创建上传目录
mkdir -p public/uploads/{presets,covers,audio}

# 设置权限
chmod -R 755 public/uploads
```

### 3.7 构建项目

```bash
# 构建生产版本
npm run build
```

构建完成后，检查 `.next` 目录是否生成。

---

## 四、Nginx 配置

### 4.1 创建 Nginx 配置文件

```bash
sudo nano /etc/nginx/sites-available/supreset
```

添加以下配置（替换 `your-domain.com` 为你的域名）：

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # 上传文件大小限制（50MB）
    client_max_body_size 50M;

    # 静态文件服务
    location /_next/static {
        alias /var/www/supreset/.next/static;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    location /uploads {
        alias /var/www/supreset/public/uploads;
        expires 30d;
        add_header Cache-Control "public";
    }

    # Next.js 应用代理
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # 超时设置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

### 4.2 启用配置

```bash
# 创建符号链接
sudo ln -s /etc/nginx/sites-available/supreset /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重新加载 Nginx
sudo systemctl reload nginx
```

### 4.3 配置防火墙

```bash
# 允许 HTTP 和 HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# 允许 SSH（如果还没配置）
sudo ufw allow 22/tcp

# 启用防火墙
sudo ufw enable
```

---

## 五、进程管理

### 5.1 使用 PM2 启动应用

```bash
cd /var/www/supreset

# 启动应用
pm2 start npm --name "supreset" -- start

# 或使用 ecosystem 文件（推荐）
```

### 5.2 创建 PM2 配置文件

创建 `ecosystem.config.js`：

```bash
nano ecosystem.config.js
```

内容：

```javascript
module.exports = {
  apps: [{
    name: 'supreset',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/supreset',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    max_memory_restart: '1G',
    watch: false
  }]
}
```

创建日志目录：

```bash
mkdir -p logs
```

使用配置文件启动：

```bash
pm2 start ecosystem.config.js
```

### 5.3 PM2 常用命令

```bash
# 查看状态
pm2 status

# 查看日志
pm2 logs supreset

# 重启应用
pm2 restart supreset

# 停止应用
pm2 stop supreset

# 删除应用
pm2 delete supreset

# 保存当前进程列表（开机自启）
pm2 save

# 设置开机自启
pm2 startup
```

---

## 六、域名与 SSL

### 6.1 配置域名解析

在域名服务商处添加 A 记录：
- 主机记录: `@` 或 `www`
- 记录值: 你的 ECS 服务器公网 IP
- TTL: 600

### 6.2 安装 SSL 证书（Let's Encrypt）

```bash
# 安装 Certbot
sudo apt install -y certbot python3-certbot-nginx

# 获取证书（替换为你的域名和邮箱）
sudo certbot --nginx -d your-domain.com -d www.your-domain.com --email your-email@example.com --agree-tos --non-interactive

# 自动续期测试
sudo certbot renew --dry-run
```

证书会自动配置到 Nginx，并设置自动续期。

### 6.3 更新 Nginx 配置（SSL）

Certbot 会自动更新 Nginx 配置，添加 SSL 支持。如果需要手动配置，参考：

```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # SSL 配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # ... 其他配置同前
}

# HTTP 重定向到 HTTPS
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

---

## 七、维护与监控

### 7.1 日志查看

```bash
# PM2 日志
pm2 logs supreset

# Nginx 访问日志
sudo tail -f /var/log/nginx/access.log

# Nginx 错误日志
sudo tail -f /var/log/nginx/error.log

# Next.js 应用日志
tail -f /var/www/supreset/logs/pm2-out.log
tail -f /var/www/supreset/logs/pm2-error.log
```

### 7.2 更新部署流程

```bash
cd /var/www/supreset

# 1. 拉取最新代码
git pull origin main

# 2. 安装新依赖
npm install

# 3. 运行数据库迁移（如有）
npm run prisma:migrate

# 4. 重新生成 Prisma Client
npm run prisma:generate

# 5. 重新构建
npm run build

# 6. 重启应用
pm2 restart supreset
```

### 7.3 备份数据库

```bash
# 创建备份脚本
nano /var/www/supreset/scripts/backup-db.sh
```

内容：

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/supreset"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="supreset"
DB_USER="supreset_user"
DB_PASS="your_password"

mkdir -p $BACKUP_DIR
mysqldump -u $DB_USER -p$DB_PASS $DB_NAME > $BACKUP_DIR/backup_$DATE.sql

# 删除 7 天前的备份
find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete
```

设置执行权限：

```bash
chmod +x /var/www/supreset/scripts/backup-db.sh
```

添加到 crontab（每天凌晨 2 点备份）：

```bash
crontab -e

# 添加以下行
0 2 * * * /var/www/supreset/scripts/backup-db.sh
```

### 7.4 监控资源使用

```bash
# 查看系统资源
htop

# 查看磁盘使用
df -h

# 查看内存使用
free -h

# PM2 监控
pm2 monit
```

---

## 八、常见问题排查

### 8.1 应用无法启动

```bash
# 检查端口占用
sudo netstat -tlnp | grep 3000

# 检查环境变量
pm2 env supreset

# 查看详细错误
pm2 logs supreset --lines 100
```

### 8.2 数据库连接失败

```bash
# 测试数据库连接
mysql -u supreset_user -p supreset

# 检查 MySQL 服务状态
sudo systemctl status mysql

# 查看 MySQL 日志
sudo tail -f /var/log/mysql/error.log
```

### 8.3 文件上传失败

```bash
# 检查目录权限
ls -la public/uploads/

# 修复权限
chmod -R 755 public/uploads
chown -R $USER:$USER public/uploads
```

### 8.4 Nginx 502 错误

```bash
# 检查 Next.js 应用是否运行
pm2 status

# 检查端口监听
sudo netstat -tlnp | grep 3000

# 查看 Nginx 错误日志
sudo tail -f /var/log/nginx/error.log
```

---

## 九、安全建议

1. **防火墙配置**: 只开放必要端口（80, 443, 22）
2. **SSH 安全**: 禁用 root 登录，使用密钥认证
3. **定期更新**: 保持系统和依赖包更新
4. **备份策略**: 定期备份数据库和重要文件
5. **监控日志**: 定期检查应用和系统日志
6. **环境变量**: 不要在代码中硬编码敏感信息
7. **数据库权限**: 使用最小权限原则

---

## 十、快速部署检查清单

- [ ] Node.js 20.x 已安装
- [ ] MySQL 已安装并配置
- [ ] 数据库和用户已创建
- [ ] 项目代码已上传
- [ ] 依赖已安装
- [ ] `.env` 文件已配置
- [ ] Prisma Client 已生成
- [ ] 数据库迁移已执行
- [ ] 上传目录已创建
- [ ] 项目已构建
- [ ] Nginx 已配置
- [ ] PM2 已启动应用
- [ ] 域名解析已配置
- [ ] SSL 证书已安装
- [ ] 防火墙已配置
- [ ] 备份脚本已设置

---

## 联系与支持

如遇到问题，请检查：
1. 应用日志：`pm2 logs supreset`
2. Nginx 日志：`/var/log/nginx/error.log`
3. 系统日志：`journalctl -xe`

祝部署顺利！🎉


