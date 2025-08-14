"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
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

function ActivitiesContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'programs' | 'groups'>('programs')
  const [editingGroup, setEditingGroup] = useState<CommunityGroup | null>(null)
  const [showGroupForm, setShowGroupForm] = useState(false)
  
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

  // Form state for community groups
  const [groupFormData, setGroupFormData] = useState<Partial<CommunityGroup>>({
    title: '',
    description: '',
    category: 'community',
    meetingTime: '',
    meetingDay: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    imageUrl: '',
    websiteUrl: '',
    facebookUrl: '',
    instagramUrl: '',
    memberCount: null,
    ageGroup: '',
    language: '',
    fees: '',
    featured: false,
    displayOrder: 0,
    active: true
  })
  const [groupFormLoading, setGroupFormLoading] = useState(false)
  const [groupFormError, setGroupFormError] = useState('')

  useEffect(() => {
    fetchPrograms()
    fetchGroups()
    fetchPageSettings()

    // Handle URL parameters
    const tab = searchParams.get('tab')
    const action = searchParams.get('action')
    const id = searchParams.get('id')

    if (tab === 'groups') {
      setActiveTab('groups')
      
      if (action === 'new') {
        setShowGroupForm(true)
        setEditingGroup(null)
        setGroupFormData({
          title: '',
          description: '',
          category: 'community',
          meetingTime: '',
          meetingDay: '',
          contactName: '',
          contactEmail: '',
          contactPhone: '',
          imageUrl: '',
          websiteUrl: '',
          facebookUrl: '',
          instagramUrl: '',
          memberCount: null,
          ageGroup: '',
          language: '',
          fees: '',
          featured: false,
          displayOrder: 0,
          active: true
        })
      } else if (action === 'edit' && id) {
        fetchGroupForEdit(parseInt(id))
      }
    }
  }, [searchParams])

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

  const fetchGroupForEdit = async (id: number) => {
    try {
      const response = await fetch(`/api/community-groups/${id}`)
      if (!response.ok) throw new Error('Failed to fetch community group')
      const data = await response.json()
      setEditingGroup(data)
      setGroupFormData(data)
      setShowGroupForm(true)
    } catch (error) {
      console.error('Error fetching community group:', error)
      setGroupFormError('Failed to load community group for editing')
    }
  }

  const handleGroupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGroupFormLoading(true)
    setGroupFormError('')

    // Client-side validation
    if (!groupFormData.title?.trim()) {
      setGroupFormError('Group title is required')
      setGroupFormLoading(false)
      return
    }

    // Validate URLs if provided
    const urlFields = ['websiteUrl', 'facebookUrl', 'instagramUrl'] as const
    for (const field of urlFields) {
      const url = groupFormData[field]
      if (url && url.trim()) {
        try {
          new URL(url)
        } catch {
          setGroupFormError(`Please enter a valid ${field.replace('Url', '').toLowerCase()} URL`)
          setGroupFormLoading(false)
          return
        }
      }
    }

    // Validate email if provided
    if (groupFormData.contactEmail && groupFormData.contactEmail.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(groupFormData.contactEmail)) {
        setGroupFormError('Please enter a valid email address')
        setGroupFormLoading(false)
        return
      }
    }

    try {
      const url = editingGroup 
        ? `/api/community-groups/${editingGroup.id}`
        : '/api/community-groups'
      
      const method = editingGroup ? 'PUT' : 'POST'
      
      // Clean up data before sending
      const cleanData = {
        ...groupFormData,
        title: groupFormData.title?.trim(),
        description: groupFormData.description?.trim() || null,
        category: groupFormData.category || null,
        meetingTime: groupFormData.meetingTime || null,
        meetingDay: groupFormData.meetingDay || null,
        contactName: groupFormData.contactName?.trim() || null,
        contactEmail: groupFormData.contactEmail?.trim() || null,
        contactPhone: groupFormData.contactPhone?.trim() || null,
        imageUrl: groupFormData.imageUrl?.trim() || null,
        websiteUrl: groupFormData.websiteUrl?.trim() || null,
        facebookUrl: groupFormData.facebookUrl?.trim() || null,
        instagramUrl: groupFormData.instagramUrl?.trim() || null,
        ageGroup: groupFormData.ageGroup?.trim() || null,
        language: groupFormData.language?.trim() || null,
        fees: groupFormData.fees?.trim() || null,
        featured: Boolean(groupFormData.featured),
        active: groupFormData.active !== false,
        displayOrder: Math.max(0, groupFormData.displayOrder || 0),
        memberCount: groupFormData.memberCount && groupFormData.memberCount > 0 ? groupFormData.memberCount : null
      }
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanData)
      })

      if (!response.ok) {
        const errorText = await response.text()
        let errorMessage = 'Failed to save community group'
        try {
          const errorData = JSON.parse(errorText)
          errorMessage = errorData.error || errorMessage
        } catch {
          errorMessage = errorText || errorMessage
        }
        throw new Error(errorMessage)
      }

      await fetchGroups()
      setShowGroupForm(false)
      setEditingGroup(null)
      setGroupFormData({
        title: '',
        description: '',
        category: 'community',
        meetingTime: '',
        meetingDay: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        imageUrl: '',
        websiteUrl: '',
        facebookUrl: '',
        instagramUrl: '',
        memberCount: null,
        ageGroup: '',
        language: '',
        fees: '',
        featured: false,
        displayOrder: 0,
        active: true
      })
      router.push('/admin/programs?tab=groups')
    } catch (error) {
      console.error('Error saving community group:', error)
      setGroupFormError(error instanceof Error ? error.message : 'Failed to save community group')
    } finally {
      setGroupFormLoading(false)
    }
  }

  const cancelGroupForm = () => {
    setShowGroupForm(false)
    setEditingGroup(null)
    setGroupFormError('')
    router.push('/admin/programs?tab=groups')
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
                  {!showGroupForm ? (
                    <>
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900">Community Groups</h3>
                        <button
                          onClick={() => {
                            setShowGroupForm(true)
                            setEditingGroup(null)
                            setGroupFormData({
                              title: '',
                              description: '',
                              category: 'community',
                              meetingTime: '',
                              meetingDay: '',
                              contactName: '',
                              contactEmail: '',
                              contactPhone: '',
                              imageUrl: '',
                              websiteUrl: '',
                              facebookUrl: '',
                              instagramUrl: '',
                              memberCount: null,
                              ageGroup: '',
                              language: '',
                              fees: '',
                              featured: false,
                              displayOrder: 0,
                              active: true
                            })
                          }}
                          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium uppercase"
                        >
                          Add New Group
                        </button>
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
                            <button
                              onClick={() => {
                                setEditingGroup(group)
                                setGroupFormData(group)
                                setShowGroupForm(true)
                              }}
                              className="text-primary-600 hover:text-primary-900 text-sm font-medium uppercase"
                            >
                              Edit
                            </button>
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
                    </>
                  ) : (
                    <div className="bg-white shadow rounded-lg p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {editingGroup ? 'Edit Community Group' : 'Add New Community Group'}
                        </h3>
                        <button
                          onClick={() => {
                            setShowGroupForm(false)
                            setEditingGroup(null)
                            setGroupFormError('')
                            router.push('/admin/programs?tab=groups')
                          }}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {groupFormError && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                          <div className="text-sm text-red-600">{groupFormError}</div>
                        </div>
                      )}

                      <form onSubmit={handleGroupSubmit} className="space-y-6">
                        {/* Basic Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Group Title *
                            </label>
                            <input
                              type="text"
                              value={groupFormData.title || ''}
                              onChange={(e) => setGroupFormData(prev => ({...prev, title: e.target.value}))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Category
                            </label>
                            <select
                              value={groupFormData.category || ''}
                              onChange={(e) => setGroupFormData(prev => ({...prev, category: e.target.value}))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                              <option value="">Select Category</option>
                              <option value="cultural">Cultural</option>
                              <option value="community">Community</option>
                              <option value="support">Support</option>
                              <option value="education">Education</option>
                              <option value="religious">Religious</option>
                              <option value="sports">Sports & Recreation</option>
                              <option value="health">Health & Wellbeing</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                          </label>
                          <textarea
                            rows={4}
                            value={groupFormData.description || ''}
                            onChange={(e) => setGroupFormData(prev => ({...prev, description: e.target.value}))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Describe the community group, its purpose, and activities..."
                          />
                        </div>

                        {/* Meeting Information */}
                        <div className="border-t pt-6">
                          <h4 className="text-md font-medium text-gray-900 mb-4">Meeting Information</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Meeting Day
                              </label>
                              <select
                                value={groupFormData.meetingDay || ''}
                                onChange={(e) => setGroupFormData(prev => ({...prev, meetingDay: e.target.value}))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                              >
                                <option value="">Select Day</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Meeting Time
                              </label>
                              <input
                                type="time"
                                value={groupFormData.meetingTime || ''}
                                onChange={(e) => setGroupFormData(prev => ({...prev, meetingTime: e.target.value}))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Group Details */}
                        <div className="border-t pt-6">
                          <h4 className="text-md font-medium text-gray-900 mb-4">Group Details</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Age Group
                              </label>
                              <input
                                type="text"
                                value={groupFormData.ageGroup || ''}
                                onChange={(e) => setGroupFormData(prev => ({...prev, ageGroup: e.target.value}))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="e.g., All ages, 18+, Seniors"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Language
                              </label>
                              <input
                                type="text"
                                value={groupFormData.language || ''}
                                onChange={(e) => setGroupFormData(prev => ({...prev, language: e.target.value}))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="e.g., English, Hindi, Arabic"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Member Count
                              </label>
                              <input
                                type="number"
                                value={groupFormData.memberCount || ''}
                                onChange={(e) => setGroupFormData(prev => ({...prev, memberCount: e.target.value ? parseInt(e.target.value) : null}))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="Approximate member count"
                                min="0"
                              />
                            </div>
                          </div>
                          <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Fees/Cost
                            </label>
                            <input
                              type="text"
                              value={groupFormData.fees || ''}
                              onChange={(e) => setGroupFormData(prev => ({...prev, fees: e.target.value}))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                              placeholder="e.g., Free, £5 per session, £20/month"
                            />
                          </div>
                        </div>

                        {/* Contact Information */}
                        <div className="border-t pt-6">
                          <h4 className="text-md font-medium text-gray-900 mb-4">Contact Information</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contact Name
                              </label>
                              <input
                                type="text"
                                value={groupFormData.contactName || ''}
                                onChange={(e) => setGroupFormData(prev => ({...prev, contactName: e.target.value}))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="Primary contact person"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contact Email
                              </label>
                              <input
                                type="email"
                                value={groupFormData.contactEmail || ''}
                                onChange={(e) => setGroupFormData(prev => ({...prev, contactEmail: e.target.value}))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="contact@example.com"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contact Phone
                              </label>
                              <input
                                type="tel"
                                value={groupFormData.contactPhone || ''}
                                onChange={(e) => setGroupFormData(prev => ({...prev, contactPhone: e.target.value}))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="Phone number"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Online Presence */}
                        <div className="border-t pt-6">
                          <h4 className="text-md font-medium text-gray-900 mb-4">Online Presence</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Website URL
                              </label>
                              <input
                                type="url"
                                value={groupFormData.websiteUrl || ''}
                                onChange={(e) => setGroupFormData(prev => ({...prev, websiteUrl: e.target.value}))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="https://example.com"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Facebook URL
                              </label>
                              <input
                                type="url"
                                value={groupFormData.facebookUrl || ''}
                                onChange={(e) => setGroupFormData(prev => ({...prev, facebookUrl: e.target.value}))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="https://facebook.com/yourgroup"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Instagram URL
                              </label>
                              <input
                                type="url"
                                value={groupFormData.instagramUrl || ''}
                                onChange={(e) => setGroupFormData(prev => ({...prev, instagramUrl: e.target.value}))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="https://instagram.com/yourgroup"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Image Upload */}
                        <div className="border-t pt-6">
                          <FileUpload
                            onFileSelect={(mediaItem) => {
                              if (mediaItem.filePath) {
                                setGroupFormData(prev => ({...prev, imageUrl: mediaItem.filePath}))
                              } else {
                                setGroupFormData(prev => ({...prev, imageUrl: ''}))
                              }
                            }}
                            currentImage={groupFormData.imageUrl || ''}
                            label="Group Image"
                            accept="image/*"
                          />
                        </div>

                        {/* Settings */}
                        <div className="border-t pt-6">
                          <h4 className="text-md font-medium text-gray-900 mb-4">Settings</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Display Order
                              </label>
                              <input
                                type="number"
                                value={groupFormData.displayOrder || 0}
                                onChange={(e) => setGroupFormData(prev => ({...prev, displayOrder: parseInt(e.target.value) || 0}))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="0"
                                min="0"
                              />
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="featured"
                                checked={groupFormData.featured || false}
                                onChange={(e) => setGroupFormData(prev => ({...prev, featured: e.target.checked}))}
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                              />
                              <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-700">
                                Featured Group
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="active"
                                checked={groupFormData.active !== false}
                                onChange={(e) => setGroupFormData(prev => ({...prev, active: e.target.checked}))}
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                              />
                              <label htmlFor="active" className="ml-2 text-sm font-medium text-gray-700">
                                Active
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="border-t pt-6 flex justify-end space-x-4">
                          <button
                            type="button"
                            onClick={() => {
                              setShowGroupForm(false)
                              setEditingGroup(null)
                              setGroupFormError('')
                              router.push('/admin/programs?tab=groups')
                            }}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={groupFormLoading}
                            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed uppercase"
                          >
                            {groupFormLoading ? 'Saving...' : (editingGroup ? 'Update Group' : 'Create Group')}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </AdminLayout>
    </AdminAuth>
  )
}

export default function ProgramsPage() {
  return (
    <Suspense fallback={
      <AdminAuth>
        <AdminLayout>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </AdminLayout>
      </AdminAuth>
    }>
      <ActivitiesContent />
    </Suspense>
  )
}