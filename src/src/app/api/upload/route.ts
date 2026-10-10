import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { UPLOAD_CONFIG, FILE_FORMATS } from '@/config/upload'

export const config = {
  api: {
    bodyParser: false,
  },
}

/**
 * POST /api/upload - 上传文件（预设文件、封面图片、预览音频）
 * 
 * 文件保存位置：
 * - 预设文件: nextjs-mysql/public/uploads/presets/
 * - 封面图片: nextjs-mysql/public/uploads/covers/
 * - 预览音频: nextjs-mysql/public/uploads/audio/
 * 
 * 返回的路径为相对于网站根目录的路径 (如: /uploads/presets/xxx.fst)
 */
export async function POST(request: NextRequest) {
  try {
    console.log('📤 开始处理文件上传请求...');
    
    // 尝试解析 formData，可能在这里失败
    let formData;
    try {
      formData = await request.formData();
    } catch (parseError: any) {
      console.error('❌ FormData 解析失败:', parseError);
      return NextResponse.json(
        { success: false, error: `FormData 解析失败: ${parseError.message}` },
        { status: 400 }
      )
    }
    
    const file = formData.get('file') as File
    const type = formData.get('type') as string // 'preset' | 'cover' | 'audio'
    const presetPackId = formData.get('presetPackId') as string | null // 预设包ID
    const fileName = file?.name || 'unknown';

    console.log(`   文件名: ${fileName}, 类型: ${type}, 大小: ${file?.size} bytes`);
    if (presetPackId) {
      console.log(`   预设包ID: ${presetPackId}`);
    }

    if (!file) {
      console.error('❌ 错误：未找到文件');
      return NextResponse.json(
        { success: false, error: 'No file uploaded' },
        { status: 400 }
      )
    }

    // 验证文件类型
    const fileExtension = path.extname(fileName).toLowerCase()

    // 根据类型验证文件格式
    if (type === 'preset' && !FILE_FORMATS.PRESETS.includes(fileExtension)) {
      return NextResponse.json(
        { success: false, error: 'Invalid preset file format' },
        { status: 400 }
      )
    }
    if (type === 'cover' && !FILE_FORMATS.IMAGES.includes(fileExtension)) {
      return NextResponse.json(
        { success: false, error: 'Invalid image file format' },
        { status: 400 }
      )
    }
    if (type === 'audio' && !FILE_FORMATS.AUDIO.includes(fileExtension)) {
      return NextResponse.json(
        { success: false, error: 'Invalid audio file format' },
        { status: 400 }
      )
    }

    // 生成唯一文件名
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(2, 15)
    const uniqueFileName = `${timestamp}-${randomStr}${fileExtension}`

    // 根据文件类型确定相对路径（使用配置文件）
    let relativeUploadPath = ''
    let urlPath = ''
    
    if (type === 'preset') {
      const basePath = UPLOAD_CONFIG.getPresetPath()
      // 如果有预设包ID，创建子文件夹
      if (presetPackId) {
        relativeUploadPath = path.join(basePath, presetPackId)
        urlPath = `/uploads/presets/${presetPackId}/${uniqueFileName}`
      } else {
        relativeUploadPath = basePath
        urlPath = UPLOAD_CONFIG.getPresetUrl(uniqueFileName)
      }
    } else if (type === 'cover') {
      relativeUploadPath = UPLOAD_CONFIG.getCoverPath()
      urlPath = UPLOAD_CONFIG.getCoverUrl(uniqueFileName)
    } else if (type === 'audio') {
      relativeUploadPath = UPLOAD_CONFIG.getAudioPath()
      urlPath = UPLOAD_CONFIG.getAudioUrl(uniqueFileName)
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid upload type' },
        { status: 400 }
      )
    }

    // 转换为绝对路径用于文件系统操作
    const uploadDir = path.join(process.cwd(), relativeUploadPath)

    // 创建上传目录（如果不存在）
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // 读取文件内容并保存
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filePath = path.join(uploadDir, uniqueFileName)
    
    await writeFile(filePath, buffer)

    // 输出日志便于调试
    console.log(`✅ 文件上传成功: ${type}`)
    console.log(`   原始文件名: ${fileName}`)
    console.log(`   保存位置: ${relativeUploadPath}/${uniqueFileName}`)
    console.log(`   URL 路径: ${urlPath}`)
    console.log(`   文件大小: ${(buffer.length / 1024).toFixed(2)} KB`)
    if (presetPackId) {
      console.log(`   📦 预设包文件夹: ${presetPackId}`)
    }

    return NextResponse.json({
      success: true,
      data: {
        fileName: uniqueFileName,
        filePath: urlPath,
        fileSize: buffer.length,
        originalName: fileName
      }
    })
  } catch (error: any) {
    console.error('❌ 文件上传失败:', error);
    console.error('   错误类型:', error.constructor.name);
    console.error('   错误消息:', error.message);
    if (error.stack) {
      console.error('   错误堆栈:', error.stack.split('\n').slice(0, 3).join('\n'));
    }
    return NextResponse.json(
      { success: false, error: `上传失败: ${error.message}` },
      { status: 500 }
    )
  }
}
