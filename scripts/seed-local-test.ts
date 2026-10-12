import fs from 'fs'
import path from 'path'
import { PrismaClient } from '../src/generated/prisma'
import { hashPassword } from '../src/lib/auth'

const prisma = new PrismaClient()

const TEST_USER = {
  name: 'test_user',
  password: 'test123456'
}

const TEST_PRESET = {
  title: '本地下载测试预设',
  description: '用于验证注册登录与下载流程的测试预设文件（可安全下载）。',
  daw: 'FL Studio',
  format: '.fst',
  fileName: 'local-download-test.fst',
  tagName: 'Trap'
}

async function ensureUploadFile() {
  const presetDir = path.join(process.cwd(), 'public/uploads/presets')
  fs.mkdirSync(presetDir, { recursive: true })

  const filePath = path.join(presetDir, TEST_PRESET.fileName)
  const content = [
    '# Supreset local download test preset',
    `# generated_at=${new Date().toISOString()}`,
    'daw=FL Studio',
    'format=.fst',
    'note=This file is for local download testing only.'
  ].join('\n')

  fs.writeFileSync(filePath, content, 'utf8')
  const stat = fs.statSync(filePath)

  return {
    relativePath: `/uploads/presets/${TEST_PRESET.fileName}`,
    fileSize: stat.size
  }
}

async function main() {
  console.log('🌱 开始写入本地测试数据...\n')

  const { relativePath, fileSize } = await ensureUploadFile()
  const hashedPassword = await hashPassword(TEST_USER.password)

  const user = await prisma.user.upsert({
    where: { name: TEST_USER.name },
    update: {
      password: hashedPassword,
      mustChangePassword: false
    },
    create: {
      name: TEST_USER.name,
      password: hashedPassword,
      role: 'user',
      mustChangePassword: false
    }
  })

  const tag = await prisma.tag.upsert({
    where: { name: TEST_PRESET.tagName },
    update: {},
    create: { name: TEST_PRESET.tagName }
  })

  const existingPreset = await prisma.preset.findFirst({
    where: {
      title: TEST_PRESET.title,
      userId: user.id
    }
  })

  const preset = existingPreset
    ? await prisma.preset.update({
        where: { id: existingPreset.id },
        data: {
          description: TEST_PRESET.description,
          daw: TEST_PRESET.daw,
          format: TEST_PRESET.format,
          filePath: relativePath,
          fileSize,
          isPublic: true,
          deletedAt: null
        }
      })
    : await prisma.preset.create({
        data: {
          title: TEST_PRESET.title,
          description: TEST_PRESET.description,
          daw: TEST_PRESET.daw,
          format: TEST_PRESET.format,
          filePath: relativePath,
          fileSize,
          isPublic: true,
          userId: user.id,
          tags: {
            create: [{ tagId: tag.id }]
          }
        }
      })

  console.log('✅ 测试账号')
  console.log(`   用户名: ${TEST_USER.name}`)
  console.log(`   密码:   ${TEST_USER.password}`)
  console.log('')
  console.log('✅ 测试预设')
  console.log(`   标题: ${preset.title}`)
  console.log(`   ID:   ${preset.id}`)
  console.log(`   文件: ${relativePath}`)
  console.log('')
  console.log('🔗 测试路径')
  console.log(`   详情页: http://localhost:3000/presets/${preset.id}`)
  console.log(`   预设广场: http://localhost:3000/presets`)
  console.log('')
}

main()
  .catch((error) => {
    console.error('❌ 本地测试数据写入失败:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
