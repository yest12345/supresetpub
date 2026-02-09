import { PrismaClient } from '../src/generated/prisma'
import bcrypt from 'bcryptjs'
import * as fs from 'fs'
import * as path from 'path'

// 密码加密函数（与 auth.ts 中的实现一致）
async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

const prisma = new PrismaClient()

// 生成复杂度适中的密码（8-10个字符，包含字母和数字）
function generatePassword(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const length = 8 + Math.floor(Math.random() * 3) // 8-10个字符
  let password = ''
  
  // 确保至少包含一个数字和一个字母
  password += chars[Math.floor(Math.random() * 26)] // 小写字母
  password += chars[26 + Math.floor(Math.random() * 26)] // 大写字母
  password += chars[52 + Math.floor(Math.random() * 10)] // 数字
  
  // 填充剩余字符
  for (let i = password.length; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)]
  }
  
  // 打乱字符顺序
  return password.split('').sort(() => Math.random() - 0.5).join('')
}

// 生成用户名
function generateUsername(index: number): string {
  const prefixes = ['Beta', 'Test', 'User', 'Dev', 'Tester']
  const prefix = prefixes[index % prefixes.length]
  return `${prefix}${String(index + 1).padStart(3, '0')}`
}

// 生成邮箱
function generateEmail(index: number): string {
  return `beta${String(index + 1).padStart(3, '0')}@supreset.test`
}

interface AccountInfo {
  id: number
  accountId: string
  username: string
  email: string
  password: string
}

async function main() {
  console.log('🚀 开始生成内测账户...\n')

  try {
    // 1. 删除所有现有用户
    console.log('🗑️  删除所有现有用户...')
    
    // 先删除所有关联数据（避免外键约束错误）
    console.log('  🔄 清理关联数据...')
    await prisma.donation.deleteMany({})
    await prisma.notification.deleteMany({})
    await prisma.comment.deleteMany({})
    await prisma.favorite.deleteMany({})
    await prisma.like.deleteMany({})
    await prisma.downloadHistory.deleteMany({})
    await prisma.tagOnPreset.deleteMany({})
    await prisma.preset.deleteMany({})
    
    // 删除所有用户
    const deleteResult = await prisma.user.deleteMany({})
    console.log(`  ✅ 已删除 ${deleteResult.count} 个用户\n`)

    // 2. 设置自增起始值
    const START_ID = 2025100900
    const BETA_COUNT = 100
    console.log(`🔧 设置用户ID自增起始值为: ${START_ID}...`)
    
    // 使用 SQL 设置 AUTO_INCREMENT
    await prisma.$executeRawUnsafe(`ALTER TABLE users AUTO_INCREMENT = ${START_ID}`)
    console.log(`  ✅ 自增起始值已设置为 ${START_ID}\n`)

    // 3. 生成100个账户
    console.log(`👤 生成${BETA_COUNT}个内测账户（ID从${START_ID}开始）...`)
    const accounts: AccountInfo[] = []

    for (let i = 0; i < BETA_COUNT; i++) {
      const username = generateUsername(i)
      const email = generateEmail(i)
      const password = generatePassword()
      
      // 加密密码
      const hashedPassword = await hashPassword(password)

      // 创建用户（手动指定ID以确保从指定值开始）
      const expectedId = START_ID + i
      const user = await prisma.user.create({
        data: {
          id: expectedId, // 手动指定ID
          name: username,
          email: email,
          password: hashedPassword,
          role: 'user',
          mustChangePassword: true // 首次登录需要修改密码
        }
      })

      accounts.push({
        id: user.id,
        accountId: String(user.id), // 账户ID就是数据库ID
        username: username,
        email: email,
        password: password
      })

      if ((i + 1) % 10 === 0) {
        console.log(`  ✅ 已创建 ${i + 1}/${BETA_COUNT} 个账户`)
      }
    }

    console.log(`\n✅ 完成：已创建 ${accounts.length} 个内测账户（ID: ${START_ID} - ${START_ID + BETA_COUNT - 1}）\n`)

    // 4. 生成 Markdown 文件
    console.log('📝 生成账户信息文件...')
    const markdownContent = generateMarkdown(accounts)
    const outputPath = path.join(process.cwd(), 'BETA_ACCOUNTS.md')
    
    fs.writeFileSync(outputPath, markdownContent, 'utf-8')
    console.log(`  ✅ 账户信息已保存到: ${outputPath}\n`)

    // 5. 显示统计信息
    const totalUsers = await prisma.user.count()
    console.log('📊 统计信息：')
    console.log(`  总用户数: ${totalUsers}`)
    console.log(`  内测账户: ${accounts.length}`)
    console.log(`  管理员账户: ${totalUsers - accounts.length}\n`)

    // 6. 显示前5个账户示例
    console.log('📋 账户示例（前5个）：')
    accounts.slice(0, 5).forEach((account, index) => {
      console.log(`  ${index + 1}. 账户ID: ${account.accountId} | 用户名: ${account.username} | 密码: ${account.password}`)
    })
    console.log('\n💡 提示：')
    console.log('  - 所有账户信息已保存到 BETA_ACCOUNTS.md')
    console.log('  - 用户首次登录需要使用账户ID和初始密码')
    console.log('  - 登录后系统会强制要求修改密码')
    console.log('  - 默认密码可以通过环境变量 DEFAULT_PASSWORD 配置\n')

  } catch (error) {
    console.error('❌ 生成账户失败:', error)
    throw error
  }
}

function generateMarkdown(accounts: AccountInfo[]): string {
  const timestamp = new Date().toLocaleString('zh-CN', { 
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  let content = `# 内测账户列表\n\n`
  content += `**生成时间**: ${timestamp}\n\n`
  content += `**账户总数**: ${accounts.length}\n\n`
  content += `---\n\n`
  content += `## 📋 使用说明\n\n`
  content += `1. **账户ID**: 用于登录的账户标识符（可以是数字ID或邮箱）\n`
  content += `2. **初始密码**: 首次登录时使用的密码\n`
  content += `3. **首次登录**: 用户首次登录后，系统会强制要求修改密码\n`
  content += `4. **登录方式**: 可以使用账户ID（数字）或邮箱登录\n\n`
  content += `---\n\n`
  content += `## 📊 账户列表\n\n`
  content += `| 序号 | 账户ID | 用户名 | 邮箱 | 初始密码 |\n`
  content += `|------|--------|--------|------|----------|\n`

  accounts.forEach((account, index) => {
    content += `| ${index + 1} | ${account.accountId} | ${account.username} | ${account.email} | \`${account.password}\` |\n`
  })

  content += `\n---\n\n`
  content += `## 🔐 登录示例\n\n`
  content += '```\n'
  content += `账户ID: ${accounts[0].accountId}\n`
  content += `密码: ${accounts[0].password}\n`
  content += '```\n\n'
  content += `或者使用邮箱登录：\n\n`
  content += '```\n'
  content += `邮箱: ${accounts[0].email}\n`
  content += `密码: ${accounts[0].password}\n`
  content += '```\n\n'
  content += `---\n\n`
  content += `## ⚠️ 重要提示\n\n`
  content += `- 请妥善保管此文件，不要泄露给未授权人员\n`
  content += `- 建议在分配账户后，要求用户立即修改密码\n`
  content += `- 所有账户默认需要修改密码后才能正常使用系统\n`
  content += `- 账户ID就是数据库中的用户ID（自增数字）\n\n`
  content += `---\n\n`
  content += `**文件生成时间**: ${timestamp}\n`

  return content
}

main()
  .catch((e) => {
    console.error('❌ 脚本执行失败:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

