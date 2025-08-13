'use client'

import { useState, useEffect } from 'react'
import OptimizedImage from '@/components/OptimizedImage'

interface CommunityGroup {
  id: number
  title: string
  name?: string | null
  description: string | null
  category: string | null
  meetingTime: string | null
  meetingDay: string | null
  contactName: string | null
  contactEmail: string | null
  contactPhone: string | null
  imageUrl: string | null
  websiteUrl: string | null
  facebookUrl: string | null
  instagramUrl: string | null
  memberCount: number | null
  ageGroup: string | null
  language: string | null
  fees: string | null
  featured: boolean
  displayOrder: number
  active: boolean
}

export default function CommunityGroupsDisplay() {
  const [groups, setGroups] = useState<CommunityGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchGroups()
  }, [])

  const fetchGroups = async () => {
    try {
      const response = await fetch('/api/community-groups')
      if (!response.ok) throw new Error('Failed to fetch community groups')
      const data = await response.json()
      setGroups(data)
    } catch (error) {
      setError('Failed to load community groups')
      console.error('Error fetching community groups:', error)
    } finally {
      setLoading(false)
    }
  }

  // Get unique categories from groups
  const categories = Array.from(new Set(groups.map(group => group.category).filter(Boolean))) as string[]

  // Filter groups
  const filteredGroups = groups.filter(group => {
    const matchesSearch = !searchTerm || 
      group.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.language?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = !filterCategory || group.category === filterCategory
    
    return matchesSearch && matchesCategory
  })

  // Separate featured and regular groups
  const featuredGroups = filteredGroups.filter(group => group.featured)
  const regularGroups = filteredGroups.filter(group => !group.featured)

  const getCategoryColor = (category: string | null) => {
    const colors = {
      'Cultural & Social': 'bg-purple-100 text-purple-800 border-purple-200',
      'Religious': 'bg-blue-100 text-blue-800 border-blue-200',
      'Educational': 'bg-green-100 text-green-800 border-green-200',
      'Sports & Recreation': 'bg-orange-100 text-orange-800 border-orange-200',
      'Health & Wellbeing': 'bg-pink-100 text-pink-800 border-pink-200'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const GroupCard = ({ group }: { group: CommunityGroup }) => (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${group.featured ? 'ring-2 ring-yellow-400' : ''}`}>
      {group.imageUrl && (
        <div className="relative h-48 w-full">
          <OptimizedImage
            src={group.imageUrl || '/img/80-chairs.jpeg'}
            alt={group.title}
            fill
            className="object-cover"
            fallback="/img/80-chairs.jpeg"
          />
          {group.featured && (
            <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
              ⭐ Featured
            </div>
          )}
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
            {group.title}
          </h3>
          {group.category && (
            <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(group.category)}`}>
              {group.category}
            </span>
          )}
        </div>

        {group.description && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {group.description}
          </p>
        )}

        <div className="space-y-2 mb-4">
          {group.meetingDay && group.meetingTime && (
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {group.meetingDay}s at {group.meetingTime}
            </div>
          )}
          
          {group.language && (
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              {group.language}
            </div>
          )}

          {group.memberCount && (
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {group.memberCount} members
            </div>
          )}

          {group.ageGroup && (
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {group.ageGroup}
            </div>
          )}

          {group.fees && (
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              {group.fees}
            </div>
          )}
        </div>

        {/* Contact Information */}
        {(group.contactName || group.contactEmail || group.contactPhone) && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Contact</h4>
            {group.contactName && (
              <p className="text-sm text-gray-600">{group.contactName}</p>
            )}
            {group.contactEmail && (
              <a 
                href={`mailto:${group.contactEmail}`} 
                className="text-sm text-primary-600 hover:text-primary-500 block"
              >
                {group.contactEmail}
              </a>
            )}
            {group.contactPhone && (
              <a 
                href={`tel:${group.contactPhone}`} 
                className="text-sm text-primary-600 hover:text-primary-500 block"
              >
                {group.contactPhone}
              </a>
            )}
          </div>
        )}

        {/* Social Links */}
        {(group.websiteUrl || group.facebookUrl || group.instagramUrl) && (
          <div className="border-t pt-4 mt-4">
            <div className="flex space-x-3">
              {group.websiteUrl && (
                <a
                  href={group.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600"
                  title="Visit website"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.499-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.499.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.497-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
              {group.facebookUrl && (
                <a
                  href={group.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600"
                  title="Visit Facebook page"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
              {group.instagramUrl && (
                <a
                  href={group.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-600"
                  title="Visit Instagram profile"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2c2.17 0 2.429.008 3.284.048.853.04 1.434.174 1.943.372a3.916 3.916 0 011.416.923c.445.445.72.89.923 1.417.198.508.333 1.09.372 1.942C17.992 7.571 18 7.83 18 10s-.008 2.429-.048 3.284c-.04.853-.174 1.434-.372 1.943a3.916 3.916 0 01-.923 1.416c-.445.445-.89.72-1.417.923-.508.198-1.09.333-1.942.372C12.429 17.992 12.17 18 10 18s-2.429-.008-3.284-.048c-.853-.04-1.434-.174-1.943-.372a3.916 3.916 0 01-1.416-.923c-.445-.445-.72-.89-.923-1.417-.198-.508-.333-1.09-.372-1.942C2.008 12.429 2 12.17 2 10s.008-2.429.048-3.284c.04-.853.174-1.434.372-1.943a3.916 3.916 0 01.923-1.416c.445-.445.89-.72 1.417-.923.508-.198 1.09-.333 1.942-.372C7.571 2.008 7.83 2 10 2zm0 1.802c-2.67 0-4.198 1.528-4.198 4.198S7.33 12.198 10 12.198s4.198-1.528 4.198-4.198S12.67 3.802 10 3.802zm0 6.93A2.732 2.732 0 017.268 8 2.732 2.732 0 0110 5.268 2.732 2.732 0 0112.732 8 2.732 2.732 0 0110 10.732zm5.204-7.201a.978.978 0 11-1.956 0 .978.978 0 011.956 0z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-red-400 text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load community groups</h3>
            <p className="text-gray-500">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Cultural & Social Groups
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our centre hosts various community groups that celebrate different cultures and bring people together.
              Join our vibrant community and connect with others who share your interests.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div>
              <input
                type="text"
                placeholder="Search groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Groups */}
        {featuredGroups.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Featured Groups</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGroups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          </div>
        )}

        {/* Regular Groups */}
        {regularGroups.length > 0 && (
          <div>
            {featuredGroups.length > 0 && (
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">All Groups</h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularGroups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          </div>
        )}

        {/* No groups found */}
        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-4xl mb-4">🤝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || filterCategory ? 'No groups found' : 'No community groups yet'}
            </h3>
            <p className="text-gray-500">
              {searchTerm || filterCategory 
                ? 'Try adjusting your search or filter criteria.'
                : 'Check back soon for new community groups.'
              }
            </p>
          </div>
        )}

        {/* Contact Information */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Want to Start a Group?</h2>
          <p className="text-gray-600 mb-6">
            If you're interested in starting a new community group at our centre, we'd love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/contact" 
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium"
            >
              Get in Touch
            </a>
            <a 
              href="tel:+442012345678" 
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              Call us: +44 20 1234 5678
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}