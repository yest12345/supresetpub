# 🎵 Supreset API 文档

混音预设分享平台完整 API 接口文档

---

## 📋 目录

1. [用户管理 (Users)](#1-用户管理-users)
2. [预设管理 (Presets)](#2-预设管理-presets)
3. [下载记录 (Downloads)](#3-下载记录-downloads)
4. [点赞 (Likes)](#4-点赞-likes)
5. [收藏 (Favorites)](#5-收藏-favorites)
6. [评论 (Comments)](#6-评论-comments)
7. [打赏 (Donations)](#7-打赏-donations)
8. [通知 (Notifications)](#8-通知-notifications)
9. [标签 (Tags)](#9-标签-tags)
10. [统计 (Stats)](#10-统计-stats)

---

## 1. 用户管理 (Users)

### GET /api/users
获取用户列表

**Query 参数：**
- `page` - 页码（默认 1）
- `limit` - 每页数量（默认 20）
- `role` - 角色筛选（user/admin）

**响应示例：**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "用户名",
      "email": "user@example.com",
      "avatar": "/avatars/1.jpg",
      "bio": "个人简介",
      "role": "user",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "_count": {
        "presets": 10,
        "receivedDonations": 5
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

### POST /api/users
创建用户（注册）

**Request Body：**
```json
{
  "name": "用户名",
  "email": "user@example.com",
  "password": "password123",
  "avatar": "/avatars/1.jpg",
  "bio": "个人简介"
}
```

### GET /api/users/[id]
获取用户详情

### PUT /api/users/[id]
更新用户信息

### DELETE /api/users/[id]
删除用户

---

## 2. 预设管理 (Presets)

### GET /api/presets
获取预设列表

**Query 参数：**
- `page` - 页码
- `limit` - 每页数量
- `daw` - DAW 类型筛选（FL Studio, Reaper, Logic...）
- `tag` - 标签筛选
- `userId` - 用户 ID 筛选
- `search` - 搜索关键词
- `sort` - 排序方式（latest, popular, liked）

**响应示例：**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Trap 混音预设",
      "description": "适合 Trap 风格的混音预设",
      "daw": "FL Studio",
      "format": ".flp",
      "filePath": "/uploads/presets/preset1.flp",
      "fileSize": 1024000,
      "coverImage": "/covers/1.jpg",
      "downloads": 150,
      "likesCount": 30,
      "favoritesCount": 20,
      "isPublic": true,
      "previewAudio": "/preview/1.mp3",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "user": {
        "id": 1,
        "name": "创作者",
        "avatar": "/avatars/1.jpg"
      },
      "tags": [
        {
          "tag": {
            "id": 1,
            "name": "Trap"
          }
        }
      ],
      "_count": {
        "comments": 10,
        "likes": 30,
        "favorites": 20
      }
    }
  ]
}
```

### POST /api/presets
创建预设

**Request Body：**
```json
{
  "title": "预设标题",
  "description": "预设描述",
  "daw": "FL Studio",
  "format": ".flp",
  "filePath": "/uploads/presets/file.flp",
  "fileSize": 1024000,
  "coverImage": "/covers/1.jpg",
  "previewAudio": "/preview/1.mp3",
  "isPublic": true,
  "userId": 1,
  "tags": ["Trap", "Boom Bap"]
}
```

### GET /api/presets/[id]
获取预设详情

### PUT /api/presets/[id]
更新预设

### DELETE /api/presets/[id]
删除预设

---

## 3. 下载记录 (Downloads)

### POST /api/presets/[id]/download
记录下载并增加计数

**Request Body：**
```json
{
  "userId": 1  // 可选，未登录用户为 null
}
```

**响应示例：**
```json
{
  "success": true,
  "data": {
    "download": {
      "id": 1,
      "userId": 1,
      "presetId": 1,
      "ipAddress": "192.168.1.1",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "preset": {
      "id": 1,
      "title": "预设标题",
      "filePath": "/uploads/presets/file.flp",
      "downloads": 151
    }
  }
}
```

### GET /api/presets/[id]/download
获取预设的下载记录

---

## 4. 点赞 (Likes)

### POST /api/likes
点赞或取消点赞（Toggle）

**Request Body：**
```json
{
  "userId": 1,
  "presetId": 1
}
```

**响应示例：**
```json
{
  "success": true,
  "action": "liked",  // 或 "unliked"
  "data": {
    "id": 1,
    "userId": 1,
    "presetId": 1,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### GET /api/likes
获取点赞列表

**Query 参数：**
- `userId` - 用户 ID（获取该用户的所有点赞）
- `presetId` - 预设 ID（获取该预设的所有点赞）

---

## 5. 收藏 (Favorites)

### POST /api/favorites
收藏或取消收藏（Toggle）

**Request Body：**
```json
{
  "userId": 1,
  "presetId": 1
}
```

### GET /api/favorites
获取用户收藏列表

**Query 参数：**
- `userId` - 用户 ID（必需）
- `page` - 页码
- `limit` - 每页数量

---

## 6. 评论 (Comments)

### GET /api/comments
获取评论列表

**Query 参数：**
- `presetId` - 预设 ID
- `userId` - 用户 ID
- `parentId` - 父评论 ID（null 表示顶级评论）

### POST /api/comments
创建评论

**Request Body：**
```json
{
  "content": "评论内容",
  "presetId": 1,
  "userId": 1,
  "parentId": null  // 可选，回复评论时填写
}
```

### PUT /api/comments/[id]
更新评论

### DELETE /api/comments/[id]
删除评论

---

## 7. 打赏 (Donations)

### GET /api/donations
获取打赏记录

**Query 参数：**
- `donorId` - 打赏者 ID
- `creatorId` - 创作者 ID
- `presetId` - 预设 ID
- `page` - 页码
- `limit` - 每页数量

### POST /api/donations
创建打赏

**Request Body：**
```json
{
  "amount": 1000,  // 金额（分），1000 = 10.00 元
  "currency": "CNY",
  "donorId": 1,
  "creatorId": 2,
  "presetId": 1,  // 可选
  "message": "感谢分享！"  // 可选
}
```

---

## 8. 通知 (Notifications)

### GET /api/notifications
获取用户通知列表

**Query 参数：**
- `userId` - 用户 ID（必需）
- `unreadOnly` - 只获取未读通知（true/false）
- `page` - 页码
- `limit` - 每页数量

**响应示例：**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "userId": 1,
      "title": "新评论",
      "content": "有人评论了你的预设「Trap 混音预设」",
      "link": "/presets/1",
      "read": false,
      "type": "comment",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "unreadCount": 5
}
```

### POST /api/notifications
创建通知（系统使用）

### PUT /api/notifications
批量标记为已读

**Request Body：**
```json
{
  "userId": 1,
  "notificationIds": [1, 2, 3]  // 可选，不传则标记所有为已读
}
```

---

## 9. 标签 (Tags)

### GET /api/tags
获取所有标签

**Query 参数：**
- `popular` - 只获取热门标签（true/false）

**响应示例：**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Trap",
      "_count": {
        "presets": 50
      }
    }
  ]
}
```

### POST /api/tags
创建标签

**Request Body：**
```json
{
  "name": "Drill"
}
```

---

## 10. 统计 (Stats)

### GET /api/stats
获取统计数据

**Query 参数：**
- `type` - 统计类型：
  - `overview` - 平台总体统计
  - `trending` - 趋势数据（热门预设）
  - `daw` - DAW 分布统计
  - `user` - 用户统计（需要 userId 参数）

**响应示例（overview）：**
```json
{
  "success": true,
  "data": {
    "totalUsers": 1000,
    "totalPresets": 5000,
    "totalDownloads": 50000,
    "totalDonations": 100000  // 单位：分
  }
}
```

**响应示例（user）：**
```json
{
  "success": true,
  "data": {
    "presetsCount": 10,
    "likesCount": 30,
    "favoritesCount": 20,
    "downloadsCount": 100,
    "receivedDonations": 5000
  }
}
```

---

## 🔐 认证说明

当前 API 未实现认证机制。生产环境建议：

1. **使用 JWT** 进行身份验证
2. **添加中间件** 验证请求合法性
3. **权限控制** - 确保用户只能操作自己的资源

---

## 📊 支持的 DAW 类型

- FL Studio
- Reaper
- Logic Pro
- Ableton Live
- Studio One
- Pro Tools
- Cubase
- Other

---

## 🏷️ 常用标签

- Trap
- Boom Bap
- Drill
- Lo-Fi
- R&B
- Pop
- Rock
- EDM

---

## ⚡ 性能优化建议

1. **分页** - 所有列表接口都支持分页
2. **索引** - 数据库已添加必要索引
3. **缓存** - 建议对热门数据添加 Redis 缓存
4. **CDN** - 文件和图片使用 CDN 加速

---

## 🚀 快速测试

使用 Postman 或 curl 测试 API：

```bash
# 获取预设列表
curl http://localhost:3000/api/presets

# 创建用户
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"123456"}'

# 点赞预设
curl -X POST http://localhost:3000/api/likes \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"presetId":1}'
```

---

## 📝 注意事项

1. **文件上传** - 需要单独实现文件上传 API
2. **密码加密** - 生产环境务必使用 bcrypt 加密密码
3. **输入验证** - 建议使用 Zod 等库进行输入验证
4. **错误处理** - 统一错误响应格式
5. **日志记录** - 记录关键操作日志

---

完整 API 已准备就绪！🎉
