"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/AdminLayout"
import AdminAuth from "@/components/AdminAuth"

export const dynamic = 'force-dynamic'

interface SiteSetting {
  id: number
  key: string
  value: string | null
  type: string
  description: string | null
  updatedAt: string
}

const SETTING_TYPES = [
  { value: 'text', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'boolean', label: 'Boolean' },
  { value: 'json', label: 'JSON' }
]

const DEFAULT_SETTINGS: Omit<SiteSetting, 'id' | 'updatedAt'>[] = [
  {
    key: 'site_title',
    value: 'West Acton Community Centre',
    type: 'text',
    description: 'Main site title displayed in header and meta tags'
  },
  {
    key: 'site_description',
    value: 'A vibrant community centre serving West Acton and surrounding areas',
    type: 'text',
    description: 'Site description used in meta tags and social sharing'
  },
  {
    key: 'hero_subtitle',
    value: 'Your local hub for education, leisure, and recreational programs. We serve over 2,000 residents in West Acton with 15+ regular programs every week.',
    type: 'text',
    description: 'Subtitle text displayed on the homepage hero section'
  },
  {
    key: 'hero_description',
    value: 'From Stay & Play sessions for young families to martial arts, fitness classes, and cultural groups — we\'re here to bring our community together and support wellbeing for all ages.',
    type: 'text',
    description: 'Description text displayed on the homepage hero section'
  },
  {
    key: 'contact_phone',
    value: '+44 20 1234 5678',
    type: 'text',
    description: 'Main contact phone number'
  },
  {
    key: 'contact_email',
    value: 'info@westactoncc.org.uk',
    type: 'text',
    description: 'Main contact email address'
  },
  {
    key: 'address',
    value: 'West Acton Community Centre, High Street, London W3',
    type: 'text',
    description: 'Physical address of the centre'
  },
  {
    key: 'residents_served',
    value: '2,000+',
    type: 'text',
    description: 'Number of residents served (displayed in stats)'
  },
  {
    key: 'weekly_programs',
    value: '15+',
    type: 'text',
    description: 'Number of weekly programs (displayed in stats)'
  },
  {
    key: 'main_hall_capacity',
    value: '120',
    type: 'text',
    description: 'Maximum capacity of the main hall'
  },
  {
    key: 'opening_hours_text',
    value: '7 days',
    type: 'text',
    description: 'Short opening hours text (e.g., "7 days")'
  },
  {
    key: 'opening_hours_details',
    value: 'Monday to Sunday, 7am-11pm',
    type: 'text',
    description: 'Detailed opening hours information'
  },
  {
    key: 'social_facebook',
    value: '',
    type: 'text',
    description: 'Facebook page URL'
  },
  {
    key: 'social_twitter',
    value: '',
    type: 'text',
    description: 'Twitter profile URL'
  },
  {
    key: 'social_instagram',
    value: '',
    type: 'text',
    description: 'Instagram profile URL'
  },
  {
    key: 'booking_enabled',
    value: 'true',
    type: 'boolean',
    description: 'Enable online booking functionality'
  },
  {
    key: 'maintenance_mode',
    value: 'false',
    type: 'boolean',
    description: 'Enable maintenance mode for the site'
  }
]

export default function SettingsManagement() {
  const [settings, setSettings] = useState<SiteSetting[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      // Add timestamp to prevent caching
      const timestamp = Date.now()
      const response = await fetch(`/api/settings?t=${timestamp}`)
      if (!response.ok) throw new Error('Failed to fetch settings')
      const data = await response.json()
      
      // Merge with default settings
      const settingsMap = new Map(data.map((s: SiteSetting) => [s.key, s]))
      const mergedSettings = DEFAULT_SETTINGS.map(defaultSetting => {
        const existing = settingsMap.get(defaultSetting.key)
        return existing || {
          id: 0,
          key: defaultSetting.key,
          value: defaultSetting.value,
          type: defaultSetting.type,
          description: defaultSetting.description,
          updatedAt: new Date().toISOString()
        }
      }) as SiteSetting[]

      // Add any additional settings not in defaults
      data.forEach((setting: SiteSetting) => {
        if (!DEFAULT_SETTINGS.find(d => d.key === setting.key)) {
          mergedSettings.push(setting)
        }
      })

      setSettings(mergedSettings)
    } catch (error) {
      setError('Failed to load settings')
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateSettings = async () => {
    setSaving(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ settings })
      })

      if (!response.ok) throw new Error('Failed to update settings')

      setSuccess('Settings updated successfully!')
      // Force refresh after update
      setTimeout(() => fetchSettings(), 100)
    } catch (error) {
      console.error('Error updating settings:', error)
      setError('Failed to update settings')
    } finally {
      setSaving(false)
    }
  }

  const handleSettingChange = (key: string, value: string) => {
    setSettings(prev => prev.map(setting => 
      setting.key === key ? { ...setting, value } : setting
    ))
  }

  const addCustomSetting = () => {
    const key = prompt('Enter setting key:')
    if (!key) return

    const existingSetting = settings.find(s => s.key === key)
    if (existingSetting) {
      alert('Setting with this key already exists')
      return
    }

    const newSetting: SiteSetting = {
      id: 0,
      key,
      value: '',
      type: 'text',
      description: '',
      updatedAt: new Date().toISOString()
    }

    setSettings(prev => [...prev, newSetting])
  }

  const deleteSetting = (key: string) => {
    if (!confirm(`Are you sure you want to delete the "${key}" setting?`)) return

    setSettings(prev => prev.filter(s => s.key !== key))
  }

  const renderSettingInput = (setting: SiteSetting) => {
    switch (setting.type) {
      case 'boolean':
        return (
          <select
            value={setting.value || 'false'}
            onChange={(e) => handleSettingChange(setting.key, e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        )
      case 'number':
        return (
          <input
            type="number"
            value={setting.value || ''}
            onChange={(e) => handleSettingChange(setting.key, e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        )
      case 'json':
        return (
          <textarea
            rows={4}
            value={setting.value || ''}
            onChange={(e) => handleSettingChange(setting.key, e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm font-mono"
            placeholder='{"key": "value"}'
          />
        )
      default:
        return (
          <input
            type="text"
            value={setting.value || ''}
            onChange={(e) => handleSettingChange(setting.key, e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        )
    }
  }

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
              <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your site configuration and global settings
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={addCustomSetting}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Add Setting
              </button>
              <button
                onClick={updateSettings}
                disabled={saving}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="text-sm text-red-600">{error}</div>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="text-sm text-green-600">{success}</div>
            </div>
          )}

          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Configuration Settings</h3>
            </div>
            <div className="p-6 space-y-6">
              {settings.map((setting) => (
                <div key={setting.key} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-900 mb-1">
                        {setting.key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </label>
                      {setting.description && (
                        <p className="text-sm text-gray-500 mb-2">{setting.description}</p>
                      )}
                      {renderSettingInput(setting)}
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <select
                        value={setting.type}
                        onChange={(e) => {
                          const newType = e.target.value
                          setSettings(prev => prev.map(s => 
                            s.key === setting.key ? { ...s, type: newType } : s
                          ))
                        }}
                        className="text-xs border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      >
                        {SETTING_TYPES.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      {!DEFAULT_SETTINGS.find(d => d.key === setting.key) && (
                        <button
                          onClick={() => deleteSetting(setting.key)}
                          className="text-red-600 hover:text-red-800 text-sm"
                          title="Delete setting"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AdminLayout>
    </AdminAuth>
  )
}