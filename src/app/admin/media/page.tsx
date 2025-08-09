"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/AdminLayout"
import AdminAuth from "@/components/AdminAuth"
import FileUpload from "@/components/FileUpload"
import { formatFileSize } from "@/lib/image-utils"

interface MediaItem {
  id: number
  filename: string
  originalName: string
  filePath: string
  fileType: string
  fileSize: number | null
  altText: string | null
  caption: string | null
  uploadedAt: string
}

export default function MediaLibrary() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [editingMetadata, setEditingMetadata] = useState(false)
  const [formData, setFormData] = useState({ altText: '', caption: '' })

  useEffect(() => {
    loadMediaItems()
  }, [])

  const loadMediaItems = async () => {
    try {
      const response = await fetch('/api/media')
      if (response.ok) {
        const items = await response.json()
        setMediaItems(items)
      }
    } catch (error) {
      console.error('Error loading media items:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleNewUpload = (newItem: MediaItem) => {
    setMediaItems(prev => [newItem, ...prev])
  }

  const selectItem = (item: MediaItem) => {
    setSelectedItem(item)
    setFormData({
      altText: item.altText || '',
      caption: item.caption || ''
    })
    setEditingMetadata(false)
  }

  const updateMetadata = async () => {
    if (!selectedItem) return

    try {
      const response = await fetch(`/api/media/${selectedItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const updated = await response.json()
        setSelectedItem(updated)
        setMediaItems(prev => prev.map(item => 
          item.id === updated.id ? updated : item
        ))
        setEditingMetadata(false)
      }
    } catch (error) {
      console.error('Error updating metadata:', error)
    }
  }

  const deleteItem = async (item: MediaItem) => {
    if (!confirm(`Are you sure you want to delete "${item.originalName}"?`)) return

    try {
      const response = await fetch(`/api/media/${item.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setMediaItems(prev => prev.filter(i => i.id !== item.id))
        if (selectedItem?.id === item.id) {
          setSelectedItem(null)
        }
      }
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }


  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
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
            <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
            <p className="mt-1 text-sm text-gray-500">
              Upload and manage your images and media files
            </p>
          </div>

          {/* Upload Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Upload New Media</h2>
            <FileUpload 
              onFileSelect={handleNewUpload}
              label="Drop files here or click to browse"
              showMediaLibrary={false}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Media Grid */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    All Media ({mediaItems.length})
                  </h3>
                </div>
                <div className="p-6">
                  {mediaItems.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                      {mediaItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => selectItem(item)}
                          className={`relative cursor-pointer group border-2 rounded-lg overflow-hidden transition-colors ${
                            selectedItem?.id === item.id 
                              ? 'border-primary-500 ring-2 ring-primary-200' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="aspect-square">
                            <img
                              src={item.filePath}
                              alt={item.altText || item.originalName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteItem(item)
                              }}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                            >
                              ✕
                            </button>
                          </div>
                          <div className="p-2">
                            <p className="text-xs text-gray-600 truncate">{item.originalName}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="mt-2">No media files uploaded yet.</p>
                      <p className="text-sm">Upload your first image to get started.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Details Panel */}
            <div className="lg:col-span-1">
              {selectedItem ? (
                <div className="bg-white shadow rounded-lg">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Media Details</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="aspect-square">
                      <img
                        src={selectedItem.filePath}
                        alt={selectedItem.altText || selectedItem.originalName}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">File Path</label>
                        <div className="flex mt-1">
                          <input
                            type="text"
                            value={selectedItem.filePath}
                            readOnly
                            className="flex-1 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-l-md px-3 py-2"
                          />
                          <button
                            onClick={() => copyToClipboard(selectedItem.filePath)}
                            className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-200 rounded-r-md hover:bg-gray-200 text-sm"
                          >
                            Copy
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Original Name</label>
                        <p className="mt-1 text-sm text-gray-600">{selectedItem.originalName}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">File Type</label>
                        <p className="mt-1 text-sm text-gray-600">{selectedItem.fileType}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">File Size</label>
                        <p className="mt-1 text-sm text-gray-600">{formatFileSize(selectedItem.fileSize)}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Uploaded</label>
                        <p className="mt-1 text-sm text-gray-600">
                          {new Date(selectedItem.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Metadata Editing */}
                      <div className="border-t pt-4 space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Alt Text</label>
                          {editingMetadata ? (
                            <input
                              type="text"
                              value={formData.altText}
                              onChange={(e) => setFormData(prev => ({ ...prev, altText: e.target.value }))}
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                              placeholder="Describe the image for accessibility"
                            />
                          ) : (
                            <p className="mt-1 text-sm text-gray-600">
                              {selectedItem.altText || 'No alt text'}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Caption</label>
                          {editingMetadata ? (
                            <textarea
                              value={formData.caption}
                              onChange={(e) => setFormData(prev => ({ ...prev, caption: e.target.value }))}
                              rows={3}
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                              placeholder="Optional caption"
                            />
                          ) : (
                            <p className="mt-1 text-sm text-gray-600">
                              {selectedItem.caption || 'No caption'}
                            </p>
                          )}
                        </div>

                        <div className="flex space-x-2">
                          {editingMetadata ? (
                            <>
                              <button
                                onClick={updateMetadata}
                                className="px-3 py-1 bg-primary-600 text-white text-sm rounded hover:bg-primary-700"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingMetadata(false)}
                                className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => setEditingMetadata(true)}
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200"
                            >
                              Edit Metadata
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Delete Button */}
                      <div className="border-t pt-4">
                        <button
                          onClick={() => deleteItem(selectedItem)}
                          className="w-full px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                        >
                          Delete File
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white shadow rounded-lg">
                  <div className="p-6 text-center text-gray-500">
                    Select a media item to view details
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