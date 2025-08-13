import { NextResponse } from 'next/server'
import { isR2Configured } from '@/lib/r2-storage'

// GET /api/media/status - Check storage configuration status
export async function GET() {
  const r2Configured = isR2Configured()
  
  return NextResponse.json({
    storageType: r2Configured ? 'r2' : 'local',
    r2: {
      configured: r2Configured,
      bucketName: r2Configured ? process.env.R2_BUCKET_NAME : null,
      publicUrl: r2Configured ? process.env.R2_PUBLIC_URL : null,
      region: r2Configured ? process.env.R2_REGION : null
    },
    local: {
      uploadPath: process.env.UPLOAD_PATH || '/public/uploads'
    },
    limits: {
      maxFileSize: '5MB',
      allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      rateLimit: '10 uploads per hour per IP'
    }
  })
}