import sharp from 'sharp'
import path from 'path'

export interface ProcessedImage {
  original: {
    filename: string
    width: number
    height: number
    size: number
  }
  thumbnail?: {
    filename: string
    width: number
    height: number
    size: number
  }
  optimized?: {
    filename: string
    width: number
    height: number
    size: number
  }
}

/**
 * Process uploaded image: create thumbnail and optimized version
 */
export async function processImage(
  inputBuffer: Buffer,
  originalFilename: string,
  uploadDir: string
): Promise<ProcessedImage> {
  const nameWithoutExt = path.basename(originalFilename, path.extname(originalFilename))
  const timestamp = Date.now()
  
  // Get original image metadata
  const metadata = await sharp(inputBuffer).metadata()
  const originalWidth = metadata.width || 0
  const originalHeight = metadata.height || 0
  
  // Save original
  const originalName = `${timestamp}_${nameWithoutExt}_original${path.extname(originalFilename)}`
  const originalPath = path.join(uploadDir, originalName)
  await sharp(inputBuffer).toFile(originalPath)
  
  const result: ProcessedImage = {
    original: {
      filename: originalName,
      width: originalWidth,
      height: originalHeight,
      size: inputBuffer.length
    }
  }
  
  // Create thumbnail (300x300 max, maintaining aspect ratio)
  if (originalWidth > 300 || originalHeight > 300) {
    const thumbnailName = `${timestamp}_${nameWithoutExt}_thumb.webp`
    const thumbnailPath = path.join(uploadDir, thumbnailName)
    
    const thumbnailBuffer = await sharp(inputBuffer)
      .resize(300, 300, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 85 })
      .toBuffer()
    
    await sharp(thumbnailBuffer).toFile(thumbnailPath)
    
    const thumbMetadata = await sharp(thumbnailBuffer).metadata()
    result.thumbnail = {
      filename: thumbnailName,
      width: thumbMetadata.width || 0,
      height: thumbMetadata.height || 0,
      size: thumbnailBuffer.length
    }
  }
  
  // Create optimized version for web display (1920px max width)
  if (originalWidth > 1920) {
    const optimizedName = `${timestamp}_${nameWithoutExt}_optimized.webp`
    const optimizedPath = path.join(uploadDir, optimizedName)
    
    const optimizedBuffer = await sharp(inputBuffer)
      .resize(1920, null, {
        withoutEnlargement: true
      })
      .webp({ quality: 90 })
      .toBuffer()
    
    await sharp(optimizedBuffer).toFile(optimizedPath)
    
    const optMetadata = await sharp(optimizedBuffer).metadata()
    result.optimized = {
      filename: optimizedName,
      width: optMetadata.width || 0,
      height: optMetadata.height || 0,
      size: optimizedBuffer.length
    }
  }
  
  return result
}

/**
 * Validate image dimensions
 */
export async function validateImageDimensions(
  buffer: Buffer,
  maxWidth: number = 5000,
  maxHeight: number = 5000
): Promise<{ valid: boolean; width?: number; height?: number; error?: string }> {
  try {
    const metadata = await sharp(buffer).metadata()
    const width = metadata.width || 0
    const height = metadata.height || 0
    
    if (width > maxWidth || height > maxHeight) {
      return {
        valid: false,
        width,
        height,
        error: `Image dimensions (${width}x${height}) exceed maximum allowed (${maxWidth}x${maxHeight})`
      }
    }
    
    return { valid: true, width, height }
  } catch (error) {
    return {
      valid: false,
      error: 'Failed to read image metadata'
    }
  }
}