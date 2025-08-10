import { Metadata } from 'next'
import CommunityGroupsDisplay from '@/components/CommunityGroupsDisplay'

export const metadata: Metadata = {
  title: 'Cultural & Social Groups | West Acton Community Centre',
  description: 'Discover the diverse cultural and social groups that meet at West Acton Community Centre. Join our vibrant community and celebrate different cultures.',
}

export const dynamic = 'force-dynamic'

export default function CommunityGroupsPage() {
  return <CommunityGroupsDisplay />
}