import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function clearPresets() {
  try {
    console.log('🗑️ 开始清理预设数据...')

    // 删除所有相关的关联数据
    const deletedTags = await prisma.tagOnPreset.deleteMany({})
    console.log(`  ✅ 删除了 ${deletedTags.count} 条标签关联`)

    const deletedComments = await prisma.comment.deleteMany({})
    console.log(`  ✅ 删除了 ${deletedComments.count} 条评论`)

    const deletedLikes = await prisma.like.deleteMany({})
    console.log(`  ✅ 删除了 ${deletedLikes.count} 条点赞`)

    const deletedFavorites = await prisma.favorite.deleteMany({})
    console.log(`  ✅ 删除了 ${deletedFavorites.count} 条收藏`)

    const deletedDownloads = await prisma.downloadHistory.deleteMany({})
    console.log(`  ✅ 删除了 ${deletedDownloads.count} 条下载记录`)

    // 最后删除所有预设
    const deletedPresets = await prisma.preset.deleteMany({})
    console.log(`  ✅ 删除了 ${deletedPresets.count} 个预设`)

    console.log('✨ 清理完成！')
  } catch (error) {
    console.error('❌ 清理失败:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

clearPresets()
  .then(() => {
    console.log('脚本执行完毕')
    process.exit(0)
  })
  .catch((error) => {
    console.error('脚本执行出错:', error)
    process.exit(1)
  })
