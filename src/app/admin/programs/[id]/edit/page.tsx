"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import AdminLayout from "@/components/AdminLayout"
import AdminAuth from "@/components/AdminAuth"
import Link from "next/link"

interface Schedule {
  id?: number
  description: string
  dayOfWeek: string
  startTime: string
  endTime: string
}

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
  schedules: Schedule[]
}

export default function EditProgram() {
  const router = useRouter()
  const params = useParams()
  const programId = params.id as string
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [program, setProgram] = useState<Program | null>(null)
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "early-years",
    ageGroup: "",
    price: "",
    bookingInfo: "",
    instructor: "",
    contactEmail: "",
    contactPhone: "",
    contactWebsite: "",
    imageUrl: ""
  })

  const [schedules, setSchedules] = useState<Schedule[]>([
    { description: "", dayOfWeek: "", startTime: "", endTime: "" }
  ])

  const fetchProgram = async () => {
    try {
      const response = await fetch(`/api/programs/${programId}`)
      if (!response.ok) throw new Error('Failed to fetch program')
      
      const data = await response.json()
      setProgram(data)
      
      // Populate form data
      setFormData({
        title: data.title || "",
        description: data.description || "",
        category: data.category || "early-years",
        ageGroup: data.ageGroup || "",
        price: data.price || "",
        bookingInfo: data.bookingInfo || "",
        instructor: data.instructor || "",
        contactEmail: data.contactEmail || "",
        contactPhone: data.contactPhone || "",
        contactWebsite: data.contactWebsite || "",
        imageUrl: data.imageUrl || ""
      })
      
      // Populate schedules
      if (data.schedules && data.schedules.length > 0) {
        setSchedules(data.schedules)
      } else {
        setSchedules([{ description: "", dayOfWeek: "", startTime: "", endTime: "" }])
      }
    } catch (err) {
      setError("Failed to fetch program details")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (programId) {
      fetchProgram()
    }
  }, [programId])


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleScheduleChange = (index: number, field: keyof Schedule, value: string) => {
    setSchedules(prev => prev.map((schedule, i) => 
      i === index ? { ...schedule, [field]: value } : schedule
    ))
  }

  const addSchedule = () => {
    setSchedules(prev => [...prev, { description: "", dayOfWeek: "", startTime: "", endTime: "" }])
  }

  const removeSchedule = (index: number) => {
    if (schedules.length > 1) {
      setSchedules(prev => prev.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")

    try {
      const response = await fetch(`/api/programs/${programId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          schedules: schedules.filter(s => s.description.trim() !== "")
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update program')
      }

      router.push('/admin/programs')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update program')
    } finally {
      setSaving(false)
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

  if (!program) {
    return (
      <AdminAuth>
        <AdminLayout>
          <div className="text-center py-12">
            <div className="text-gray-400 text-4xl mb-4">❌</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Program not found</h3>
            <p className="text-gray-500 mb-4">The program you're looking for doesn't exist.</p>
            <Link
              href="/admin/programs"
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Back to Programs
            </Link>
          </div>
        </AdminLayout>
      </AdminAuth>
    )
  }

  return (
    <AdminAuth>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Program</h1>
              <p className="mt-1 text-sm text-gray-500">
                Update the program details and schedule
              </p>
            </div>
            <Link
              href="/admin/programs"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              Back to Programs
            </Link>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="text-sm text-red-600">{error}</div>
            </div>
          )}

          <div className="bg-white shadow rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6 p-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Program Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="e.g., West Acton Stay & Play"
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Category *
                    </label>
                    <select
                      name="category"
                      id="category"
                      required
                      value={formData.category}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    >
                      <option value="early-years">Early Years</option>
                      <option value="martial-arts">Martial Arts</option>
                      <option value="education">Education</option>
                      <option value="fitness">Fitness</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="ageGroup" className="block text-sm font-medium text-gray-700">
                      Age Group
                    </label>
                    <input
                      type="text"
                      name="ageGroup"
                      id="ageGroup"
                      value={formData.ageGroup}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="e.g., Young children & parents"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="Describe the program and what participants can expect..."
                    />
                  </div>
                </div>
              </div>

              {/* Pricing & Booking */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Pricing & Booking</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="e.g., £4.00 per session"
                    />
                  </div>

                  <div>
                    <label htmlFor="bookingInfo" className="block text-sm font-medium text-gray-700">
                      Booking Information
                    </label>
                    <input
                      type="text"
                      name="bookingInfo"
                      id="bookingInfo"
                      value={formData.bookingInfo}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="e.g., No booking required - just come along!"
                    />
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule</h3>
                {schedules.map((schedule, index) => (
                  <div key={index} className="border border-gray-200 rounded-md p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-sm font-medium text-gray-700">Schedule {index + 1}</h4>
                      {schedules.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSchedule(index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-gray-600">
                          Description
                        </label>
                        <input
                          type="text"
                          value={schedule.description}
                          onChange={(e) => handleScheduleChange(index, 'description', e.target.value)}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 text-sm"
                          placeholder="e.g., Monday: 10:00 AM - 11:45 AM"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600">
                          Day of Week
                        </label>
                        <select
                          value={schedule.dayOfWeek}
                          onChange={(e) => handleScheduleChange(index, 'dayOfWeek', e.target.value)}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 text-sm"
                        >
                          <option value="">Select day</option>
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
                        <label className="block text-xs font-medium text-gray-600">
                          Start Time
                        </label>
                        <input
                          type="time"
                          value={schedule.startTime}
                          onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSchedule}
                  className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                >
                  + Add Another Schedule
                </button>
              </div>

              {/* Contact & Staff */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Contact & Staff</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="instructor" className="block text-sm font-medium text-gray-700">
                      Instructor/Leader
                    </label>
                    <input
                      type="text"
                      name="instructor"
                      id="instructor"
                      value={formData.instructor}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="e.g., Teruko Mori"
                    />
                  </div>

                  <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      id="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="program@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      name="contactPhone"
                      id="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="020 1234 5678"
                    />
                  </div>

                  <div>
                    <label htmlFor="contactWebsite" className="block text-sm font-medium text-gray-700">
                      Website
                    </label>
                    <input
                      type="url"
                      name="contactWebsite"
                      id="contactWebsite"
                      value={formData.contactWebsite}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                      Image URL
                    </label>
                    <input
                      type="url"
                      name="imageUrl"
                      id="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="/img/program-poster.jpg"
                    />
                  </div>
                </div>
              </div>

              {/* Submit buttons */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <Link
                  href="/admin/programs"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Updating...' : 'Update Program'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    </AdminAuth>
  )
}