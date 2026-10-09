import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// GET /api/files/[...path] - 提供上传文件的下载服务
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathSegments } = await params
    // 安全检查：防止路径遍历攻击
    const safePath = pathSegments.join('/')
    if (safePath.includes('..') || safePath.startsWith('/')) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 })
    }

    const fullPath = path.join(process.cwd(), 'public', safePath)
    
    // 确保解析后的路径仍在 public 目录下
    const resolvedPath = path.resolve(fullPath)
    const publicDir = path.resolve(path.join(process.cwd(), 'public'))
    if (!resolvedPath.startsWith(publicDir)) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    if (!fs.existsSync(resolvedPath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    const stat = fs.statSync(resolvedPath)
    const fileBuffer = fs.readFileSync(resolvedPath)
    const fileName = path.basename(resolvedPath)

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`,
        'Content-Length': stat.size.toString(),
      },
    })
  } catch (error: any) {
    console.error('File serve error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
