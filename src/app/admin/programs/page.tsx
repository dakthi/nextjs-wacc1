"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/AdminLayout"
import AdminAuth from "@/components/AdminAuth"
import Link from "next/link"

export const dynamic = 'force-dynamic'

interface Program {
  id: number
  title: string
  description: string | null
  category: string
  ageGroup: string | null
  price: string | null
  bookingInfo: string | null
  instructor: string | null
  contactEmail: string | null
  contactPhone: string | null
  contactWebsite: string | null
  imageUrl: string | null
  active: boolean
  createdAt: string
  updatedAt: string
  schedules: Array<{
    id: number
    description: string | null
    dayOfWeek: string | null
    startTime: string | null
    endTime: string | null
  }>
}

export default function ProgramsManagement() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("")

  useEffect(() => {
    fetchPrograms()
  }, [])

  const fetchPrograms = async () => {
    try {
      const response = await fetch('/api/programs')
      if (!response.ok) throw new Error('Failed to fetch programs')
      const data = await response.json()
      setPrograms(data)
    } catch (error) {
      setError('Failed to load programs')
      console.error('Error fetching programs:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteProgram = async (id: number) => {
    if (!confirm('Are you sure you want to delete this program?')) return

    try {
      const response = await fetch(`/api/programs/${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) throw new Error('Failed to delete program')
      
      // Refresh the list
      fetchPrograms()
    } catch (error) {
      console.error('Error deleting program:', error)
      alert('Failed to delete program')
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'early-years': 'bg-pink-100 text-pink-800',
      'martial-arts': 'bg-red-100 text-red-800',
      'education': 'bg-blue-100 text-blue-800',
      'fitness': 'bg-green-100 text-green-800'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  // Filter programs based on search term and category
  const filteredPrograms = programs.filter(program => {
    const matchesSearch = searchTerm === '' || 
      program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.instructor?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = filterCategory === '' || program.category === filterCategory
    
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
              <h1 className="text-2xl font-bold text-gray-900">Programs Management</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your community programs and activities
              </p>
            </div>
            <Link
              href="/admin/programs/new"
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium uppercase"
            >
              Add New Program
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
                  Search Programs
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by title, description, or instructor..."
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
                  <option value="early-years">Early Years</option>
                  <option value="martial-arts">Martial Arts</option>
                  <option value="education">Education</option>
                  <option value="fitness">Fitness</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredPrograms.map((program) => (
                <li key={program.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-medium text-gray-900">
                            {program.title}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(program.category)}`}>
                            {program.category}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                          {program.description}
                        </p>
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                          {program.ageGroup && (
                            <span>👥 {program.ageGroup}</span>
                          )}
                          {program.price && (
                            <span>💷 {program.price}</span>
                          )}
                          {program.instructor && (
                            <span>👨‍🏫 {program.instructor}</span>
                          )}
                        </div>
                        {program.schedules.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs text-gray-400">
                              {program.schedules.length} schedule{program.schedules.length !== 1 ? 's' : ''}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/admin/programs/${program.id}/edit`}
                          className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded text-sm font-medium"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteProgram(program.id)}
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

          {filteredPrograms.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-4xl mb-4">📚</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || filterCategory ? 'No programs found' : 'No programs yet'}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || filterCategory 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by creating your first program.'
                }
              </p>
              {!searchTerm && !filterCategory && (
                <Link
                  href="/admin/programs/new"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium uppercase"
                >
                  Add New Program
                </Link>
              )}
            </div>
          )}
        </div>
      </AdminLayout>
    </AdminAuth>
  )
}