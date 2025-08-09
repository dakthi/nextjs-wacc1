"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/AdminLayout"
import AdminAuth from "@/components/AdminAuth"
import FileUpload from "@/components/FileUpload"

export const dynamic = 'force-dynamic'

interface FaqItem {
  id: number
  question: string
  answer: string
  category: string | null
  imageUrl: string | null
  displayOrder: number
  active: boolean
  createdAt: string
}

export default function FaqManagement() {
  const [faqItems, setFaqItems] = useState<FaqItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [editingItem, setEditingItem] = useState<FaqItem | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    fetchFaqItems()
  }, [])

  const fetchFaqItems = async () => {
    try {
      const response = await fetch('/api/faq')
      if (!response.ok) throw new Error('Failed to fetch FAQ items')
      const data = await response.json()
      setFaqItems(data)
    } catch (error) {
      setError('Failed to load FAQ items')
      console.error('Error fetching FAQ items:', error)
    } finally {
      setLoading(false)
    }
  }

  const createFaqItem = async (item: Omit<FaqItem, 'id' | 'createdAt'>) => {
    try {
      const response = await fetch('/api/faq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
      
      if (!response.ok) throw new Error('Failed to create FAQ item')
      
      fetchFaqItems()
      setIsCreating(false)
    } catch (error) {
      console.error('Error creating FAQ item:', error)
      alert('Failed to create FAQ item')
    }
  }

  const updateFaqItem = async (item: FaqItem) => {
    try {
      const response = await fetch(`/api/faq/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
      
      if (!response.ok) throw new Error('Failed to update FAQ item')
      
      fetchFaqItems()
      setEditingItem(null)
    } catch (error) {
      console.error('Error updating FAQ item:', error)
      alert('Failed to update FAQ item')
    }
  }

  const deleteFaqItem = async (id: number) => {
    if (!confirm('Are you sure you want to delete this FAQ item?')) return

    try {
      const response = await fetch(`/api/faq/${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) throw new Error('Failed to delete FAQ item')
      
      fetchFaqItems()
    } catch (error) {
      console.error('Error deleting FAQ item:', error)
      alert('Failed to delete FAQ item')
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
              <h1 className="text-2xl font-bold text-gray-900">FAQ Management</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage frequently asked questions
              </p>
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium uppercase"
            >
              Add New FAQ
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="text-sm text-red-600">{error}</div>
            </div>
          )}

          <div className="space-y-4">
            {faqItems.map((item) => (
              <div key={item.id} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {item.question}
                      </h3>
                      <div className="text-gray-700 mb-3 prose prose-sm max-w-none">
                        {item.answer}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        {item.category && (
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                            {item.category}
                          </span>
                        )}
                        <span>Order: {item.displayOrder}</span>
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
                        onClick={() => deleteFaqItem(item.id)}
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

          {faqItems.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-4xl mb-4">❓</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQ items yet</h3>
              <p className="text-gray-500 mb-4">Get started by adding your first FAQ item.</p>
              <button
                onClick={() => setIsCreating(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium uppercase"
              >
                Add New FAQ
              </button>
            </div>
          )}
        </div>

        {/* Create/Edit Modal */}
        {(isCreating || editingItem) && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-3xl shadow-lg rounded-md bg-white">
              <FaqItemForm
                item={editingItem}
                onSave={editingItem ? updateFaqItem : createFaqItem}
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

// FAQ Item Form Component
function FaqItemForm({ 
  item, 
  onSave, 
  onCancel 
}: { 
  item: FaqItem | null
  onSave: (item: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    question: item?.question || '',
    answer: item?.answer || '',
    category: item?.category || '',
    imageUrl: item?.imageUrl || '',
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
          {item ? 'Edit FAQ Item' : 'Add New FAQ Item'}
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
          <label className="block text-sm font-medium text-gray-700">Question *</label>
          <input
            type="text"
            name="question"
            required
            value={formData.question}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="What are your opening hours?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Answer *</label>
          <textarea
            name="answer"
            required
            rows={6}
            value={formData.answer}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Enter the detailed answer..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="e.g., General, Booking, Facilities"
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
          </div>
        </div>

        <div>
          <FileUpload
            onFileSelect={(mediaItem) => {
              if (mediaItem.filePath) {
                setFormData(prev => ({ ...prev, imageUrl: mediaItem.filePath }))
              } else {
                setFormData(prev => ({ ...prev, imageUrl: '' }))
              }
            }}
            currentImage={formData.imageUrl}
            label="FAQ Image"
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
            {item ? 'Update' : 'Create'} FAQ Item
          </button>
        </div>
      </form>
    </div>
  )
}