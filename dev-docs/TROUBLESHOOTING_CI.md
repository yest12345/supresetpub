# GitLab CI/CD 故障排查指南

## 🔍 如何查看失败原因

### 步骤 1: 进入 Pipeline 页面

访问：`https://jihulab.com/yest12345/supreset/-/pipelines`

### 步骤 2: 点击失败的 Pipeline

点击 Pipeline ID（如 #4610279）

### 步骤 3: 查看失败的作业

- 红色 ❌ 标记的作业就是失败的
- 点击失败的作业名称（如 `build`、`deploy:production`）

### 步骤 4: 查看错误日志

在作业日志中查找：
- `ERROR` 标记
- 红色错误信息
- 最后的错误堆栈

---

## 🐛 常见错误及解决方案

### 错误 1: 变量未配置

**错误信息**：
```
/bin/sh: eval: line 1: $SERVER_HOST: parameter not set
```

**解决方案**：
1. 进入 **Settings** → **CI/CD** → **Variables**
2. 添加缺失的变量：
   - `SERVER_HOST`
   - `SERVER_USER`
   - `SSH_PRIVATE_KEY`

---

### 错误 2: SSH 连接失败

**错误信息**：
```
Permission denied (publickey)
或
Host key verification failed
```

**解决方案**：

1. **检查 SSH 密钥配置**：
   ```bash
   # 在 ECS 服务器上
   cat ~/.ssh/authorized_keys
   # 确保包含 GitLab CI 的公钥
   ```

2. **重新生成密钥对**：
   ```bash
   # 在 ECS 服务器上
   ssh-keygen -t rsa -b 4096 -C "gitlab-ci" -f ~/.ssh/gitlab_ci_key
   cat ~/.ssh/gitlab_ci_key.pub >> ~/.ssh/authorized_keys
   cat ~/.ssh/gitlab_ci_key  # 复制到 GitLab
   ```

3. **检查 GitLab 变量**：
   - 确保 `SSH_PRIVATE_KEY` 是 **File** 类型
   - 确保私钥包含完整的 `-----BEGIN RSA PRIVATE KEY-----` 到 `-----END RSA PRIVATE KEY-----`

---

### 错误 3: 构建失败

**错误信息**：
```
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm run build failed
```

**解决方案**：

1. **检查本地构建**：
   ```bash
   # 在本地测试
   npm install
   npm run build
   ```

2. **检查 Node.js 版本**：
   - 确保 `.gitlab-ci.yml` 中的 `NODE_VERSION` 正确
   - 当前配置：`NODE_VERSION: "20"`

3. **检查依赖问题**：
   - 查看构建日志中的具体错误
   - 可能是某个依赖包版本不兼容

---

### 错误 4: 命令未找到

**错误信息**：
```
/bin/sh: npm: command not found
或
/bin/sh: pm2: command not found
```

**解决方案**：

1. **在部署脚本中添加 PATH**：
   编辑 `.gitlab-ci.yml`，在部署脚本中添加：
   ```yaml
   script:
     - |
       ssh $SERVER_USER@$SERVER_HOST << 'ENDSSH'
         export PATH=$PATH:/usr/local/bin:/usr/bin
         # ... 其他命令
       ENDSSH
   ```

2. **检查服务器环境**：
   ```bash
   # 在 ECS 服务器上
   which npm
   which pm2
   which node
   ```

---

### 错误 5: 数据库连接失败

**错误信息**：
```
Prisma Client initialization error
或
Can't reach database server
```

**解决方案**：

1. **检查服务器上的 `.env` 文件**：
   ```bash
   # 在 ECS 服务器上
   cat /var/www/supreset@SODA/nextjs-mysql/.env | grep DATABASE_URL
   ```

2. **暂时跳过 Prisma 操作**：
   - 部署脚本中已有 `|| echo` 处理
   - 如果还是失败，可以注释掉 Prisma 相关命令

---

### 错误 6: Git 操作失败

**错误信息**：
```
fatal: not a git repository
或
fatal: remote gitlab not found
```

**解决方案**：

1. **检查服务器上的 Git 配置**：
   ```bash
   # 在 ECS 服务器上
   cd /var/www/supreset@SODA/nextjs-mysql
   git remote -v
   # 如果没有 gitlab 远程，添加：
   git remote add gitlab https://jihulab.com/yest12345/supreset.git
   ```

2. **确保目录是 Git 仓库**：
   ```bash
   # 如果不是，初始化：
   git init
   git remote add gitlab https://jihulab.com/yest12345/supreset.git
   ```

---

## 🔧 调试技巧

### 1. 查看详细日志

在 GitLab Pipeline 页面：
- 点击失败的作业
- 查看完整的日志输出
- 查找 `ERROR` 或 `FAILED` 关键字

### 2. 本地测试命令

在本地或服务器上手动执行失败的命令：

```bash
# 例如，如果构建失败
npm install
npm run build

# 如果部署失败，手动执行部署脚本
cd /var/www/supreset@SODA/nextjs-mysql
git fetch gitlab main
git reset --hard gitlab/main
npm ci
npm run build
```

### 3. 添加调试输出

在 `.gitlab-ci.yml` 中添加更多调试信息：

```yaml
script:
  - echo "当前目录: $(pwd)"
  - echo "Node 版本: $(node -v)"
  - echo "npm 版本: $(npm -v)"
  - echo "环境变量: $SERVER_HOST"
```

---

## 📋 检查清单

遇到失败时，按顺序检查：

- [ ] GitLab CI/CD 变量是否已配置
- [ ] SSH 密钥是否正确配置
- [ ] 服务器上的项目目录是否存在
- [ ] 服务器上是否安装了 Node.js、npm、PM2
- [ ] 服务器上的 Git 远程仓库是否配置
- [ ] 服务器上的 `.env` 文件是否存在
- [ ] 本地构建是否成功（`npm run build`）
- [ ] 服务器上的权限是否正确

---

## 🚀 快速修复命令

如果部署失败，可以在服务器上手动执行：

```bash
cd /var/www/supreset@SODA/nextjs-mysql

# 拉取最新代码
git fetch gitlab main
git reset --hard gitlab/main

# 安装依赖
npm ci

# 生成 Prisma Client
npm run prisma:generate

# 构建项目
npm run build

# 重启应用
pm2 restart supreset || pm2 start npm --name supreset -- start
```

---

## 💡 建议

1. **先修复构建阶段**：确保 `build` 作业成功
2. **再修复部署阶段**：确保服务器环境配置正确
3. **逐步调试**：一次解决一个问题
4. **查看日志**：仔细阅读错误信息

---

如果还是无法解决，请把具体的错误日志发给我，我会帮你分析。


