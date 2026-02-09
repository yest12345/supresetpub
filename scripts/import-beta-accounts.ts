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

interface AccountInfo {
  id: number
  accountId: string
  username: string
  email: string
  password: string
}

// 解析 BETA_ACCOUNTS.md 文件
function parseBetaAccountsFile(filePath: string): AccountInfo[] {
  const content = fs.readFileSync(filePath, 'utf-8')
  const accounts: AccountInfo[] = []
  
  // 匹配表格行：| 序号 | 账户ID | 用户名 | 邮箱 | 初始密码 |
  const tableRowRegex = /\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\S+)\s*\|\s*(\S+)\s*\|\s*`([^`]+)`\s*\|/
  const lines = content.split('\n')
  
  for (const line of lines) {
    const match = line.match(tableRowRegex)
    if (match) {
      const [, , accountId, username, email, password] = match
      accounts.push({
        id: parseInt(accountId),
        accountId: accountId,
        username: username,
        email: email,
        password: password
      })
    }
  }
  
  return accounts
}

async function main() {
  console.log('🚀 开始导入内测账户...\n')

  try {
    const accountsFilePath = path.join(process.cwd(), 'BETA_ACCOUNTS.md')
    
    // 检查文件是否存在
    if (!fs.existsSync(accountsFilePath)) {
      console.error(`❌ 错误：找不到文件 ${accountsFilePath}`)
      process.exit(1)
    }

    // 解析账户文件
    console.log('📖 读取账户文件...')
    const accounts = parseBetaAccountsFile(accountsFilePath)
    console.log(`  ✅ 解析到 ${accounts.length} 个账户\n`)

    if (accounts.length === 0) {
      console.error('❌ 错误：未找到任何账户信息')
      process.exit(1)
    }

    // 1. 删除所有现有用户（可选，如果不想删除现有用户，注释掉这部分）
    console.log('🗑️  清理现有用户数据...')
    
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
    const START_ID = accounts[0].id
    console.log(`🔧 设置用户ID自增起始值为: ${START_ID}...`)
    await prisma.$executeRawUnsafe(`ALTER TABLE users AUTO_INCREMENT = ${START_ID}`)
    console.log(`  ✅ 自增起始值已设置为 ${START_ID}\n`)

    // 3. 导入账户
    console.log(`👤 导入 ${accounts.length} 个内测账户...`)
    let successCount = 0
    let errorCount = 0

    for (let i = 0; i < accounts.length; i++) {
      const account = accounts[i]
      try {
        // 加密密码
        const hashedPassword = await hashPassword(account.password)

        // 创建用户（手动指定ID以确保与文档一致）
        await prisma.user.create({
          data: {
            id: account.id,
            name: account.username,
            email: account.email,
            password: hashedPassword,
            role: 'user',
            mustChangePassword: true // 首次登录需要修改密码
          }
        })

        successCount++

        if ((i + 1) % 10 === 0) {
          console.log(`  ✅ 已导入 ${i + 1}/${accounts.length} 个账户`)
        }
      } catch (error: any) {
        errorCount++
        console.error(`  ❌ 导入账户 ${account.accountId} (${account.username}) 失败:`, error.message)
      }
    }

    console.log(`\n✅ 完成：成功导入 ${successCount} 个账户`)
    if (errorCount > 0) {
      console.log(`⚠️  失败：${errorCount} 个账户导入失败\n`)
    } else {
      console.log('')
    }

    // 4. 显示统计信息
    const totalUsers = await prisma.user.count()
    console.log('📊 统计信息：')
    console.log(`  总用户数: ${totalUsers}`)
    console.log(`  内测账户: ${successCount}\n`)

    // 5. 显示前5个账户示例
    console.log('📋 账户示例（前5个）：')
    accounts.slice(0, 5).forEach((account, index) => {
      console.log(`  ${index + 1}. 账户ID: ${account.accountId} | 用户名: ${account.username} | 密码: ${account.password}`)
    })
    console.log('\n💡 提示：')
    console.log('  - 所有账户已从 BETA_ACCOUNTS.md 导入到数据库')
    console.log('  - 用户首次登录需要使用账户ID和初始密码')
    console.log('  - 登录后系统会强制要求修改密码\n')

  } catch (error) {
    console.error('❌ 导入账户失败:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error('❌ 脚本执行失败:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })





