"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/AdminLayout"
import AdminAuth from "@/components/AdminAuth"
import Link from "next/link"

interface Testimonial {
  id: number
  quote: string
  authorName: string
  authorTitle: string | null
  avatarUrl: string | null
  active: boolean
  displayOrder: number
  createdAt: string
}

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials')
      if (!response.ok) throw new Error('Failed to fetch testimonials')
      const data = await response.json()
      setTestimonials(data)
    } catch (error) {
      setError('Failed to load testimonials')
      console.error('Error fetching testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const createTestimonial = async (testimonial: Omit<Testimonial, 'id' | 'createdAt'>) => {
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testimonial)
      })
      
      if (!response.ok) throw new Error('Failed to create testimonial')
      
      fetchTestimonials()
      setIsCreating(false)
    } catch (error) {
      console.error('Error creating testimonial:', error)
      alert('Failed to create testimonial')
    }
  }

  const updateTestimonial = async (testimonial: Testimonial) => {
    try {
      const response = await fetch(`/api/testimonials/${testimonial.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testimonial)
      })
      
      if (!response.ok) throw new Error('Failed to update testimonial')
      
      fetchTestimonials()
      setEditingTestimonial(null)
    } catch (error) {
      console.error('Error updating testimonial:', error)
      alert('Failed to update testimonial')
    }
  }

  const deleteTestimonial = async (id: number) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) throw new Error('Failed to delete testimonial')
      
      fetchTestimonials()
    } catch (error) {
      console.error('Error deleting testimonial:', error)
      alert('Failed to delete testimonial')
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
              <h1 className="text-2xl font-bold text-gray-900">Testimonials Management</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage customer testimonials and reviews
              </p>
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Add New Testimonial
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="text-sm text-red-600">{error}</div>
            </div>
          )}

          <div className="grid gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <blockquote className="text-gray-700 italic mb-3 text-lg">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="flex items-center space-x-3">
                        {testimonial.avatarUrl && (
                          <img
                            src={testimonial.avatarUrl}
                            alt={testimonial.authorName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{testimonial.authorName}</p>
                          {testimonial.authorTitle && (
                            <p className="text-sm text-gray-500">{testimonial.authorTitle}</p>
                          )}
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-gray-500">
                        Display Order: {testimonial.displayOrder}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingTestimonial(testimonial)}
                        className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTestimonial(testimonial.id)}
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

          {testimonials.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-4xl mb-4">💬</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No testimonials yet</h3>
              <p className="text-gray-500 mb-4">Get started by adding your first testimonial.</p>
              <button
                onClick={() => setIsCreating(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Add New Testimonial
              </button>
            </div>
          )}
        </div>

        {/* Create/Edit Modal */}
        {(isCreating || editingTestimonial) && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
              <TestimonialForm
                testimonial={editingTestimonial}
                onSave={editingTestimonial ? updateTestimonial : createTestimonial}
                onCancel={() => {
                  setEditingTestimonial(null)
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

// Testimonial Form Component
function TestimonialForm({ 
  testimonial, 
  onSave, 
  onCancel 
}: { 
  testimonial: Testimonial | null
  onSave: (testimonial: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    quote: testimonial?.quote || '',
    authorName: testimonial?.authorName || '',
    authorTitle: testimonial?.authorTitle || '',
    avatarUrl: testimonial?.avatarUrl || '',
    displayOrder: testimonial?.displayOrder || 0,
    active: testimonial?.active ?? true
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (testimonial) {
      onSave({
        ...testimonial,
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
          {testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
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
          <label className="block text-sm font-medium text-gray-700">Quote *</label>
          <textarea
            name="quote"
            required
            rows={4}
            value={formData.quote}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Enter the testimonial quote..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Author Name *</label>
            <input
              type="text"
              name="authorName"
              required
              value={formData.authorName}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="e.g., John Smith"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Author Title</label>
            <input
              type="text"
              name="authorTitle"
              value={formData.authorTitle}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="e.g., Parent, Community Member"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Avatar URL</label>
          <input
            type="url"
            name="avatarUrl"
            value={formData.avatarUrl}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="/img/testimonial-avatar.jpg"
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
            {testimonial ? 'Update' : 'Create'} Testimonial
          </button>
        </div>
      </form>
    </div>
  )
}