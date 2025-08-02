import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function withAuth(
  request: NextRequest,
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  try {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    })

    if (!token || token.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    return handler(request)
  } catch (error) {
    console.error('Auth middleware error:', error)
    return NextResponse.json(
      { error: 'Authentication error' },
      { status: 401 }
    )
  }
}

export async function checkAuth(request: NextRequest): Promise<boolean> {
  try {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    })

    return token?.role === 'admin'
  } catch (error) {
    console.error('Check auth error:', error)
    return false
  }
}