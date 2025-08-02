"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/AdminLayout"
import AdminAuth from "@/components/AdminAuth"

interface DashboardStats {
  programs: number
  facilities: number
  communityGroups: number
  contactInfo: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    programs: 0,
    facilities: 0,
    communityGroups: 0,
    contactInfo: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch stats from various endpoints
        const [programsRes, facilitiesRes] = await Promise.all([
          fetch('/api/programs'),
          fetch('/api/facilities')
        ])

        const [programs, facilities] = await Promise.all([
          programsRes.json(),
          facilitiesRes.json()
        ])

        setStats({
          programs: programs.length || 0,
          facilities: facilities.length || 0,
          communityGroups: 2, // Placeholder
          contactInfo: 4 // Placeholder
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <AdminAuth>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Welcome to the WACC admin panel. Manage your content below.
            </p>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="text-2xl">📚</div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Active Programs
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {loading ? "..." : stats.programs}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="text-2xl">🏢</div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Facilities
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {loading ? "..." : stats.facilities}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="text-2xl">👥</div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Community Groups
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {loading ? "..." : stats.communityGroups}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="text-2xl">📞</div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Contact Methods
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {loading ? "..." : stats.contactInfo}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <a
                  href="/admin/programs"
                  className="relative block w-full p-4 border-2 border-gray-300 border-dashed rounded-lg text-center hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <div className="text-2xl mb-2">➕</div>
                  <span className="text-sm font-medium text-gray-900">
                    Add New Program
                  </span>
                </a>

                <a
                  href="/admin/facilities"
                  className="relative block w-full p-4 border-2 border-gray-300 border-dashed rounded-lg text-center hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <div className="text-2xl mb-2">🏗️</div>
                  <span className="text-sm font-medium text-gray-900">
                    Manage Facilities
                  </span>
                </a>

                <a
                  href="/admin/contact"
                  className="relative block w-full p-4 border-2 border-gray-300 border-dashed rounded-lg text-center hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <div className="text-2xl mb-2">✏️</div>
                  <span className="text-sm font-medium text-gray-900">
                    Update Contact Info
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-blue-900 mb-3">
              Getting Started
            </h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p>• Use the navigation menu to manage different types of content</p>
              <p>• All changes will be reflected immediately on the public website</p>
              <p>• You can add, edit, or remove programs, facilities, and contact information</p>
              <p>• Upload images for programs and facilities to make them more engaging</p>
            </div>
          </div>
        </div>
      </AdminLayout>
    </AdminAuth>
  )
}