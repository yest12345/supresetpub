import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken, extractToken } from '@/lib/auth'
import archiver from 'archiver'
import { Readable } from 'stream'
import path from 'path'
import fs from 'fs'

// GET /api/presets/[id]/download-zip - 打包下载预设包
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // 验证用户登录状态
  const authHeader = request.headers.get('authorization');
  const token = extractToken(authHeader);
  
  if (!token) {
    return NextResponse.json(
      { success: false, error: '请先登录后再下载预设' },
      { status: 401 }
    );
  }

  const user = verifyToken(token);
  if (!user) {
    return NextResponse.json(
      { success: false, error: '登录已过期，请重新登录' },
      { status: 401 }
    );
  }

  try {
    const { id } = await params
    const presetId = parseInt(id)

    // 获取预设信息
    const preset = await prisma.preset.findUnique({
      where: { id: presetId },
      select: {
        id: true,
        title: true,
        files: true,
        filePath: true,
        deletedAt: true
      }
    })

    if (!preset || preset.deletedAt) {
      return NextResponse.json(
        { success: false, error: '预设不存在或已被删除' },
        { status: 404 }
      );
    }

    // 如果没有多文件信息，返回单文件
    if (!preset.files || (preset.files as any).length === 0) {
      return NextResponse.json(
        { success: false, error: '此预设不是预设包' },
        { status: 400 }
      );
    }

    const files = preset.files as Array<{
      filePath: string;
      fileSize: number;
      originalName: string;
    }>;

    console.log(`📦 开始打包预设包: ${preset.title}, 包含 ${files.length} 个文件`);

    // 创建 ZIP 压缩流
    const archive = archiver('zip', {
      zlib: { level: 5 } // 中等压缩级别，平衡速度和大小
    });

    // 收集所有数据块
    const chunks: Buffer[] = [];
    
    archive.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });

    archive.on('error', (err) => {
      console.error('Archive error:', err);
      throw err;
    });

    // 添加所有文件到 ZIP
    let addedCount = 0;
    for (const file of files) {
      try {
        // 构建文件的绝对路径
        const publicDir = path.join(process.cwd(), 'public');
        const fullPath = path.join(publicDir, file.filePath.replace(/^\//, ''));
        
        // 检查文件是否存在
        if (fs.existsSync(fullPath)) {
          const fileBuffer = fs.readFileSync(fullPath);
          archive.append(fileBuffer, { name: file.originalName });
          addedCount++;
          console.log(`  ✅ 添加文件 ${addedCount}/${files.length}: ${file.originalName} (${(file.fileSize / 1024).toFixed(2)} KB)`);
        } else {
          console.warn(`  ⚠️ 文件不存在: ${fullPath}`);
        }
      } catch (error) {
        console.error(`  ❌ 添加文件失败: ${file.originalName}`, error);
      }
    }

    // 完成压缩
    archive.finalize();

    // 等待压缩完成
    await new Promise<void>((resolve, reject) => {
      archive.on('end', () => resolve());
      archive.on('error', (err) => reject(err));
    });

    // 合并所有数据块
    const buffer = Buffer.concat(chunks);
    
    console.log(`✅ ZIP 打包完成，共 ${addedCount} 个文件，大小: ${(buffer.length / 1024 / 1024).toFixed(2)} MB`);

    // 返回 ZIP 文件
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(preset.title)}.zip"`,
        'Content-Length': buffer.length.toString(),
      },
    });
  } catch (error: any) {
    console.error('Error creating zip:', error);
    return NextResponse.json(
      { success: false, error: '打包失败: ' + error.message },
      { status: 500 }
    );
  }
}
