"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/AdminLayout"
import AdminAuth from "@/components/AdminAuth"
import FileUpload from "@/components/FileUpload"
import Link from "next/link"

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

interface GalleryImage {
  id: number
  title: string
  description: string | null
  imageUrl: string
  category: string
  altText: string | null
  displayOrder: number
  active: boolean
  featured: boolean
  createdAt: string
  updatedAt: string
}

export default function FacilitiesManagement() {
  const [activeTab, setActiveTab] = useState<'facilities' | 'gallery'>('facilities')
  
  // Facilities state
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [facilitiesLoading, setFacilitiesLoading] = useState(true)
  const [facilitiesError, setFacilitiesError] = useState("")
  const [editingFacility, setEditingFacility] = useState<Facility | null>(null)
  
  // Gallery state
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [galleryLoading, setGalleryLoading] = useState(true)
  const [galleryError, setGalleryError] = useState("")
  const [galleryMessage, setGalleryMessage] = useState("")
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [filterCategory, setFilterCategory] = useState("")
  
  useEffect(() => {
    fetchFacilities()
    fetchGalleryImages()
  }, [])

  const fetchFacilities = async () => {
    try {
      const response = await fetch('/api/facilities')
      if (!response.ok) throw new Error('Failed to fetch facilities')
      const data = await response.json()
      setFacilities(data)
    } catch (error) {
      setFacilitiesError('Failed to load facilities')
      console.error('Error fetching facilities:', error)
    } finally {
      setFacilitiesLoading(false)
    }
  }

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch('/api/facility-gallery')
      if (!response.ok) throw new Error('Failed to fetch gallery images')
      const data = await response.json()
      setGalleryImages(data)
    } catch (error) {
      setGalleryError('Failed to load gallery images')
      console.error('Error fetching gallery images:', error)
    } finally {
      setGalleryLoading(false)
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

  // Gallery management functions
  const addGalleryImage = async (imageData: {
    title: string
    description?: string
    imageUrl: string
    category: string
    altText?: string
  }) => {
    try {
      const response = await fetch('/api/facility-gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...imageData,
          displayOrder: galleryImages.length
        })
      })
      
      if (!response.ok) throw new Error('Failed to add gallery image')
      
      fetchGalleryImages()
      setGalleryMessage('Gallery image added successfully!')
      setTimeout(() => setGalleryMessage(''), 3000)
    } catch (error) {
      console.error('Error adding gallery image:', error)
      setGalleryMessage('Error adding gallery image. Please try again.')
    }
  }

  const updateGalleryImage = async (image: GalleryImage) => {
    try {
      const response = await fetch(`/api/facility-gallery/${image.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(image)
      })
      
      if (!response.ok) throw new Error('Failed to update gallery image')
      
      fetchGalleryImages()
      setEditingImage(null)
      setGalleryMessage('Gallery image updated successfully!')
      setTimeout(() => setGalleryMessage(''), 3000)
    } catch (error) {
      console.error('Error updating gallery image:', error)
      setGalleryMessage('Error updating gallery image. Please try again.')
    }
  }

  const deleteGalleryImage = async (id: number) => {
    if (!confirm('Are you sure you want to delete this gallery image?')) return

    try {
      const response = await fetch(`/api/facility-gallery/${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) throw new Error('Failed to delete gallery image')
      
      fetchGalleryImages()
      setGalleryMessage('Gallery image deleted successfully!')
      setTimeout(() => setGalleryMessage(''), 3000)
    } catch (error) {
      console.error('Error deleting gallery image:', error)
      setGalleryMessage('Error deleting gallery image. Please try again.')
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'interior': 'bg-blue-100 text-blue-800',
      'exterior': 'bg-green-100 text-green-800',
      'facilities': 'bg-purple-100 text-purple-800',
      'events': 'bg-orange-100 text-orange-800',
      'general': 'bg-gray-100 text-gray-800'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  // Filter gallery images
  const filteredGalleryImages = galleryImages.filter(image => {
    const matchesCategory = filterCategory === '' || image.category === filterCategory
    return matchesCategory
  })


  if (facilitiesLoading || galleryLoading) {
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
              <h1 className="text-2xl font-bold text-gray-900">Facilities Management</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your facility information and photo gallery
              </p>
            </div>
          </div>

          {(facilitiesError || galleryError) && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="text-sm text-red-600">{facilitiesError || galleryError}</div>
            </div>
          )}

          {galleryMessage && (
            <div className={`p-4 rounded-md text-sm ${
              galleryMessage.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
            }`}>
              {galleryMessage}
            </div>
          )}

          {/* Tabs */}
          <div className="bg-white shadow rounded-lg">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex">
                <button
                  onClick={() => setActiveTab('facilities')}
                  className={`py-2 px-4 text-sm font-medium border-b-2 ${
                    activeTab === 'facilities'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Facilities ({facilities.length})
                </button>
                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`py-2 px-4 text-sm font-medium border-b-2 ${
                    activeTab === 'gallery'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Photo Gallery ({galleryImages.length})
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'facilities' && (
                <FacilitiesTab 
                  facilities={facilities}
                  editingFacility={editingFacility}
                  setEditingFacility={setEditingFacility}
                  updateFacility={updateFacility}
                />
              )}

              {activeTab === 'gallery' && (
                <GalleryTab 
                  galleryImages={filteredGalleryImages}
                  filterCategory={filterCategory}
                  setFilterCategory={setFilterCategory}
                  editingImage={editingImage}
                  setEditingImage={setEditingImage}
                  addGalleryImage={addGalleryImage}
                  updateGalleryImage={updateGalleryImage}
                  deleteGalleryImage={deleteGalleryImage}
                  getCategoryColor={getCategoryColor}
                />
              )}
            </div>
          </div>
        </div>
      </AdminLayout>
    </AdminAuth>
  )
}

// Facilities Tab Component
function FacilitiesTab({ 
  facilities, 
  editingFacility, 
  setEditingFacility, 
  updateFacility 
}: {
  facilities: Facility[]
  editingFacility: Facility | null
  setEditingFacility: (facility: Facility | null) => void
  updateFacility: (facility: Facility) => void
}) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Facilities</h3>
      </div>

      <div className="grid gap-6">
        {facilities.map((facility) => (
          <div key={facility.id} className="bg-gray-50 shadow rounded-lg overflow-hidden">
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

      {facilities.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-4xl mb-4">🏢</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No facilities configured</h3>
          <p className="text-gray-500">Your facilities will appear here once they're added to the system.</p>
        </div>
      )}

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
    </div>
  )
}

// Gallery Tab Component
function GalleryTab({
  galleryImages,
  filterCategory,
  setFilterCategory,
  editingImage,
  setEditingImage,
  addGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  getCategoryColor
}: {
  galleryImages: GalleryImage[]
  filterCategory: string
  setFilterCategory: (category: string) => void
  editingImage: GalleryImage | null
  setEditingImage: (image: GalleryImage | null) => void
  addGalleryImage: (imageData: any) => void
  updateGalleryImage: (image: GalleryImage) => void
  deleteGalleryImage: (id: number) => void
  getCategoryColor: (category: string) => string
}) {
  const [showAddForm, setShowAddForm] = useState(false)
  
  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'interior', label: 'Interior' },
    { value: 'exterior', label: 'Exterior' },
    { value: 'facilities', label: 'Facilities' },
    { value: 'events', label: 'Events' },
    { value: 'general', label: 'General' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Photo Gallery</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium uppercase"
        >
          Add Photo
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Category
        </label>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="block w-48 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Gallery Grid */}
      <div className="grid gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {galleryImages.map((image) => (
          <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-100 relative">
              <img
                src={image.imageUrl}
                alt={image.altText || image.title}
                className="w-full h-full object-cover"
              />
              {image.featured && (
                <span className="absolute top-2 left-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                  Featured
                </span>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-sm font-semibold text-gray-900">{image.title}</h4>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(image.category)}`}>
                  {image.category}
                </span>
              </div>
              {image.description && (
                <p className="text-xs text-gray-600 mb-3">{image.description}</p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingImage(image)}
                  className="text-primary-600 hover:text-primary-900 text-xs font-medium uppercase"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteGalleryImage(image.id)}
                  className="text-red-600 hover:text-red-900 text-xs font-medium uppercase"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {galleryImages.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-4xl mb-4">📸</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No photos in gallery</h3>
          <p className="text-gray-500">Add photos to showcase your facilities.</p>
        </div>
      )}

      {/* Add Photo Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <GalleryImageForm
              onSave={(imageData) => {
                addGalleryImage(imageData)
                setShowAddForm(false)
              }}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        </div>
      )}

      {/* Edit Photo Modal */}
      {editingImage && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <GalleryImageForm
              image={editingImage}
              onSave={(imageData) => {
                updateGalleryImage({ ...editingImage, ...imageData })
                setEditingImage(null)
              }}
              onCancel={() => setEditingImage(null)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

// Gallery Image Form Component
function GalleryImageForm({
  image,
  onSave,
  onCancel
}: {
  image?: GalleryImage
  onSave: (imageData: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    title: image?.title || '',
    description: image?.description || '',
    imageUrl: image?.imageUrl || '',
    category: image?.category || 'general',
    altText: image?.altText || '',
    featured: image?.featured || false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.imageUrl) {
      alert('Title and image URL are required')
      return
    }
    onSave(formData)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">
          {image ? 'Edit Photo' : 'Add Photo'}
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          >
            <option value="general">General</option>
            <option value="interior">Interior</option>
            <option value="exterior">Exterior</option>
            <option value="facilities">Facilities</option>
            <option value="events">Events</option>
          </select>
        </div>

        <div>
          <FileUpload
            onFileSelect={(mediaItem) => {
              if (mediaItem.filePath) {
                setFormData(prev => ({ ...prev, imageUrl: mediaItem.filePath }))
              }
            }}
            currentImage={formData.imageUrl}
            label="Photo *"
            accept="image/*"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Alt Text</label>
          <input
            type="text"
            name="altText"
            value={formData.altText}
            onChange={handleInputChange}
            placeholder="Descriptive text for accessibility"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleInputChange}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Featured photo
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md"
          >
            {image ? 'Update Photo' : 'Add Photo'}
          </button>
        </div>
      </form>
    </div>
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
            rows={4}
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
            placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}
