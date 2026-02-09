# Supreset - 预设分享平台

基于 Next.js 16 + Prisma + MySQL 的预设文件分享平台。

## 技术栈

- **框架**: Next.js 16 (App Router)
- **数据库**: MySQL + Prisma ORM
- **样式**: Tailwind CSS
- **语言**: TypeScript
- **动画**: Three.js / OGL

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env` 并配置数据库连接：

```env
DATABASE_URL="mysql://用户名:密码@localhost:3306/supreset"
NODE_ENV="development"
```

### 3. 初始化数据库

```bash
# 生成 Prisma Client
npm run prisma:generate

# 创建数据库迁移
npm run prisma:migrate

# 查看数据库（可选）
npm run prisma:studio
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 数据库模型

### 核心实体
- **User** - 用户管理
- **Preset** - 混音预设
- **Tag** - 标签分类
- **TagOnPreset** - 预设标签关联

### 互动功能
- **Like** - 点赞
- **Favorite** - 收藏
- **Comment** - 评论（支持嵌套回复）
- **DownloadHistory** - 下载记录

### 扩展功能
- **Donation** - 打赏支持
- **Notification** - 系统通知

详见 `prisma/schema.prisma` 和 `API_DOCUMENTATION.md`

## 可用脚本

```bash
npm run dev              # 启动开发服务器
npm run build            # 构建生产版本
npm run start            # 启动生产服务器
npm run prisma:generate  # 生成 Prisma Client
npm run prisma:migrate   # 创建数据库迁移
npm run prisma:studio    # 打开数据库管理界面
npm run prisma:push      # 推送 schema 到数据库（无迁移）
```

## API 接口

完整的 RESTful API，包含 10 大模块：

1. **用户管理** - 注册、登录、个人信息
2. **预设管理** - 上传、浏览、搜索、筛选
3. **下载统计** - 下载记录和热度追踪
4. **点赞/收藏** - 用户互动功能
5. **评论系统** - 支持嵌套回复
6. **打赏功能** - 支持创作者
7. **通知系统** - 实时消息提醒
8. **标签分类** - 风格标签管理
9. **数据统计** - 平台和用户数据分析
10. **文件管理** - 预设文件存储

📘 详细文档：[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## 项目结构

```
supreset/
├── src/
│   ├── app/
│   │   ├── api/          # API 路由
│   │   │   ├── users/
│   │   │   ├── presets/
│   │   │   ├── likes/
│   │   │   ├── favorites/
│   │   │   ├── comments/
│   │   │   ├── donations/
│   │   │   ├── notifications/
│   │   │   ├── tags/
│   │   │   └── stats/
│   │   ├── components/   # React 组件
│   │   └── ...
│   └── lib/              # 工具库
│       └── prisma.ts     # Prisma Client
├── prisma/
│   ├── schema.prisma     # 数据库模型
│   └── migrations/       # 数据库迁移
├── public/
│   └── uploads/          # 上传文件存储
└── API_DOCUMENTATION.md  # API 文档
```

## 支持的 DAW

- FL Studio (.flp)
- Reaper (.rfxchain, .rpp)
- Logic Pro (.logicx)
- Ableton Live (.als)
- Studio One
- Pro Tools
- Cubase
- 其他
