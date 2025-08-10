/**
 * Image fallback utilities for handling missing uploaded images
 */

import { existsSync } from 'fs'
import path from 'path'

/**
 * Check if an uploaded image exists on disk
 */
export function imageExists(imagePath: string): boolean {
  if (!imagePath || !imagePath.startsWith('/uploads/')) {
    return false
  }
  
  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath)
    return existsSync(fullPath)
  } catch {
    return false
  }
}

/**
 * Get a fallback image path for facility images
 */
export function getFacilityFallbackImage(facilityName?: string): string {
  const facilityFallbacks: Record<string, string> = {
    'main hall': '/img/80-chairs.jpeg',
    'small hall': '/img/entrance.jpeg', 
    'kitchen': '/img/kitchen.jpeg',
    'default': '/img/80-chairs.jpeg'
  }
  
  if (!facilityName) return facilityFallbacks.default
  
  const key = facilityName.toLowerCase()
  
  for (const [name, image] of Object.entries(facilityFallbacks)) {
    if (key.includes(name)) {
      return image
    }
  }
  
  return facilityFallbacks.default
}

/**
 * Get a fallback image path for program images
 */
export function getProgramFallbackImage(programName?: string): string {
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
  
  if (!programName) return programFallbacks.default
  
  const key = programName.toLowerCase()
  
  for (const [name, image] of Object.entries(programFallbacks)) {
    if (key.includes(name)) {
      return image
    }
  }
  
  return programFallbacks.default
}

/**
 * Process facility image URL, replacing non-existent uploads with fallbacks
 */
export function processFacilityImage(imageUrl: string | null, facilityName?: string): string | null {
  // If no image URL provided, return fallback
  if (!imageUrl) {
    return getFacilityFallbackImage(facilityName)
  }
  
  // If it's not an upload path, return as is (assumes it's a static image)
  if (!imageUrl.startsWith('/uploads/')) {
    return imageUrl
  }
  
  // Check if uploaded image exists
  if (imageExists(imageUrl)) {
    return imageUrl
  }
  
  // If uploaded image doesn't exist, return fallback
  return getFacilityFallbackImage(facilityName)
}

/**
 * Process program image URL, replacing non-existent uploads with fallbacks
 */
export function processProgramImage(imageUrl: string | null, programName?: string): string | null {
  // If no image URL provided, return fallback
  if (!imageUrl) {
    return getProgramFallbackImage(programName)
  }
  
  // If it's not an upload path, return as is (assumes it's a static image)
  if (!imageUrl.startsWith('/uploads/')) {
    return imageUrl
  }
  
  // Check if uploaded image exists
  if (imageExists(imageUrl)) {
    return imageUrl
  }
  
  // If uploaded image doesn't exist, return fallback
  return getProgramFallbackImage(programName)
}