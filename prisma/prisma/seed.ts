import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

// DAW 和支持的文件格式数据
const dawData = [
  {
    name: 'FL Studio',
    formats: ['.fst', '.zip', '.fxp'],
    description: '.fst 为插件预设，.zip 为工程包，.fxp 为插件参数格式。'
  },
  {
    name: 'Reaper',
    formats: ['.rpl', '.rfxchain', '.fxp'],
    description: '.rfxchain 是效果链文件，.rpl 是项目文件预设列表。'
  },
  {
    name: 'Logic Pro',
    formats: ['.patch', '.aupreset', '.exs', '.cst'],
    description: '.patch 为乐器预设，.aupreset 为 Audio Unit 插件预设。'
  },
  {
    name: 'Ableton Live',
    formats: ['.adg', '.adv', '.alp', '.amxd'],
    description: '.adg 是设备组预设，.alp 为单设备预设。'
  },
  {
    name: 'Studio One',
    formats: ['.preset', '.songtemplate', '.fxp'],
    description: '.preset 是插件预设文件，.songtemplate 为项目模板。'
  },
  {
    name: 'Pro Tools',
    formats: ['.tfx', '.ptxt'],
    description: '.tfx 是插件预设 (AAX 格式)，.ptxt 为会话模板。'
  },
  {
    name: 'Cubase',
    formats: ['.vstpreset', '.fxp', '.fxb'],
    description: '.vstpreset 为 VST3 预设格式，.fxb 为多预设库文件。'
  }
]

// 音乐风格标签
const tags = [
  'Trap',
  'Boom Bap',
  'Drill',
  'Lo-Fi',
  'R&B',
  'Pop',
  'Rock',
  'EDM',
  'Hip Hop',
  'House',
  'Techno',
  'Dubstep',
  'Future Bass',
  'Chillwave',
  'Ambient'
]

// 示例用户
const users = [
  {
    name: 'DJ Master',
    email: 'dj@example.com',
    password: '123456',
    bio: '专注 Trap 和 Drill 风格混音，5年制作经验',
    avatar: '/avatars/dj-master.jpg'
  },
  {
    name: 'Beat Producer',
    email: 'beat@example.com',
    password: '123456',
    bio: 'Boom Bap 和 Lo-Fi 制作人',
    avatar: '/avatars/beat-producer.jpg'
  },
  {
    name: 'EDM Creator',
    email: 'edm@example.com',
    password: '123456',
    bio: '电子音乐制作，擅长 House 和 Techno',
    avatar: '/avatars/edm-creator.jpg'
  }
]

// 示例预设
const presets = [
  {
    title: 'Trap 808 混音预设',
    description: '专业的 Trap 风格 808 低音混音链，包含压缩、EQ 和饱和度处理',
    daw: 'FL Studio',
    format: '.fst',
    filePath: '/uploads/presets/trap-808-chain.fst',
    fileSize: 512000,
    coverImage: '/covers/trap-808.jpg',
    previewAudio: '/preview/trap-808.mp3',
    tags: ['Trap', 'Hip Hop']
  },
  {
    title: 'Boom Bap 鼓组预设',
    description: '经典 90 年代 Boom Bap 风格鼓组，温暖且有力',
    daw: 'Reaper',
    format: '.rfxchain',
    filePath: '/uploads/presets/boom-bap-drums.rfxchain',
    fileSize: 256000,
    coverImage: '/covers/boom-bap.jpg',
    previewAudio: '/preview/boom-bap.mp3',
    tags: ['Boom Bap', 'Hip Hop']
  },
  {
    title: 'Drill 弦乐混音',
    description: 'UK Drill 风格弦乐混音预设，带有独特的空间感',
    daw: 'Logic Pro',
    format: '.patch',
    filePath: '/uploads/presets/drill-strings.patch',
    fileSize: 384000,
    coverImage: '/covers/drill-strings.jpg',
    previewAudio: '/preview/drill-strings.mp3',
    tags: ['Drill', 'Hip Hop']
  },
  {
    title: 'Lo-Fi 氛围音色',
    description: '温暖的 Lo-Fi 氛围音色，带有磁带饱和度和降采样效果',
    daw: 'Ableton Live',
    format: '.adg',
    filePath: '/uploads/presets/lofi-ambient.adg',
    fileSize: 128000,
    coverImage: '/covers/lofi-ambient.jpg',
    previewAudio: '/preview/lofi-ambient.mp3',
    tags: ['Lo-Fi', 'Chillwave', 'Ambient']
  },
  {
    title: 'EDM Synth Lead',
    description: '强劲的 EDM lead 音色，适合 Drop 部分',
    daw: 'Cubase',
    format: '.vstpreset',
    filePath: '/uploads/presets/edm-lead.vstpreset',
    fileSize: 64000,
    coverImage: '/covers/edm-lead.jpg',
    previewAudio: '/preview/edm-lead.mp3',
    tags: ['EDM', 'House', 'Future Bass']
  }
]

async function main() {
  console.log('🌱 开始种子数据初始化...\n')

  // 1. 创建标签
  console.log('📝 创建标签...')
  for (const tagName of tags) {
    await prisma.tag.upsert({
      where: { name: tagName },
      update: {},
      create: { name: tagName }
    })
    console.log(`  ✅ ${tagName}`)
  }
  console.log(`✅ 完成：创建了 ${tags.length} 个标签\n`)

  // 2. 创建用户
  console.log('👤 创建用户...')
  const createdUsers = []
  for (const userData of users) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: userData
    })
    createdUsers.push(user)
    console.log(`  ✅ ${user.name} (${user.email})`)
  }
  console.log(`✅ 完成：创建了 ${createdUsers.length} 个用户\n`)

  // 3. 创建预设
  console.log('🎵 创建预设...')
  for (let i = 0; i < presets.length; i++) {
    const presetData = presets[i]
    const user = createdUsers[i % createdUsers.length]

    const tagRecords = await prisma.tag.findMany({
      where: {
        name: {
          in: presetData.tags
        }
      }
    })

    const preset = await prisma.preset.create({
      data: {
        title: presetData.title,
        description: presetData.description,
        daw: presetData.daw,
        format: presetData.format,
        filePath: presetData.filePath,
        fileSize: presetData.fileSize,
        coverImage: presetData.coverImage,
        previewAudio: presetData.previewAudio,
        userId: user.id,
        tags: {
          create: tagRecords.map(tag => ({
            tagId: tag.id
          }))
        }
      }
    })
    console.log(`  ✅ ${preset.title} - ${preset.daw}`)
  }
  console.log(`✅ 完成：创建了 ${presets.length} 个预设\n`)

  // 4. 创建互动数据
  console.log('💬 创建互动数据...')
  
  const allPresets = await prisma.preset.findMany()
  const allUsers = await prisma.user.findMany()

  for (let i = 0; i < 3; i++) {
    const preset = allPresets[i]
    const user = allUsers[(i + 1) % allUsers.length]
    await prisma.like.create({
      data: {
        userId: user.id,
        presetId: preset.id
      }
    })
    await prisma.preset.update({
      where: { id: preset.id },
      data: { likesCount: { increment: 1 } }
    })
  }
  console.log('  ✅ 创建了点赞数据')

  for (let i = 0; i < 2; i++) {
    const preset = allPresets[i]
    const user = allUsers[(i + 2) % allUsers.length]
    await prisma.favorite.create({
      data: {
        userId: user.id,
        presetId: preset.id
      }
    })
    await prisma.preset.update({
      where: { id: preset.id },
      data: { favoritesCount: { increment: 1 } }
    })
  }
  console.log('  ✅ 创建了收藏数据')

  const comments = [
    { content: '这个预设太棒了！音色非常干净', presetIndex: 0, userIndex: 1 },
    { content: '正是我一直在找的 808 音色，感谢分享', presetIndex: 0, userIndex: 2 },
    { content: '经典的 Boom Bap 味道，很有年代感', presetIndex: 1, userIndex: 0 },
    { content: 'Lo-Fi 氛围感满满，已收藏', presetIndex: 3, userIndex: 1 }
  ]

  for (const commentData of comments) {
    await prisma.comment.create({
      data: {
        content: commentData.content,
        presetId: allPresets[commentData.presetIndex].id,
        userId: allUsers[commentData.userIndex].id
      }
    })
  }
  console.log('  ✅ 创建了评论数据')
  console.log(`✅ 完成：创建了互动数据\n`)

  // 5. 输出 DAW 信息
  console.log('📋 支持的 DAW 和文件格式：\n')
  for (const daw of dawData) {
    console.log(`  ${daw.name}`)
    console.log(`    格式: ${daw.formats.join(', ')}`)
    console.log(`    说明: ${daw.description}\n`)
  }

  // 6. 显示统计
  const stats = await Promise.all([
    prisma.user.count(),
    prisma.preset.count(),
    prisma.tag.count(),
    prisma.like.count(),
    prisma.favorite.count(),
    prisma.comment.count()
  ])

  console.log('📊 数据库统计：')
  console.log(`  用户: ${stats[0]}`)
  console.log(`  预设: ${stats[1]}`)
  console.log(`  标签: ${stats[2]}`)
  console.log(`  点赞: ${stats[3]}`)
  console.log(`  收藏: ${stats[4]}`)
  console.log(`  评论: ${stats[5]}\n`)

  console.log('🎉 种子数据初始化完成！')
  console.log('\n💡 提示：')
  console.log('  - 访问 http://localhost:3000/api/stats?type=overview 查看平台统计')
  console.log('  - 运行 npm run prisma:studio 打开数据库管理界面')
  console.log('  - 访问 http://localhost:3000/api/presets 查看预设列表\n')
}

main()
  .catch((e) => {
    console.error('❌ 种子数据初始化失败:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
