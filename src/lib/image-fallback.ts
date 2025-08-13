/**
 * Image fallback utilities for handling missing uploaded images
 */

/**
 * Check if an uploaded image exists on disk
 * Note: This function only works on the server side
 */
export function imageExists(imagePath: string): boolean {
  if (typeof window !== 'undefined') {
    // Client-side: assume image exists, will handle errors in component
    console.log('[Image Fallback] Client-side check, assuming image exists:', imagePath)
    return true
  }
  
  if (!imagePath || !imagePath.startsWith('/uploads/')) {
    console.log('[Image Fallback] Invalid path for existence check:', imagePath)
    return false
  }
  
  try {
    const fs = require('fs')
    const path = require('path')
    const fullPath = path.join(process.cwd(), 'public', imagePath)
    const exists = fs.existsSync(fullPath)
    console.log('[Image Fallback] Checking existence of:', fullPath, '- Result:', exists)
    return exists
  } catch (error) {
    console.error('[Image Fallback] Error checking image existence:', error)
    return false
  }
}

/**
 * Get a fallback image path for facility images
 */
export function getFacilityFallbackImage(facilityName?: string | null): string {
  const facilityFallbacks: Record<string, string> = {
    'main hall': '/img/80-chairs.jpeg',
    'small hall': '/img/entrance.jpeg', 
    'kitchen': '/img/kitchen.jpeg',
    'default': '/img/80-chairs.jpeg'
  }
  
  if (!facilityName) return facilityFallbacks.default!
  
  const key = facilityName.toLowerCase()
  
  for (const [name, image] of Object.entries(facilityFallbacks)) {
    if (key.includes(name)) {
      return image
    }
  }
  
  return facilityFallbacks.default!
}

/**
 * Get a fallback image path for program images
 */
export function getProgramFallbackImage(programName?: string | null): string {
  const programFallbacks: Record<string, string> = {
    'stay': '/img/poster-stayandplay.jpeg',
    'play': '/img/poster-stayandplay.jpeg',
    'taekwondo': '/img/poster-taekwondo.jpeg',
    'judo': '/img/poster-judo.jpeg',
    'kumon': '/img/poster-kumon.jpeg',
    'zumba': '/img/poster-zumba.jpeg',
    'fitness': '/img/poster-poundfitness.jpeg',
    'pound': '/img/poster-poundfitness.jpeg',
    'knit': '/img/poster-knitandchat.jpeg',
    'chat': '/img/poster-knitandchat.jpeg',
    'japanese': '/img/poster-japanesegcse.jpeg',
    'english': '/img/poster-englishlessforjapanese.jpeg',
    'default': '/img/poster-stayandplay.jpeg'
  }
  
  if (!programName) return programFallbacks.default!
  
  const key = programName.toLowerCase()
  
  for (const [name, image] of Object.entries(programFallbacks)) {
    if (key.includes(name)) {
      return image
    }
  }
  
  return programFallbacks.default!
}

/**
 * Process facility image URL, replacing non-existent uploads with fallbacks
 */
export function processFacilityImage(imageUrl: string | null, facilityName?: string): string | null {
  // If no image URL provided, return fallback
  if (!imageUrl) {
    const fallback = getFacilityFallbackImage(facilityName)
    console.log(`[Image Fallback] No image for facility '${facilityName}', using fallback:`, fallback)
    return fallback
  }
  
  // If it's not an upload path, return as is (assumes it's a static image)
  if (!imageUrl.startsWith('/uploads/')) {
    console.log(`[Image Fallback] Using static image for facility '${facilityName}':`, imageUrl)
    return imageUrl
  }
  
  // Check if uploaded image exists
  if (imageExists(imageUrl)) {
    console.log(`[Image Fallback] Found uploaded image for facility '${facilityName}':`, imageUrl)
    return imageUrl
  }
  
  // If uploaded image doesn't exist, return fallback
  const fallback = getFacilityFallbackImage(facilityName)
  console.warn(`[Image Fallback] Upload missing for facility '${facilityName}' at ${imageUrl}, using fallback:`, fallback)
  return fallback
}

/**
 * Process program image URL, replacing non-existent uploads with fallbacks
 */
export function processProgramImage(imageUrl: string | null, programName?: string): string | null {
  // If no image URL provided, return fallback
  if (!imageUrl) {
    const fallback = getProgramFallbackImage(programName)
    console.log(`[Image Fallback] No image for program '${programName}', using fallback:`, fallback)
    return fallback
  }
  
  // If it's not an upload path, return as is (assumes it's a static image)
  if (!imageUrl.startsWith('/uploads/')) {
    console.log(`[Image Fallback] Using static image for program '${programName}':`, imageUrl)
    return imageUrl
  }
  
  // Check if uploaded image exists
  if (imageExists(imageUrl)) {
    console.log(`[Image Fallback] Found uploaded image for program '${programName}':`, imageUrl)
    return imageUrl
  }
  
  // If uploaded image doesn't exist, return fallback
  const fallback = getProgramFallbackImage(programName)
  console.warn(`[Image Fallback] Upload missing for program '${programName}' at ${imageUrl}, using fallback:`, fallback)
  return fallback
}