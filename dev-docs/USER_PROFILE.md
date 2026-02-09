# 👤 个人资料功能文档

## 功能概述

完整的用户个人资料系统，包括：

- ✅ 用户资料展示页面
- ✅ 个人资料编辑
- ✅ 用户统计数据
- ✅ 用户上传的预设列表
- ✅ 用户收藏的预设列表
- ✅ 独立的收藏页面

## 页面结构

### 1. 个人资料页面 (`/users/[id]`)

**访问方式**:
- 导航栏用户菜单 → "个人资料"
- 直接访问: `http://localhost:3000/users/{userId}`

**页面元素**:

#### 顶部用户信息卡片
- 渐变背景条（紫色到粉色）
- 用户头像（显示头像图片或首字母）
- 用户名和角色标识（管理员徽章）
- 个人简介
- 加入日期
- 编辑资料按钮（仅限本人）

#### 统计数据面板
显示 5 个关键指标：
- **预设数** - 用户上传的预设总数
- **点赞数** - 用户获得的点赞总数
- **收藏数** - 用户获得的收藏总数
- **评论数** - 用户发表的评论总数
- **打赏数** - 用户收到的打赏总数

#### 标签页切换
- **上传的预设** - 显示用户创建的所有预设
- **收藏的预设** - 显示用户收藏的所有预设

#### 预设网格
- 响应式网格布局（1-4 列）
- 使用 PresetCard 组件展示
- 空状态提示和引导

### 2. 我的收藏页面 (`/favorites`)

**访问方式**:
- 导航栏用户菜单 → "我的收藏"
- 直接访问: `http://localhost:3000/favorites`

**功能特点**:
- 仅限已登录用户访问
- 显示所有收藏的预设
- 显示收藏总数
- 空状态引导到预设列表

## 编辑个人资料

### 编辑模式

点击"编辑资料"按钮后，可以修改：

1. **用户名** - 文本输入框
2. **个人简介** - 多行文本输入框（3 行）

**按钮**:
- **保存** - 提交修改
- **取消** - 放弃修改

### API 调用

```typescript
PUT /api/users/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "新用户名",
  "bio": "新的个人简介"
}
```

### 权限控制

- ✅ 只能编辑自己的资料
- ✅ 需要登录认证（JWT Token）
- ✅ 修改后自动更新显示
- ✅ 成功/失败提示

## 使用示例

### 前端组件使用

```typescript
import { useAuth } from '@/contexts/AuthContext'

function MyComponent() {
  const { user } = useAuth()
  
  // 访问用户资料
  const viewProfile = () => {
    router.push(`/users/${user.id}`)
  }
  
  // 访问收藏
  const viewFavorites = () => {
    router.push('/favorites')
  }
}
```

### API 调用示例

```typescript
// 获取用户资料
const response = await fetch(`/api/users/${userId}`)
const data = await response.json()

// 更新用户资料
const response = await fetch(`/api/users/${userId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    name: 'New Name',
    bio: 'New bio'
  })
})

// 获取用户收藏
const response = await fetch(`/api/favorites?userId=${userId}&limit=50`)
const data = await response.json()
const presets = data.data.map(fav => fav.preset)
```

## 相关 API 端点

### 用户资料 API

**GET** `/api/users/[id]` - 获取用户详情
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "用户名",
    "email": "user@example.com",
    "avatar": "/avatars/1.jpg",
    "bio": "个人简介",
    "role": "user",
    "createdAt": "2025-11-10T...",
    "_count": {
      "presets": 10,
      "likes": 25,
      "favorites": 15,
      "comments": 30,
      "receivedDonations": 5
    }
  }
}
```

**PUT** `/api/users/[id]` - 更新用户信息
```json
// Request
{
  "name": "新用户名",
  "bio": "新的个人简介"
}

// Response
{
  "success": true,
  "data": { /* 更新后的用户信息 */ }
}
```

### 收藏 API

**GET** `/api/favorites?userId={id}` - 获取用户收藏列表
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "userId": 1,
      "presetId": 5,
      "createdAt": "2025-11-10T...",
      "preset": {
        "id": 5,
        "title": "Preset Title",
        "daw": "FL Studio",
        // ... 完整预设信息
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 15,
    "totalPages": 1
  }
}
```

**POST** `/api/favorites` - 收藏/取消收藏
```json
// Request
{
  "userId": 1,
  "presetId": 5
}

// Response
{
  "success": true,
  "action": "favorited"  // 或 "unfavorited"
}
```

### 预设 API

**GET** `/api/presets?userId={id}` - 获取用户的预设
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Trap 808",
      "daw": "FL Studio",
      // ... 预设信息
    }
  ]
}
```

## 文件结构

```
src/
├── app/
│   ├── users/
│   │   └── [id]/
│   │       └── page.tsx          # 用户资料页面
│   └── favorites/
│       └── page.tsx               # 收藏页面
├── components/
│   ├── Navbar.tsx                 # 导航栏（含资料入口）
│   └── PresetCard.tsx             # 预设卡片组件
└── contexts/
    └── AuthContext.tsx            # 认证上下文
```

## UI 设计特点

### 响应式设计
- **移动端** (< 768px): 1 列
- **平板** (768px - 1024px): 2-3 列
- **桌面** (> 1024px): 3-4 列

### 颜色方案
- **主色**: 紫色 (#8b5cf6)
- **次要色**: 粉色 (#ec4899)
- **渐变**: 紫色到粉色
- **深色模式**: 完整支持

### 动画效果
- 页面切换过渡
- 悬停效果
- 加载状态动画
- 平滑的标签页切换

## 权限与安全

### 访问控制

| 操作 | 任何人 | 已登录 | 本人 | 管理员 |
|------|--------|--------|------|--------|
| 查看资料 | ✅ | ✅ | ✅ | ✅ |
| 查看预设列表 | ✅ | ✅ | ✅ | ✅ |
| 编辑资料 | ❌ | ❌ | ✅ | ✅ |
| 查看收藏 | ❌ | ❌ | ✅ | ✅ |

### 数据保护
- ✅ 邮箱在公开资料中不显示
- ✅ 密码永远不返回
- ✅ 编辑需要 JWT 认证
- ✅ Token 验证

## 测试指南

### 功能测试清单

#### 查看资料
- [ ] 访问自己的资料页面
- [ ] 访问其他用户的资料页面
- [ ] 查看用户统计数据
- [ ] 查看用户预设列表
- [ ] 查看用户收藏列表

#### 编辑资料
- [ ] 点击"编辑资料"按钮
- [ ] 修改用户名
- [ ] 修改个人简介
- [ ] 点击"保存"成功更新
- [ ] 点击"取消"放弃修改
- [ ] 未登录时无法编辑

#### 收藏页面
- [ ] 访问"我的收藏"
- [ ] 显示所有收藏的预设
- [ ] 点击预设查看详情
- [ ] 空状态正确显示
- [ ] 未登录自动跳转

### 测试步骤

1. **测试查看资料**
```bash
# 访问用户 1 的资料
http://localhost:3000/users/1

# 或访问自己的资料（登录后）
点击导航栏头像 → "个人资料"
```

2. **测试编辑资料**
```bash
# 必须登录
1. 访问自己的资料页
2. 点击"编辑资料"
3. 修改信息
4. 点击"保存"
```

3. **测试收藏功能**
```bash
# 添加收藏
1. 访问预设详情页
2. 点击"收藏"按钮
3. 访问"我的收藏"查看

# 查看收藏
http://localhost:3000/favorites
```

## 常见问题

### Q: 如何访问个人资料？
A: 点击导航栏右上角的头像，选择"个人资料"。

### Q: 能编辑别人的资料吗？
A: 不能，只能编辑自己的资料（管理员除外）。

### Q: 收藏的预设在哪里查看？
A: 
1. 个人资料页 → "收藏的预设"标签
2. 导航栏 → "我的收藏"

### Q: 统计数据多久更新？
A: 实时更新，刷新页面即可看到最新数据。

### Q: 可以设置头像吗？
A: 当前版本暂不支持上传头像，显示用户名首字母。后续版本会添加头像上传功能。

### Q: 个人简介有字数限制吗？
A: 建议不超过 500 字符，保持简洁。

## 下一步改进

### 优先级 P0
- [ ] 头像上传功能
- [ ] 邮箱修改功能
- [ ] 密码修改功能

### 优先级 P1
- [ ] 社交链接（Twitter, GitHub 等）
- [ ] 个人网站链接
- [ ] 成就系统（徽章）
- [ ] 关注/粉丝功能

### 优先级 P2
- [ ] 活动时间线
- [ ] 个人统计图表
- [ ] 导出资料功能
- [ ] 隐私设置

## 技术实现

### 状态管理
```typescript
// 使用 React Hooks
const [user, setUser] = useState<User | null>(null)
const [presets, setPresets] = useState<Preset[]>([])
const [loading, setLoading] = useState(true)
const [activeTab, setActiveTab] = useState<'presets' | 'favorites'>('presets')
const [isEditing, setIsEditing] = useState(false)
```

### 数据获取
```typescript
// 并发获取用户信息和预设
useEffect(() => {
  if (params.id) {
    fetchUserProfile()
    fetchUserPresets()
  }
}, [params.id, activeTab])
```

### 权限判断
```typescript
// 判断是否为本人
const isOwnProfile = currentUser?.id === parseInt(params.id)

// 条件渲染编辑按钮
{isOwnProfile && (
  <button onClick={() => setIsEditing(true)}>
    编辑资料
  </button>
)}
```

## 总结

个人资料功能已经完整实现，包括：

- ✅ 完整的用户资料展示
- ✅ 个人资料编辑（仅限本人）
- ✅ 统计数据展示
- ✅ 预设和收藏列表
- ✅ 独立的收藏页面
- ✅ 权限控制
- ✅ 响应式设计
- ✅ 深色模式支持

**立即体验**: 登录后点击右上角头像 → "个人资料"

享受你的个人主页吧！🎉
