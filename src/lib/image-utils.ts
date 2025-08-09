/**
 * Image processing utilities for the CMS
 * Provides functions for validation, optimization, and metadata extraction
 */

export interface ImageValidationResult {
  isValid: boolean
  error?: string
  dimensions?: { width: number; height: number }
  size?: number
}

/**
 * Validate image file before upload
 */
export function validateImageFile(file: File): ImageValidationResult {
  // Check file type
  const allowedTypes = [
    'image/jpeg',
    'image/png', 
    'image/gif',
    'image/webp',
    'image/svg+xml'
  ]

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Invalid file type. Allowed: JPG, PNG, GIF, WebP, SVG'
    }
  }

  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'File size too large. Maximum 5MB allowed.'
    }
  }

  return {
    isValid: true,
    size: file.size
  }
}

/**
 * Get image dimensions from File object
 */
export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve({ width: img.width, height: img.height })
    }
    
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load image'))
    }
    
    img.src = url
  })
}

/**
 * Generate responsive image sizes for different use cases
 */
export const IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 300, height: 300 },
  medium: { width: 600, height: 400 },
  large: { width: 1200, height: 800 },
  hero: { width: 1920, height: 1080 }
} as const

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number | null): string {
  if (!bytes) return 'Unknown'
  
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
}

/**
 * Sanitize filename for safe storage
 */
export function sanitizeFilename(filename: string): string {
  // Get extension
  const lastDotIndex = filename.lastIndexOf('.')
  const extension = lastDotIndex !== -1 ? filename.substring(lastDotIndex) : ''
  const nameWithoutExt = lastDotIndex !== -1 ? filename.substring(0, lastDotIndex) : filename
  
  // Sanitize name part
  const sanitizedName = nameWithoutExt
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '_') // Replace non-alphanumeric chars with underscore
    .replace(/_+/g, '_') // Replace multiple underscores with single
    .replace(/^_|_$/g, '') // Remove leading/trailing underscores
  
  return sanitizedName + extension
}

/**
 * Generate unique filename with timestamp
 */
export function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 8)
  const sanitized = sanitizeFilename(originalName)
  
  const lastDotIndex = sanitized.lastIndexOf('.')
  if (lastDotIndex === -1) {
    return `${timestamp}_${randomString}_${sanitized}`
  }
  
  const nameWithoutExt = sanitized.substring(0, lastDotIndex)
  const extension = sanitized.substring(lastDotIndex)
  
  return `${timestamp}_${randomString}_${nameWithoutExt}${extension}`
}

/**
 * Check if file is an image based on MIME type
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/')
}

/**
 * Extract basic metadata from image file
 */
export async function extractImageMetadata(file: File): Promise<{
  name: string
  size: number
  type: string
  dimensions?: { width: number; height: number }
  lastModified: Date
}> {
  const metadata = {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: new Date(file.lastModified)
  }

  try {
    const dimensions = await getImageDimensions(file)
    return { ...metadata, dimensions }
  } catch {
    return metadata
  }
}

/**
 * Convert file to base64 data URL (for preview)
 */
export function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = () => {
      resolve(reader.result as string)
    }
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }
    
    reader.readAsDataURL(file)
  })
}