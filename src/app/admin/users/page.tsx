"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import AdminLayout from "@/components/AdminLayout"
import AdminAuth from "@/components/AdminAuth"

interface User {
  id: string
  name: string | null
  email: string
  role: string
  active: boolean
  createdAt: string
  updatedAt: string
}

const USER_ROLES = [
  { value: 'admin', label: 'Administrator', description: 'Full access to all features' },
  { value: 'editor', label: 'Editor', description: 'Can edit content but not user management' },
  { value: 'viewer', label: 'Viewer', description: 'Read-only access to admin panel' }
]

export default function UsersManagement() {
  const { data: session } = useSession()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("")

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      if (!response.ok) throw new Error('Failed to fetch users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      setError('Failed to load users')
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateUserRole = async (userId: string, role: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role })
      })
      
      if (!response.ok) throw new Error('Failed to update user role')
      
      fetchUsers()
    } catch (error) {
      console.error('Error updating user role:', error)
      alert('Failed to update user role')
    }
  }

  const toggleUserStatus = async (userId: string, active: boolean) => {
    // Prevent disabling current user
    if (userId === session?.user?.id && !active) {
      alert('You cannot disable your own account')
      return
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ active })
      })
      
      if (!response.ok) throw new Error('Failed to update user status')
      
      fetchUsers()
    } catch (error) {
      console.error('Error updating user status:', error)
      alert('Failed to update user status')
    }
  }

  const getRoleColor = (role: string) => {
    const colors = {
      'admin': 'bg-red-100 text-red-800',
      'editor': 'bg-blue-100 text-blue-800',
      'viewer': 'bg-gray-100 text-gray-800'
    }
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getRoleDescription = (role: string) => {
    const roleConfig = USER_ROLES.find(r => r.value === role)
    return roleConfig?.description || ''
  }

  // Filter users based on search term and role filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRole = filterRole === '' || user.role === filterRole
    
    return matchesSearch && matchesRole
  })

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
              <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage user accounts, roles, and permissions
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="text-sm text-red-600">{error}</div>
            </div>
          )}

          {/* Search and Filter */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Users
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or email..."
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Role
                </label>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option value="">All Roles</option>
                  {USER_ROLES.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Users List */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <li key={user.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                              <span className="text-primary-600 font-medium text-sm">
                                {(user.name || user.email).charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-900">
                              {user.name || 'No name'}
                              {user.id === session?.user?.id && (
                                <span className="ml-2 text-sm text-blue-600">(You)</span>
                              )}
                            </h3>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center space-x-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                            {USER_ROLES.find(r => r.value === user.role)?.label || user.role}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.active 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.active ? 'Active' : 'Inactive'}
                          </span>
                          <span className="text-xs text-gray-400">
                            Joined {new Date(user.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          {getRoleDescription(user.role)}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {/* Role Selector */}
                        <select
                          value={user.role}
                          onChange={(e) => updateUserRole(user.id, e.target.value)}
                          disabled={user.id === session?.user?.id} // Prevent changing own role
                          className="text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100"
                        >
                          {USER_ROLES.map((role) => (
                            <option key={role.value} value={role.value}>
                              {role.label}
                            </option>
                          ))}
                        </select>
                        
                        {/* Status Toggle */}
                        <button
                          onClick={() => toggleUserStatus(user.id, !user.active)}
                          disabled={user.id === session?.user?.id} // Prevent disabling own account
                          className={`px-3 py-1 rounded text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                            user.active
                              ? 'bg-red-50 text-red-700 hover:bg-red-100'
                              : 'bg-green-50 text-green-700 hover:bg-green-100'
                          }`}
                        >
                          {user.active ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* No Users Found */}
          {filteredUsers.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-4xl mb-4">👥</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || filterRole ? 'No users found' : 'No users yet'}
              </h3>
              <p className="text-gray-500">
                {searchTerm || filterRole 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Users will appear here once they create accounts.'
                }
              </p>
            </div>
          )}

          {/* User Statistics */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">User Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{users.length}</div>
                <div className="text-sm text-gray-500">Total Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {users.filter(u => u.active).length}
                </div>
                <div className="text-sm text-gray-500">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {users.filter(u => u.role === 'admin').length}
                </div>
                <div className="text-sm text-gray-500">Administrators</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {users.filter(u => u.role === 'editor').length}
                </div>
                <div className="text-sm text-gray-500">Editors</div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </AdminAuth>
  )
}