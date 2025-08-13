"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/AdminLayout"
import AdminAuth from "@/components/AdminAuth"
import FileUpload from "@/components/FileUpload"
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

interface ActivitiesPageSettings {
  programs_hero_title: string
  programs_hero_subtitle: string
  programs_hero_image: string
}

export default function ActivitiesManagement() {
  const [activeTab, setActiveTab] = useState<'programs' | 'groups'>('programs')
  
  // Programs state
  const [programs, setPrograms] = useState<Program[]>([])
  const [programsLoading, setProgramsLoading] = useState(true)
  const [programsError, setProgramsError] = useState("")
  const [programSearchTerm, setProgramSearchTerm] = useState("")
  const [programFilterCategory, setProgramFilterCategory] = useState("")
  
  // Community Groups state
  const [groups, setGroups] = useState<CommunityGroup[]>([])
  const [groupsLoading, setGroupsLoading] = useState(true)
  const [groupsError, setGroupsError] = useState("")
  const [groupSearchTerm, setGroupSearchTerm] = useState("")
  const [groupFilterCategory, setGroupFilterCategory] = useState("")
  
  // Page settings state
  const [pageSettings, setPageSettings] = useState<ActivitiesPageSettings>({
    programs_hero_title: "Programmes & Activities",
    programs_hero_subtitle: "15+ regular programmes every week for all ages and interests",
    programs_hero_image: "/img/IMG_1290.jpeg"
  })
  const [settingsLoading, setSettingsLoading] = useState(false)
  const [settingsMessage, setSettingsMessage] = useState("")

  useEffect(() => {
    fetchPrograms()
    fetchGroups()
    fetchPageSettings()
  }, [])

  const fetchPrograms = async () => {
    try {
      const response = await fetch('/api/programs')
      if (!response.ok) throw new Error('Failed to fetch programs')
      const data = await response.json()
      setPrograms(data)
    } catch (error) {
      setProgramsError('Failed to load programs')
      console.error('Error fetching programs:', error)
    } finally {
      setProgramsLoading(false)
    }
  }

  const fetchGroups = async () => {
    try {
      const response = await fetch('/api/community-groups')
      if (!response.ok) throw new Error('Failed to fetch community groups')
      const data = await response.json()
      setGroups(data)
    } catch (error) {
      setGroupsError('Failed to load community groups')
      console.error('Error fetching community groups:', error)
    } finally {
      setGroupsLoading(false)
    }
  }

  const fetchPageSettings = async () => {
    try {
      const response = await fetch('/api/settings')
      if (!response.ok) throw new Error('Failed to fetch settings')
      const data = await response.json()
      
      const settings = data.reduce((acc: any, setting: any) => {
        acc[setting.key] = setting.value
        return acc
      }, {})
      
      setPageSettings({
        programs_hero_title: settings.programs_hero_title || "Programmes & Activities",
        programs_hero_subtitle: settings.programs_hero_subtitle || "15+ regular programmes every week for all ages and interests",
        programs_hero_image: settings.programs_hero_image || "/img/IMG_1290.jpeg"
      })
    } catch (error) {
      console.error('Error fetching page settings:', error)
    }
  }

  const savePageSettings = async () => {
    setSettingsLoading(true)
    setSettingsMessage("")
    
    try {
      const settingsToUpdate = Object.entries(pageSettings).map(([key, value]) => ({
        key,
        value,
        type: key === 'programs_hero_image' ? 'image' : 'text',
        description: `📚 PROGRAMS - ${key.replace('programs_hero_', '').replace('_', ' ')}`
      }))

      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ settings: settingsToUpdate })
      })

      if (!response.ok) throw new Error('Failed to save settings')

      setSettingsMessage("Activities page settings saved successfully!")
      setTimeout(() => setSettingsMessage(""), 3000)
    } catch (error) {
      setSettingsMessage("Error saving settings. Please try again.")
      console.error('Error saving page settings:', error)
    } finally {
      setSettingsLoading(false)
    }
  }

  const handlePageSettingChange = (field: keyof ActivitiesPageSettings, value: string) => {
    setPageSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const deleteProgram = async (id: number) => {
    if (!confirm('Are you sure you want to delete this program?')) return

    try {
      const response = await fetch(`/api/programs/${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) throw new Error('Failed to delete program')
      
      fetchPrograms()
    } catch (error) {
      console.error('Error deleting program:', error)
      alert('Failed to delete program')
    }
  }

  const deleteGroup = async (id: number) => {
    if (!confirm('Are you sure you want to delete this community group?')) return

    try {
      const response = await fetch(`/api/community-groups/${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) throw new Error('Failed to delete community group')
      
      fetchGroups()
    } catch (error) {
      console.error('Error deleting community group:', error)
      alert('Failed to delete community group')
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'early-years': 'bg-pink-100 text-pink-800',
      'martial-arts': 'bg-red-100 text-red-800',
      'education': 'bg-blue-100 text-blue-800',
      'fitness': 'bg-green-100 text-green-800',
      'cultural': 'bg-purple-100 text-purple-800',
      'community': 'bg-yellow-100 text-yellow-800',
      'support': 'bg-indigo-100 text-indigo-800',
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  // Filter programs
  const filteredPrograms = programs.filter(program => {
    const matchesSearch = programSearchTerm === '' || 
      program.title.toLowerCase().includes(programSearchTerm.toLowerCase()) ||
      program.description?.toLowerCase().includes(programSearchTerm.toLowerCase()) ||
      program.instructor?.toLowerCase().includes(programSearchTerm.toLowerCase())
    
    const matchesCategory = programFilterCategory === '' || program.category === programFilterCategory
    
    return matchesSearch && matchesCategory
  })

  // Filter community groups
  const filteredGroups = groups.filter(group => {
    const matchesSearch = groupSearchTerm === '' || 
      group.title.toLowerCase().includes(groupSearchTerm.toLowerCase()) ||
      group.description?.toLowerCase().includes(groupSearchTerm.toLowerCase()) ||
      group.contactName?.toLowerCase().includes(groupSearchTerm.toLowerCase())
    
    const matchesCategory = groupFilterCategory === '' || group.category === groupFilterCategory
    
    return matchesSearch && matchesCategory
  })

  if (programsLoading || groupsLoading) {
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
              <h1 className="text-2xl font-bold text-gray-900">Activities Management</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your programs and community groups
              </p>
            </div>
          </div>

          {(programsError || groupsError) && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="text-sm text-red-600">{programsError || groupsError}</div>
            </div>
          )}

          {settingsMessage && (
            <div className={`p-4 rounded-md text-sm ${
              settingsMessage.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
            }`}>
              {settingsMessage}
            </div>
          )}

          {/* Activities Page Settings */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Activities Page Settings</h2>
                <p className="text-sm text-gray-500">Configure the activities page hero section</p>
              </div>
              <button
                onClick={savePageSettings}
                disabled={settingsLoading}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed uppercase"
              >
                {settingsLoading ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activities Hero Title
                </label>
                <input
                  type="text"
                  value={pageSettings.programs_hero_title}
                  onChange={(e) => handlePageSettingChange('programs_hero_title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  placeholder="Programmes & Activities"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activities Hero Subtitle
                </label>
                <input
                  type="text"
                  value={pageSettings.programs_hero_subtitle}
                  onChange={(e) => handlePageSettingChange('programs_hero_subtitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  placeholder="15+ regular programmes every week for all ages and interests"
                />
              </div>
              
              <div>
                <FileUpload
                  onFileSelect={(mediaItem) => {
                    if (mediaItem.filePath) {
                      handlePageSettingChange('programs_hero_image', mediaItem.filePath)
                    } else {
                      handlePageSettingChange('programs_hero_image', '')
                    }
                  }}
                  currentImage={pageSettings.programs_hero_image}
                  label="Activities Hero Background Image"
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white shadow rounded-lg">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex">
                <button
                  onClick={() => setActiveTab('programs')}
                  className={`py-2 px-4 text-sm font-medium border-b-2 ${
                    activeTab === 'programs'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Programs ({programs.length})
                </button>
                <button
                  onClick={() => setActiveTab('groups')}
                  className={`py-2 px-4 text-sm font-medium border-b-2 ${
                    activeTab === 'groups'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Community Groups ({groups.length})
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'programs' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Programs</h3>
                    <Link
                      href="/admin/programs/new"
                      className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium uppercase"
                    >
                      Add New Program
                    </Link>
                  </div>

                  {/* Search and Filter for Programs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Search Programs
                      </label>
                      <input
                        type="text"
                        value={programSearchTerm}
                        onChange={(e) => setProgramSearchTerm(e.target.value)}
                        placeholder="Search by title, description, or instructor..."
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Filter by Category
                      </label>
                      <select
                        value={programFilterCategory}
                        onChange={(e) => setProgramFilterCategory(e.target.value)}
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

                  {/* Programs List */}
                  <div className="grid gap-6">
                    {filteredPrograms.map((program) => (
                      <div key={program.id} className="bg-gray-50 shadow rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-semibold text-gray-900">{program.title}</h3>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(program.category)}`}>
                                {program.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </span>
                              {!program.active && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  Inactive
                                </span>
                              )}
                            </div>
                            {program.description && (
                              <p className="text-gray-600 mb-2">{program.description}</p>
                            )}
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                              {program.ageGroup && <span>Age: {program.ageGroup}</span>}
                              {program.price && <span>Price: {program.price}</span>}
                              {program.instructor && <span>Instructor: {program.instructor}</span>}
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Link
                              href={`/admin/programs/${program.id}/edit`}
                              className="text-primary-600 hover:text-primary-900 text-sm font-medium uppercase"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => deleteProgram(program.id)}
                              className="text-red-600 hover:text-red-900 text-sm font-medium uppercase"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'groups' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Community Groups</h3>
                    <Link
                      href="/admin/community-groups/new"
                      className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium uppercase"
                    >
                      Add New Group
                    </Link>
                  </div>

                  {/* Search and Filter for Groups */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Search Groups
                      </label>
                      <input
                        type="text"
                        value={groupSearchTerm}
                        onChange={(e) => setGroupSearchTerm(e.target.value)}
                        placeholder="Search by title, description, or contact..."
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Filter by Category
                      </label>
                      <select
                        value={groupFilterCategory}
                        onChange={(e) => setGroupFilterCategory(e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      >
                        <option value="">All Categories</option>
                        <option value="cultural">Cultural</option>
                        <option value="community">Community</option>
                        <option value="support">Support</option>
                        <option value="education">Education</option>
                      </select>
                    </div>
                  </div>

                  {/* Community Groups List */}
                  <div className="grid gap-6">
                    {filteredGroups.map((group) => (
                      <div key={group.id} className="bg-gray-50 shadow rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-semibold text-gray-900">{group.title}</h3>
                              {group.category && (
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(group.category)}`}>
                                  {group.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </span>
                              )}
                              {group.featured && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                  Featured
                                </span>
                              )}
                              {!group.active && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  Inactive
                                </span>
                              )}
                            </div>
                            {group.description && (
                              <p className="text-gray-600 mb-2">{group.description}</p>
                            )}
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                              {group.meetingTime && group.meetingDay && (
                                <span>Meets: {group.meetingDay} at {group.meetingTime}</span>
                              )}
                              {group.memberCount && <span>Members: {group.memberCount}</span>}
                              {group.contactName && <span>Contact: {group.contactName}</span>}
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Link
                              href={`/admin/community-groups/${group.id}/edit`}
                              className="text-primary-600 hover:text-primary-900 text-sm font-medium uppercase"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => deleteGroup(group.id)}
                              className="text-red-600 hover:text-red-900 text-sm font-medium uppercase"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </AdminLayout>
    </AdminAuth>
  )
}