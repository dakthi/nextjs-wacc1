"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NewCommunityGroupRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to Activities page with groups tab active
    router.replace('/admin/programs?tab=groups&action=new')
  }, [router])

  return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  )
}