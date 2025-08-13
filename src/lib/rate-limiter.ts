interface RateLimitRecord {
  count: number
  resetTime: number
}

class RateLimiter {
  private records: Map<string, RateLimitRecord> = new Map()
  private readonly maxRequests: number
  private readonly windowMs: number

  constructor(maxRequests: number = 10, windowMs: number = 60 * 60 * 1000) {
    this.maxRequests = maxRequests
    this.windowMs = windowMs
    
    // Clean up old records every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000)
  }

  /**
   * Check if a request should be allowed
   * @param identifier - Unique identifier (IP address, user ID, etc.)
   * @returns true if allowed, false if rate limited
   */
  checkLimit(identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now()
    const record = this.records.get(identifier)

    if (!record || now > record.resetTime) {
      // Create new record or reset expired one
      this.records.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs
      })
      return {
        allowed: true,
        remaining: this.maxRequests - 1,
        resetTime: now + this.windowMs
      }
    }

    if (record.count >= this.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: record.resetTime
      }
    }

    // Increment count
    record.count++
    return {
      allowed: true,
      remaining: this.maxRequests - record.count,
      resetTime: record.resetTime
    }
  }

  /**
   * Clean up expired records
   */
  private cleanup() {
    const now = Date.now()
    const keysToDelete: string[] = []
    
    this.records.forEach((record, key) => {
      if (now > record.resetTime) {
        keysToDelete.push(key)
      }
    })
    
    keysToDelete.forEach(key => this.records.delete(key))
  }

  /**
   * Reset limits for a specific identifier
   */
  reset(identifier: string) {
    this.records.delete(identifier)
  }
}

// Create singleton instance for upload rate limiting
// 10 uploads per hour per IP
export const uploadRateLimiter = new RateLimiter(10, 60 * 60 * 1000)

// Helper function to get client IP from request
export function getClientIp(request: Request): string {
  // Check various headers that might contain the real IP
  const headers = request.headers
  const forwardedFor = headers.get('x-forwarded-for')
  const realIp = headers.get('x-real-ip')
  const cloudflareIp = headers.get('cf-connecting-ip')
  
  if (cloudflareIp) return cloudflareIp
  if (forwardedFor) return forwardedFor.split(',')[0]?.trim() || 'unknown'
  if (realIp) return realIp
  
  // Fallback to a default if no IP found
  return 'unknown'
}