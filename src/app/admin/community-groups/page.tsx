"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/AdminLayout"
import AdminAuth from "@/components/AdminAuth"
import Link from "next/link"

export const dynamic = 'force-dynamic'

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
  createdAt: string | null
  updatedAt: string | null
}

export default function CommunityGroupsManagement() {
  const [groups, setGroups] = useState<CommunityGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("")

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

  const deleteGroup = async (id: number) => {
    if (!confirm('Are you sure you want to delete this community group?')) return

    try {
      const response = await fetch(`/api/community-groups/${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) throw new Error('Failed to delete community group')
      
      // Refresh the list
      fetchGroups()
    } catch (error) {
      console.error('Error deleting community group:', error)
      alert('Failed to delete community group')
    }
  }

  const toggleFeatured = async (id: number, featured: boolean) => {
    try {
      const response = await fetch(`/api/community-groups/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !featured })
      })
      
      if (!response.ok) throw new Error('Failed to update community group')
      
      // Refresh the list
      fetchGroups()
    } catch (error) {
      console.error('Error updating community group:', error)
      alert('Failed to update community group')
    }
  }

  const getCategoryColor = (category: string | null) => {
    const colors = {
      'Cultural & Social': 'bg-purple-100 text-purple-800',
      'Religious': 'bg-blue-100 text-blue-800',
      'Educational': 'bg-green-100 text-green-800',
      'Sports & Recreation': 'bg-orange-100 text-orange-800',
      'Health & Wellbeing': 'bg-pink-100 text-pink-800'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  // Filter groups based on search term and category
  const filteredGroups = groups.filter(group => {
    const matchesSearch = searchTerm === '' || 
      group.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (group.name && group.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      group.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.contactName?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = filterCategory === '' || group.category === filterCategory
    
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <AdminAuth>
        <AdminLayout>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </AdminLayout>
      </AdminAuth>
    )
  }

  return (
    <AdminAuth>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Community Groups Management</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage cultural and social groups that meet at the centre
              </p>
            </div>
            <Link
              href="/admin/community-groups/new"
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium uppercase"
            >
              Add New Group
            </Link>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="text-sm text-red-600">{error}</div>
            </div>
          )}

          {/* Search and Filter */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Groups
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, description, or contact..."
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Category
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option value="">All Categories</option>
                  <option value="Cultural & Social">Cultural & Social</option>
                  <option value="Religious">Religious</option>
                  <option value="Educational">Educational</option>
                  <option value="Sports & Recreation">Sports & Recreation</option>
                  <option value="Health & Wellbeing">Health & Wellbeing</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredGroups.map((group) => (
                <li key={group.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-medium text-gray-900">
                            {group.title}
                          </h3>
                          {group.category && (
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(group.category)}`}>
                              {group.category}
                            </span>
                          )}
                          {group.featured && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              ⭐ Featured
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                          {group.description}
                        </p>
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                          {group.meetingDay && group.meetingTime && (
                            <span>📅 {group.meetingDay}s at {group.meetingTime}</span>
                          )}
                          {group.memberCount && (
                            <span>👥 {group.memberCount} members</span>
                          )}
                          {group.language && (
                            <span>🗣️ {group.language}</span>
                          )}
                          {group.ageGroup && (
                            <span>👥 {group.ageGroup}</span>
                          )}
                        </div>
                        {group.contactName && (
                          <div className="mt-1 text-sm text-gray-500">
                            📞 Contact: {group.contactName}
                            {group.contactEmail && ` (${group.contactEmail})`}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleFeatured(group.id, group.featured)}
                          className={`px-3 py-1 rounded text-sm font-medium ${
                            group.featured 
                              ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100' 
                              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {group.featured ? 'Unfeature' : 'Feature'}
                        </button>
                        <Link
                          href={`/admin/community-groups/${group.id}/edit`}
                          className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded text-sm font-medium"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteGroup(group.id)}
                          className="bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1 rounded text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {filteredGroups.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-4xl mb-4">🤝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || filterCategory ? 'No community groups found' : 'No community groups yet'}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || filterCategory 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by creating your first community group.'
                }
              </p>
              {!searchTerm && !filterCategory && (
                <Link
                  href="/admin/community-groups/new"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium uppercase"
                >
                  Add New Group
                </Link>
              )}
            </div>
          )}
        </div>
      </AdminLayout>
    </AdminAuth>
  )
}