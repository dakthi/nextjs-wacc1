'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps extends Omit<ImageProps, 'src' | 'onError'> {
  src: string
  fallback?: string
  onError?: () => void
}

/**
 * Enhanced Image component that automatically handles R2 URLs and external images
 * This component provides a long-term solution for image optimization across the app
 */
export default function OptimizedImage({ src, fallback, onError, ...props }: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)
  
  // Check if the image is from R2 or external source
  const isExternalImage = imgSrc?.startsWith('http://') || imgSrc?.startsWith('https://')
  const isR2Image = imgSrc?.includes('r2.cloudflarestorage.com')
  
  // For R2 signed URLs or other external images, disable optimization
  // Next.js image optimization doesn't work well with signed URLs that change
  const shouldOptimize = !isExternalImage || !isR2Image
  
  // Add error handling for broken images
  const handleError = () => {
    console.warn(`Failed to load image: ${imgSrc}`)
    setHasError(true)
    
    if (fallback && !hasError) {
      setImgSrc(fallback)
      return
    }
    
    if (onError) {
      onError()
    }
  }
  
  return (
    <Image
      {...props}
      src={imgSrc}
      onError={handleError}
      unoptimized={!shouldOptimize || isR2Image}
      priority={props.priority || false}
      alt={props.alt || 'Image'}
    />
  )
}