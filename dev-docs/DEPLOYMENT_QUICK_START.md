# ECS 部署快速开始

## 🚀 5 分钟快速部署

### 前置条件
- ECS 服务器（Ubuntu 20.04+）
- 已安装 Node.js 20.x、MySQL、Nginx
- 已配置域名（可选）

### 步骤 1: 上传代码

```bash
# 在服务器上创建目录
sudo mkdir -p /var/www/supreset
sudo chown -R $USER:$USER /var/www/supreset
cd /var/www/supreset

# 方式1: Git 克隆
git clone https://your-repo-url.git .

# 方式2: SCP 上传（本地执行）
scp -r nextjs-mysql/* user@server-ip:/var/www/supreset/
```

### 步骤 2: 配置环境变量

```bash
cd /var/www/supreset
nano .env
```

创建 `.env` 文件，内容：

```env
DATABASE_URL="mysql://supreset_user:your_password@localhost:3306/supreset"
JWT_SECRET="$(openssl rand -base64 32)"
NODE_ENV="production"
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

### 步骤 3: 初始化数据库

```bash
# 在 MySQL 中创建数据库
sudo mysql -u root -p
```

```sql
CREATE DATABASE supreset CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'supreset_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON supreset.* TO 'supreset_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 步骤 4: 部署应用

```bash
# 运行部署脚本
bash scripts/deploy.sh

# 或手动执行
npm install
npm run prisma:generate
npm run prisma:migrate
mkdir -p public/uploads/{presets,covers,audio}
npm run build
```

### 步骤 5: 启动应用

```bash
# 使用 PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 步骤 6: 配置 Nginx

```bash
sudo nano /etc/nginx/sites-available/supreset
```

粘贴配置（见完整文档），然后：

```bash
sudo ln -s /etc/nginx/sites-available/supreset /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 步骤 7: SSL 证书（可选）

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 📝 常用命令

```bash
# 查看应用状态
pm2 status

# 查看日志
pm2 logs supreset

# 重启应用
pm2 restart supreset

# 更新代码
git pull && npm install && npm run build && pm2 restart supreset
```

## 🔍 故障排查

| 问题 | 解决方案 |
|------|---------|
| 502 Bad Gateway | 检查 `pm2 status`，确保应用运行 |
| 数据库连接失败 | 检查 `.env` 中的 `DATABASE_URL` |
| 文件上传失败 | 检查 `public/uploads` 目录权限 |
| 端口被占用 | `sudo netstat -tlnp \| grep 3000` |

详细文档: [ECS_DEPLOYMENT.md](./ECS_DEPLOYMENT.md)


