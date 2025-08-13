import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename
    console.log('[MEDIA FILE] Serving file request:', filename)
    
    if (!filename) {
      console.error('[MEDIA FILE] No filename provided')
      return NextResponse.json(
        { error: 'Filename is required' },
        { status: 400 }
      )
    }

    // Security: Validate filename to prevent path traversal
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      console.error('[MEDIA FILE] Path traversal attempt detected:', filename)
      return NextResponse.json(
        { error: 'Invalid filename' },
        { status: 400 }
      )
    }

    // Additional security: Only allow safe characters
    if (!/^[a-zA-Z0-9._-]+$/.test(filename)) {
      console.error('[MEDIA FILE] Invalid filename characters:', filename)
      return NextResponse.json(
        { error: 'Invalid filename characters' },
        { status: 400 }
      )
    }

    const uploadDir = process.env.UPLOAD_PATH || path.join(process.cwd(), 'public', 'uploads')
    const filePath = path.join(uploadDir, filename)
    console.log('[MEDIA FILE] Upload directory:', uploadDir)
    console.log('[MEDIA FILE] Looking for file at:', filePath)

    // Security: Ensure resolved path is within upload directory
    const resolvedUploadDir = path.resolve(uploadDir)
    const resolvedFilePath = path.resolve(filePath)
    if (!resolvedFilePath.startsWith(resolvedUploadDir + path.sep) && resolvedFilePath !== resolvedUploadDir) {
      console.error('[MEDIA FILE] Path traversal attempt - resolved path outside upload dir:', {
        uploadDir: resolvedUploadDir,
        filePath: resolvedFilePath
      })
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      )
    }

    if (!existsSync(filePath)) {
      console.error('[MEDIA FILE] File not found:', filePath)
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      )
    }

    const file = await readFile(filePath)
    
    const ext = path.extname(filename).toLowerCase()
    let contentType = 'application/octet-stream'
    
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg'
        break
      case '.png':
        contentType = 'image/png'
        break
      case '.gif':
        contentType = 'image/gif'
        break
      case '.webp':
        contentType = 'image/webp'
        break
      // SVG removed for security reasons (XSS/XXE risks)
      default:
        console.error('[MEDIA FILE] Unsupported file extension:', ext)
        return NextResponse.json(
          { error: 'Unsupported file type' },
          { status: 415 }
        )
    }

    console.log('[MEDIA FILE] Serving file with content type:', contentType)
    return new NextResponse(file, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('[MEDIA FILE] Error serving file:', error)
    return NextResponse.json(
      { error: 'Failed to serve file' },
      { status: 500 }
    )
  }
}