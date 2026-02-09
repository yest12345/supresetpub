# 上传路径配置说明

## 概述

本项目使用相对路径管理文件上传，所有上传文件统一保存在 `public/uploads/` 目录下。

## 目录结构

```
nextjs-mysql/                    # 项目根目录
├── public/
│   └── uploads/                 # 上传文件根目录（相对路径：public/uploads）
│       ├── presets/            # 预设文件存储（相对路径：public/uploads/presets）
│       ├── covers/             # 封面图片存储（相对路径：public/uploads/covers）
│       └── audio/              # 预览音频存储（相对路径：public/uploads/audio）
└── src/
    └── config/
        └── upload.ts           # 上传路径配置文件
```

## 配置文件

上传路径配置集中在 `src/config/upload.ts` 文件中：

```typescript
export const UPLOAD_CONFIG = {
  BASE_DIR: 'public/uploads',              // 基础目录（相对路径）
  PRESETS_DIR: 'presets',                  // 预设子目录
  COVERS_DIR: 'covers',                    // 封面子目录
  AUDIO_DIR: 'audio',                      // 音频子目录
  
  // 获取完整相对路径
  getPresetPath: () => 'public/uploads/presets',
  getCoverPath: () => 'public/uploads/covers',
  getAudioPath: () => 'public/uploads/audio',
  
  // 获取 URL 访问路径
  getPresetUrl: (filename) => `/uploads/presets/${filename}`,
  getCoverUrl: (filename) => `/uploads/covers/${filename}`,
  getAudioUrl: (filename) => `/uploads/audio/${filename}`,
}
```

## 路径类型说明

### 1. 相对路径（文件系统）
用于代码中引用和文件系统操作：
- 预设文件：`public/uploads/presets`
- 封面图片：`public/uploads/covers`
- 预览音频：`public/uploads/audio`

### 2. 绝对路径（文件系统）
实际保存时使用，由 Node.js 自动拼接：
- 完整路径：`process.cwd()` + 相对路径
- 示例：`D:\project\computor\supreset@SODA\nextjs-mysql\public\uploads\presets\文件名.fst`

### 3. URL 路径（前端访问）
用于浏览器访问上传的文件：
- 预设文件：`/uploads/presets/文件名.fst`
- 封面图片：`/uploads/covers/图片名.jpg`
- 预览音频：`/uploads/audio/音频名.mp3`

## 文件上传流程

1. **前端上传**：文件通过 `/api/upload` 接口上传
2. **路径确定**：根据文件类型（preset/cover/audio）确定相对路径
3. **文件保存**：转换为绝对路径，保存到文件系统
4. **返回 URL**：返回相对于网站根目录的 URL 路径给前端

## 初始化目录

运行以下命令创建上传目录结构：

```bash
npm run setup:uploads
```

该命令会：
- 创建 `public/uploads/` 目录
- 创建 `presets/`、`covers/`、`audio/` 子目录
- 显示目录结构确认信息

## 修改上传路径

如需修改上传路径，只需编辑 `src/config/upload.ts` 文件：

```typescript
// 示例：修改基础目录为 public/files
export const UPLOAD_CONFIG = {
  BASE_DIR: 'public/files',  // 修改这里
  // ... 其他配置
}
```

## 注意事项

1. **相对路径优势**：
   - 代码可移植性强
   - 不依赖特定的文件系统结构
   - 便于在不同环境（开发/生产）部署

2. **路径分隔符**：
   - 使用 Node.js `path.join()` 自动处理跨平台路径分隔符
   - Windows 和 Linux/Mac 均可正常工作

3. **安全性**：
   - 文件名使用时间戳 + 随机字符串，避免冲突
   - 验证文件类型和格式
   - 建议添加文件大小限制

4. **生产环境建议**：
   - 使用 CDN 托管上传文件
   - 或使用云存储服务（如 AWS S3、阿里云 OSS）
   - 配置反向代理缓存静态文件
