# 预设上传功能指南

## 上传目录结构

上传功能使用相对路径结构，文件会自动保存到项目根目录下的 `public/uploads/` 目录：

```
nextjs-mysql/
  public/
    uploads/
      presets/    # 预设文件存储目录 (相对路径: public/uploads/presets)
      covers/     # 封面图片存储目录 (相对路径: public/uploads/covers)
      audio/      # 预览音频存储目录 (相对路径: public/uploads/audio)
```

**路径说明：**
- **相对路径配置**: `public/uploads/presets` (相对于项目根目录)
- **物理保存路径**: `nextjs-mysql/public/uploads/presets/文件名`
- **访问 URL 路径**: `/uploads/presets/文件名`
- 这些目录会在首次上传文件时自动创建

> 💡 **路径配置详情**：查看 [docs/UPLOAD_PATH_CONFIG.md](docs/UPLOAD_PATH_CONFIG.md) 了解完整的路径配置说明和修改方法。
>
> 所有路径配置集中在 `src/config/upload.ts` 文件中，便于统一管理和修改。

## 支持的文件格式

### 预设文件格式

- **FL Studio**: `.fst`, `.zip`, `.fxp`
- **Reaper**: `.rpl`, `.rfxchain`, `.fxp`
- **Logic Pro**: `.patch`, `.aupreset`, `.exs`, `.cst`
- **Ableton Live**: `.adg`, `.adv`, `.alp`, `.amxd`
- **Studio One**: `.preset`, `.songtemplate`, `.fxp`
- **Pro Tools**: `.tfx`, `.ptxt`
- **Cubase**: `.vstpreset`, `.fxp`, `.fxb`
- **BandLab**: `.blx`, `.blp`

### 图片格式
- `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`

### 音频格式
- `.mp3`, `.wav`, `.ogg`, `.m4a`

## 使用方法

### 访问上传页面
- 通过导航栏右上角的"上传预设"按钮
- 或直接访问 `/presets/upload`

### 上传步骤

1. **填写基本信息**
   - 预设标题（必填）
   - 预设描述（可选）
   - 选择 DAW（必填）
   - 选择文件格式（必填）
   - 选择音乐风格标签（可选）
   - 设置公开状态

2. **上传文件**
   - 上传预设文件（必填）
   - 上传封面图片（可选）
   - 上传预览音频（可选）

3. **发布预设**
   - 点击"发布预设"按钮
   - 系统会自动上传所有文件并创建预设记录
   - 上传成功后会自动跳转到预设详情页

## API 端点

### 文件上传 API
- **POST** `/api/upload`
- 参数：
  - `file`: 要上传的文件
  - `type`: 文件类型 (`preset` | `cover` | `audio`)
- 返回：上传后的文件路径和相关信息

### 创建预设 API
- **POST** `/api/presets`
- 参数：包含预设的所有信息
- 返回：创建的预设记录

## 注意事项

1. 文件上传使用唯一的文件名（时间戳 + 随机字符串）防止冲突
2. 所有文件存储在 `public/uploads/` 目录下，可以直接通过 URL 访问
3. 建议在生产环境中配置 CDN 来托管上传的文件
4. 大文件上传可能需要调整服务器的文件大小限制

## 安全建议

1. 添加用户认证，确保只有登录用户才能上传
2. 实施文件大小限制（建议：预设文件 < 50MB，图片 < 5MB，音频 < 10MB）
3. 添加文件内容验证，防止恶意文件上传
4. 考虑使用云存储服务（如 AWS S3、阿里云 OSS）替代本地存储
