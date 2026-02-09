# 路径配置总结

## 快速参考

### 预设文件保存位置

```
相对路径: public/uploads/presets
绝对路径: nextjs-mysql/public/uploads/presets
URL 路径: /uploads/presets/文件名.fst
```

### 配置文件位置

```
src/config/upload.ts - 统一管理所有上传路径配置
```

### 初始化命令

```bash
npm run setup:uploads
```

## 文件说明

| 文件 | 作用 |
|------|------|
| `src/config/upload.ts` | 上传路径配置（相对路径） |
| `src/app/api/upload/route.ts` | 文件上传 API（使用配置） |
| `scripts/setup-upload-dirs.js` | 创建上传目录结构 |
| `docs/UPLOAD_PATH_CONFIG.md` | 详细路径配置文档 |
| `UPLOAD_GUIDE.md` | 上传功能使用指南 |

## 修改上传路径

1. 编辑 `src/config/upload.ts`
2. 修改 `UPLOAD_CONFIG` 中的路径配置
3. 运行 `npm run setup:uploads` 创建新目录

## 验证配置

上传文件后，检查控制台日志：

```
✅ 文件上传成功: preset
   原始文件名: my-preset.fst
   保存位置: public/uploads/presets/1234567890-abc.fst
   URL 路径: /uploads/presets/1234567890-abc.fst
   文件大小: 45.67 KB
```

## 相关文档

- 📖 [详细路径配置](docs/UPLOAD_PATH_CONFIG.md)
- 📖 [上传功能指南](UPLOAD_GUIDE.md)
