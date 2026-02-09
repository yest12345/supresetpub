/**
 * 文件上传配置
 * 
 * 使用相对路径配置，所有路径相对于项目根目录 (nextjs-mysql/)
 */

// 相对路径配置
export const UPLOAD_CONFIG = {
  // 上传文件根目录（相对于项目根目录）
  BASE_DIR: 'public/uploads',
  
  // 各类文件的子目录
  PRESETS_DIR: 'presets',
  COVERS_DIR: 'covers',
  AUDIO_DIR: 'audio',
  
  // 获取完整的相对路径
  getPresetPath: () => `public/uploads/presets`,
  getCoverPath: () => `public/uploads/covers`,
  getAudioPath: () => `public/uploads/audio`,
  
  // 获取 URL 路径（用于前端访问）
  getPresetUrl: (filename: string) => `/uploads/presets/${filename}`,
  getCoverUrl: (filename: string) => `/uploads/covers/${filename}`,
  getAudioUrl: (filename: string) => `/uploads/audio/${filename}`,
} as const;

// 支持的文件格式
export const FILE_FORMATS = {
  PRESETS: ['.fst', '.fxp', '.rpl', '.rfxchain', '.patch', '.aupreset', '.exs', '.cst', '.adg', '.adv', '.alp', '.amxd', '.preset', '.song', '.tfx', '.ptxt', '.vstpreset', '.fxb', '.blx', '.blp'],
  IMAGES: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
  AUDIO: ['.mp3', '.wav', '.ogg', '.m4a']
} as const;

// 文件大小限制（字节）
export const FILE_SIZE_LIMITS = {
  PRESET: 50 * 1024 * 1024,  // 50 MB
  COVER: 5 * 1024 * 1024,     // 5 MB
  AUDIO: 10 * 1024 * 1024     // 10 MB
} as const;
