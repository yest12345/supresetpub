const fs = require('fs');
const path = require('path');

console.log('🚀 设置上传目录结构...\n');
console.log('📁 基于相对路径: public/uploads/\n');

// 创建上传目录结构（相对于项目根目录）
const uploadDirs = [
  { path: 'public/uploads', desc: '上传文件根目录' },
  { path: 'public/uploads/presets', desc: '预设文件存储目录' },
  { path: 'public/uploads/covers', desc: '封面图片存储目录' },
  { path: 'public/uploads/audio', desc: '预览音频存储目录' }
];

uploadDirs.forEach(({ path: dir, desc }) => {
  const dirPath = path.join(process.cwd(), dir);
  
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ 已创建: ${dir}`);
    console.log(`   说明: ${desc}`);
  } else {
    console.log(`✓ 已存在: ${dir}`);
    console.log(`   说明: ${desc}`);
  }
  console.log();
});

console.log('✨ 上传目录结构设置完成！');
console.log('\n📋 目录结构：');
console.log('   nextjs-mysql/');
console.log('   └── public/');
console.log('       └── uploads/');
console.log('           ├── presets/  (预设文件)');
console.log('           ├── covers/   (封面图片)');
console.log('           └── audio/    (预览音频)\n');
