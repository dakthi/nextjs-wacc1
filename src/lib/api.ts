// API functions for fetching data from the database

export interface Program {
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
  active: boolean
  createdAt: Date
  updatedAt: Date
  schedules: ProgramSchedule[]
}

export interface ProgramSchedule {
  id: number
  programId: number
  dayOfWeek: string | null
  startTime: string | null
  endTime: string | null
  description: string | null
  active: boolean
}

export interface Facility {
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
  createdAt: Date
  updatedAt: Date
}

export interface ContactInfo {
  id: number
  type: string
  label: string | null
  value: string
  description: string | null
  displayOrder: number
  active: boolean
}

export interface OpeningHours {
  id: number
  title: string
  schedule: string | string[]
  description: string | null
  type: string
  active: boolean
}

// Fetch programs from the database
export async function getPrograms(): Promise<Program[]> {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/programs`, {
      cache: 'no-store' // Always fetch fresh data
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch programs')
    }
    
    return response.json()
  } catch (error) {
    console.error('Error fetching programs:', error)
    return []
  }
}

// Fetch facilities from the database
export async function getFacilities(): Promise<Facility[]> {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/facilities`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch facilities')
    }
    
    return response.json()
  } catch (error) {
    console.error('Error fetching facilities:', error)
    return []
  }
}

// Fetch contact information from the database
export async function getContactInfo(): Promise<ContactInfo[]> {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/contact`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch contact info')
    }
    
    return response.json()
  } catch (error) {
    console.error('Error fetching contact info:', error)
    return []
  }
}

// Fetch opening hours from the database
export async function getOpeningHours(): Promise<OpeningHours[]> {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/opening-hours`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch opening hours')
    }
    
    return response.json()
  } catch (error) {
    console.error('Error fetching opening hours:', error)
    return []
  }
}