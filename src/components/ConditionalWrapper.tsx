'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

interface ConditionalWrapperProps {
  children: React.ReactNode
}

export default function ConditionalWrapper({ children }: ConditionalWrapperProps) {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith('/admin')

  if (isAdminRoute) {
    // For admin routes, don't show navbar or footer
    return <>{children}</>
  }

  // For non-admin routes, show navbar and footer
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  )
}