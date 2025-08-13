import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir, rename, unlink } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { prisma } from '@/lib/prisma'
import { checkAuth } from '@/lib/auth-middleware'

export const dynamic = 'force-dynamic'

// Validate file magic numbers (file signatures) for security
function validateFileSignature(buffer: ArrayBuffer, mimeType: string): boolean {
  const bytes = new Uint8Array(buffer.slice(0, 8))
  
  switch (mimeType) {
    case 'image/jpeg':
      return bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF
    case 'image/png':
      return bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47
    case 'image/gif':
      return (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && 
              bytes[3] === 0x38 && (bytes[4] === 0x37 || bytes[4] === 0x39) && bytes[5] === 0x61)
    case 'image/webp':
      return bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
             bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
    default:
      return false
  }
}

// GET /api/media - Get all media items
export async function GET() {
  try {
    const mediaItems = await prisma.mediaItem.findMany({
      orderBy: { uploadedAt: 'desc' }
    })

    return NextResponse.json(mediaItems)
  } catch (error) {
    console.error('Error fetching media items:', error)
    return NextResponse.json(
      { error: 'Failed to fetch media items' },
      { status: 500 }
    )
  }
}

// POST /api/media - Upload new media file
export async function POST(request: NextRequest) {
  console.log('[MEDIA API] Upload request received')
  try {
    // Check authentication
    const isAuthed = await checkAuth(request)
    console.log('[MEDIA API] Auth check result:', isAuthed)
    if (!isAuthed) {
      console.warn('[MEDIA API] Upload rejected - unauthorized')
      return NextResponse.json(
        { error: 'Unauthorized. Please log in to upload files.' },
        { status: 401 }
      )
    }

    try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const altText = formData.get('altText') as string || ''
    const caption = formData.get('caption') as string || ''

    console.log('[MEDIA API] File upload attempt:', {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      hasAltText: !!altText,
      hasCaption: !!caption
    })

    if (!file) {
      console.error('[MEDIA API] Upload failed - no file provided')
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type - SVG removed for security (XSS/XXE risks)
    const allowedTypes = [
      'image/jpeg',
      'image/png', 
      'image/gif',
      'image/webp'
    ]

    if (!allowedTypes.includes(file.type)) {
      console.error('[MEDIA API] Invalid file type:', file.type)
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPG, PNG, GIF, WebP' },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      console.error('[MEDIA API] File too large:', {
        size: file.size,
        maxSize,
        fileName: file.name
      })
      return NextResponse.json(
        { error: 'File size too large. Maximum 5MB allowed.' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const extension = path.extname(file.name)
    const nameWithoutExt = path.basename(file.name, extension)
    const sanitizedName = nameWithoutExt.replace(/[^a-zA-Z0-9-_]/g, '_')
    const filename = `${timestamp}_${sanitizedName}${extension}`

    // Ensure upload directory exists - use env var for persistent storage
    const uploadDir = process.env.UPLOAD_PATH || path.join(process.cwd(), 'public', 'uploads')
    console.log('[MEDIA API] Upload directory:', uploadDir)
    if (!existsSync(uploadDir)) {
      console.log('[MEDIA API] Creating upload directory:', uploadDir)
      await mkdir(uploadDir, { recursive: true })
    }

    // Get file bytes for validation and saving
    console.log('[MEDIA API] Reading file bytes for validation')
    const bytes = await file.arrayBuffer()

    // Validate file signature (magic numbers) for security
    if (!validateFileSignature(bytes, file.type)) {
      console.error('[MEDIA API] File signature validation failed:', {
        fileName: file.name,
        declaredType: file.type,
        actualBytes: Array.from(new Uint8Array(bytes.slice(0, 12))).map(b => '0x' + b.toString(16).padStart(2, '0')).join(' ')
      })
      return NextResponse.json(
        { error: 'File content does not match declared file type' },
        { status: 400 }
      )
    }
    console.log('[MEDIA API] File signature validation passed')

    // Atomic file operation: write to temp file first, then rename
    const tempFilename = `${filename}.tmp.${Date.now()}.${Math.random().toString(36).substr(2, 9)}`
    const tempFilePath = path.join(uploadDir, tempFilename)
    const finalFilePath = path.join(uploadDir, filename)
    
    console.log('[MEDIA API] Writing to temporary file:', tempFilePath)
    await writeFile(tempFilePath, Buffer.from(bytes))
    
    // Check if final filename already exists and handle collision
    let actualFilename = filename
    let actualFilePath = finalFilePath
    let counter = 1
    
    while (existsSync(actualFilePath)) {
      const nameWithoutExt = path.basename(filename, path.extname(filename))
      const ext = path.extname(filename)
      actualFilename = `${nameWithoutExt}_${counter}${ext}`
      actualFilePath = path.join(uploadDir, actualFilename)
      counter++
      console.log('[MEDIA API] File exists, trying:', actualFilename)
    }
    
    // Atomic rename operation
    console.log('[MEDIA API] Atomically moving to final location:', actualFilePath)
    await rename(tempFilePath, actualFilePath)
    console.log('[MEDIA API] File saved successfully as:', actualFilename)

    // Create database record with actual filename (may differ due to collision handling)
    try {
      const mediaItem = await prisma.mediaItem.create({
        data: {
          filename: actualFilename,
          originalName: file.name,
          filePath: `/api/media/file/${actualFilename}`,
          fileType: file.type,
          fileSize: file.size,
          altText: altText || null,
          caption: caption || null
        }
      })

      console.log('[MEDIA API] Upload successful:', {
        id: mediaItem.id,
        filename: mediaItem.filename,
        path: mediaItem.filePath
      })
      return NextResponse.json(mediaItem, { status: 201 })
    } catch (dbError) {
      // Database failed, clean up the file
      console.error('[MEDIA API] Database error, cleaning up file:', actualFilePath)
      try {
        await unlink(actualFilePath)
        console.log('[MEDIA API] File cleanup successful')
      } catch (cleanupError) {
        console.error('[MEDIA API] File cleanup failed:', cleanupError)
      }
      throw dbError
    }
  } catch (error) {
    console.error('[MEDIA API] Error uploading file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
  } catch (error) {
    // Outer catch for any unexpected errors
    console.error('[MEDIA API] Unexpected error in media upload:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}