"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/AdminLayout"
import AdminAuth from "@/components/AdminAuth"
import FileUpload from "@/components/FileUpload"

export const dynamic = 'force-dynamic'

interface Facility {
  id: number
  name: string
  subtitle: string | null
  description: string | null
  capacity: number | null
  dimensions: string | null
  hourlyRate: number | null
  features: string[] | null
  imageUrl: string | null
  active: boolean
  createdAt: string
  updatedAt: string
}

// No facilities page settings needed - main hall capacity comes from facility records

export default function FacilitiesManagement() {
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [editingFacility, setEditingFacility] = useState<Facility | null>(null)
  
  useEffect(() => {
    fetchFacilities()
  }, [])

  const fetchFacilities = async () => {
    try {
      const response = await fetch('/api/facilities')
      if (!response.ok) throw new Error('Failed to fetch facilities')
      const data = await response.json()
      setFacilities(data)
    } catch (error) {
      setError('Failed to load facilities')
      console.error('Error fetching facilities:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateFacility = async (facility: Facility) => {
    try {
      const response = await fetch(`/api/facilities/${facility.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(facility)
      })
      
      if (!response.ok) throw new Error('Failed to update facility')
      
      fetchFacilities()
      setEditingFacility(null)
    } catch (error) {
      console.error('Error updating facility:', error)
      alert('Failed to update facility')
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
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Facilities Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your facility information, pricing, and features
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="text-sm text-red-600">{error}</div>
            </div>
          )}

          <div className="grid gap-6">
            {facilities.map((facility) => (
              <div key={facility.id} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      {facility.imageUrl && (
                        <div className="mb-4">
                          <img
                            src={facility.imageUrl}
                            alt={facility.name}
                            className="w-full h-48 object-cover rounded-lg"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                            }}
                          />
                        </div>
                      )}
                      <h3 className="text-lg font-medium text-gray-900">{facility.name}</h3>
                      {facility.subtitle && (
                        <p className="text-sm text-gray-500 mt-1">{facility.subtitle}</p>
                      )}
                      {facility.description && (
                        <p className="text-sm text-gray-700 mt-2">{facility.description}</p>
                      )}
                      
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        {facility.capacity && (
                          <div>
                            <span className="font-medium text-gray-600">Capacity:</span> {facility.capacity} people
                          </div>
                        )}
                        {facility.dimensions && (
                          <div>
                            <span className="font-medium text-gray-600">Dimensions:</span> {facility.dimensions}
                          </div>
                        )}
                        {facility.hourlyRate && (
                          <div>
                            <span className="font-medium text-gray-600">Rate:</span> £{facility.hourlyRate}/hour
                          </div>
                        )}
                      </div>

                      {facility.features && facility.features.length > 0 && (
                        <div className="mt-3">
                          <span className="text-sm font-medium text-gray-600">Features:</span>
                          <ul className="mt-1 text-sm text-gray-700">
                            {facility.features.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => setEditingFacility(facility)}
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded text-sm font-medium"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {facilities.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-4xl mb-4">🏢</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No facilities configured</h3>
              <p className="text-gray-500">Your facilities will appear here once they're added to the system.</p>
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {editingFacility && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
              <FacilityEditForm
                facility={editingFacility}
                onSave={updateFacility}
                onCancel={() => setEditingFacility(null)}
              />
            </div>
          </div>
        )}
      </AdminLayout>
    </AdminAuth>
  )
}

// Facility Edit Form Component
function FacilityEditForm({ 
  facility, 
  onSave, 
  onCancel 
}: { 
  facility: Facility
  onSave: (facility: Facility) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState(facility)
  const [featuresText, setFeaturesText] = useState(
    facility.features ? facility.features.join('\n') : ''
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'capacity' || name === 'hourlyRate' ? 
        (value === '' ? null : Number(value)) : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const features = featuresText.trim() === '' ? null : 
      featuresText.split('\n').map(f => f.trim()).filter(f => f !== '')
    
    onSave({
      ...formData,
      features
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Edit {facility.name}</h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Subtitle</label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            rows={3}
            value={formData.description || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Capacity</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Dimensions</label>
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Hourly Rate (£)</label>
            <input
              type="number"
              step="0.01"
              name="hourlyRate"
              value={formData.hourlyRate || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Features (one per line)</label>
          <textarea
            rows={6}
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="120 person capacity&#10;Outside paved area access&#10;Kitchen facilities included"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Image</label>
          {formData.imageUrl && (
            <div className="mb-4">
              <img
                src={formData.imageUrl}
                alt={formData.name}
                className="w-full max-w-sm h-32 object-cover rounded-lg border border-gray-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
            </div>
          )}
          <FileUpload
            onFileSelect={(mediaItem) => {
              if (mediaItem.filePath && mediaItem.filePath !== '') {
                setFormData(prev => ({ ...prev, imageUrl: mediaItem.filePath }))
              } else {
                setFormData(prev => ({ ...prev, imageUrl: null }))
              }
            }}
            currentImage={formData.imageUrl}
            label="Upload New Image"
            accept="image/*"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md text-sm font-medium"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}