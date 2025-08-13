"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'

export default function EditCommunityGroupRedirect() {
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    // Redirect to Activities page with groups tab active and edit action
    const id = params.id
    router.replace(`/admin/programs?tab=groups&action=edit&id=${id}`)
  }, [router, params.id])

  return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  )
}