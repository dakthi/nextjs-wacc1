import CommunityGroupsDisplay from '@/components/CommunityGroupsDisplay'
import { generateSEOMetadata } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: "Cultural & Social Groups",
    description: "Discover the diverse cultural and social groups that meet at West Acton Community Centre. Join our vibrant community and celebrate different cultures together.",
    url: "/community-groups",
    keywords: [
      "cultural groups",
      "social groups",
      "community groups",
      "multicultural",
      "cultural activities",
      "social activities",
      "group meetings",
      "cultural celebrations",
      "diverse community",
      "ethnic groups",
      "religious groups",
      "language groups"
    ]
  });
}

export const dynamic = 'force-dynamic'

export default function CommunityGroupsPage() {
  return <CommunityGroupsDisplay />
}