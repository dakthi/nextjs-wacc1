"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/AdminLayout"
import AdminAuth from "@/components/AdminAuth"

interface ContactInfo {
  id: number
  type: string
  label: string | null
  value: string
  description: string | null
  displayOrder: number
  active: boolean
}

const CONTACT_TYPES = [
  { value: 'phone', label: 'Phone', icon: '📞' },
  { value: 'email', label: 'Email', icon: '📧' },
  { value: 'address', label: 'Address', icon: '📍' },
  { value: 'website', label: 'Website', icon: '🌐' },
  { value: 'social', label: 'Social Media', icon: '📱' },
  { value: 'other', label: 'Other', icon: '📋' }
]

export default function ContactInfoManagement() {
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [editingItem, setEditingItem] = useState<ContactInfo | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    fetchContactInfo()
  }, [])

  const fetchContactInfo = async () => {
    try {
      const response = await fetch('/api/contact-info')
      if (!response.ok) throw new Error('Failed to fetch contact info')
      const data = await response.json()
      setContactInfo(data)
    } catch (error) {
      setError('Failed to load contact info')
      console.error('Error fetching contact info:', error)
    } finally {
      setLoading(false)
    }
  }

  const createContactInfo = async (item: Omit<ContactInfo, 'id'>) => {
    try {
      const response = await fetch('/api/contact-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
      
      if (!response.ok) throw new Error('Failed to create contact info')
      
      fetchContactInfo()
      setIsCreating(false)
    } catch (error) {
      console.error('Error creating contact info:', error)
      alert('Failed to create contact info')
    }
  }

  const updateContactInfo = async (item: ContactInfo) => {
    try {
      const response = await fetch(`/api/contact-info/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
      
      if (!response.ok) throw new Error('Failed to update contact info')
      
      fetchContactInfo()
      setEditingItem(null)
    } catch (error) {
      console.error('Error updating contact info:', error)
      alert('Failed to update contact info')
    }
  }

  const deleteContactInfo = async (id: number) => {
    if (!confirm('Are you sure you want to delete this contact info?')) return

    try {
      const response = await fetch(`/api/contact-info/${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) throw new Error('Failed to delete contact info')
      
      fetchContactInfo()
    } catch (error) {
      console.error('Error deleting contact info:', error)
      alert('Failed to delete contact info')
    }
  }

  const getTypeIcon = (type: string) => {
    const typeConfig = CONTACT_TYPES.find(t => t.value === type)
    return typeConfig?.icon || '📋'
  }

  const getTypeLabel = (type: string) => {
    const typeConfig = CONTACT_TYPES.find(t => t.value === type)
    return typeConfig?.label || type
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
              <h1 className="text-2xl font-bold text-gray-900">Contact Information</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage contact details displayed throughout the website
              </p>
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Add Contact Info
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="text-sm text-red-600">{error}</div>
            </div>
          )}

          <div className="grid gap-4">
            {contactInfo.map((item) => (
              <div key={item.id} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{getTypeIcon(item.type)}</span>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {item.label || getTypeLabel(item.type)}
                          </h3>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {getTypeLabel(item.type)}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 font-medium mb-2">{item.value}</p>
                      {item.description && (
                        <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                      )}
                      <div className="text-xs text-gray-400">
                        Display Order: {item.displayOrder}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteContactInfo(item.id)}
                        className="bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1 rounded text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {contactInfo.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-4xl mb-4">📞</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No contact information yet</h3>
              <p className="text-gray-500 mb-4">Add contact details to display throughout your website.</p>
              <button
                onClick={() => setIsCreating(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Add Contact Info
              </button>
            </div>
          )}
        </div>

        {/* Create/Edit Modal */}
        {(isCreating || editingItem) && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
              <ContactInfoForm
                item={editingItem}
                onSave={editingItem ? updateContactInfo : createContactInfo}
                onCancel={() => {
                  setEditingItem(null)
                  setIsCreating(false)
                }}
              />
            </div>
          </div>
        )}
      </AdminLayout>
    </AdminAuth>
  )
}

// Contact Info Form Component
function ContactInfoForm({ 
  item, 
  onSave, 
  onCancel 
}: { 
  item: ContactInfo | null
  onSave: (item: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    type: item?.type || 'phone',
    label: item?.label || '',
    value: item?.value || '',
    description: item?.description || '',
    displayOrder: item?.displayOrder || 0,
    active: item?.active ?? true
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (item) {
      onSave({
        ...item,
        ...formData
      })
    } else {
      onSave(formData)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">
          {item ? 'Edit Contact Information' : 'Add Contact Information'}
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
          <label className="block text-sm font-medium text-gray-700">Type *</label>
          <select
            name="type"
            required
            value={formData.type}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          >
            {CONTACT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.icon} {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Label</label>
          <input
            type="text"
            name="label"
            value={formData.label}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="e.g., Main Office, Reception"
          />
          <p className="mt-1 text-sm text-gray-500">Leave empty to use the type name</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Value *</label>
          <input
            type="text"
            name="value"
            required
            value={formData.value}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="e.g., 020 1234 5678, info@example.com"
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
            placeholder="Additional details about this contact method..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Display Order</label>
          <input
            type="number"
            name="displayOrder"
            value={formData.displayOrder}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="0"
          />
          <p className="mt-1 text-sm text-gray-500">Lower numbers appear first</p>
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
            {item ? 'Update' : 'Create'} Contact Info
          </button>
        </div>
      </form>
    </div>
  )
}