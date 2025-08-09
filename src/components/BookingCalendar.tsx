"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Clock, User, Calendar, MapPin } from "lucide-react"

interface TimeSlot {
  startTime: string
  endTime: string
  startTimeDisplay: string
  endTimeDisplay: string
  available: boolean
  reason?: string | null
}

interface Facility {
  id: number
  name: string
  hourlyRate: number | null
}

interface AvailabilityData {
  facility: Facility
  date: string
  dayOfWeek: number
  available: boolean
  operatingHours: {
    start: string
    end: string
  }
  timeSlots: TimeSlot[]
  existingBookings: number
  message?: string
}

interface BookingCalendarProps {
  facility: Facility
  onBookingSelect: (bookingData: any) => void
}

export default function BookingCalendar({ facility, onBookingSelect }: BookingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([])
  const [availability, setAvailability] = useState<AvailabilityData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay()) // Start from Sunday

    const days = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let i = 0; i < 42; i++) { // 6 weeks × 7 days
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      
      const isCurrentMonth = date.getMonth() === currentDate.getMonth()
      const isPast = date < today
      const isToday = date.getTime() === today.getTime()
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()

      days.push({
        date,
        day: date.getDate(),
        isCurrentMonth,
        isPast,
        isToday,
        isSelected,
        isSelectable: isCurrentMonth && !isPast
      })
    }

    return days
  }

  // Fetch availability for selected date
  const fetchAvailability = async (date: Date) => {
    setLoading(true)
    setError("")
    
    try {
      const dateStr = date.toISOString().split('T')[0]
      const response = await fetch(`/api/bookings/availability?facilityId=${facility.id}&date=${dateStr}`)
      
      if (!response.ok) throw new Error('Failed to fetch availability')
      
      const data = await response.json()
      setAvailability(data)
    } catch (error) {
      console.error('Error fetching availability:', error)
      setError('Failed to load availability')
    } finally {
      setLoading(false)
    }
  }

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    if (date < new Date()) return
    
    setSelectedDate(date)
    setSelectedTimeSlots([])
    fetchAvailability(date)
  }

  // Handle time slot selection
  const handleTimeSlotToggle = (slot: TimeSlot) => {
    if (!slot.available) return

    setSelectedTimeSlots(prev => {
      const isSelected = prev.some(s => s.startTime === slot.startTime)
      
      if (isSelected) {
        return prev.filter(s => s.startTime !== slot.startTime)
      } else {
        // Add slot and sort by start time
        return [...prev, slot].sort((a, b) => 
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        )
      }
    })
  }

  // Calculate booking details
  const getBookingDetails = () => {
    if (selectedTimeSlots.length === 0) return null

    const sortedSlots = [...selectedTimeSlots].sort((a, b) => 
      new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    )

    const startTime = sortedSlots[0]?.startTime
    const endTime = sortedSlots[sortedSlots.length - 1]?.endTime
    
    if (!startTime || !endTime) {
      return
    }
    
    const start = new Date(startTime)
    const end = new Date(endTime)
    const totalHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
    
    const hourlyRate = facility.hourlyRate ? parseFloat(facility.hourlyRate.toString()) : 0
    const totalCost = hourlyRate > 0 ? totalHours * hourlyRate : null

    return {
      startDateTime: startTime,
      endDateTime: endTime,
      totalHours,
      totalCost,
      facilityId: facility.id
    }
  }

  // Handle proceed to booking
  const handleProceedToBooking = () => {
    const bookingDetails = getBookingDetails()
    if (bookingDetails) {
      onBookingSelect(bookingDetails)
    }
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-primary-600 text-white p-6">
        <div className="flex items-center space-x-3 mb-2">
          <MapPin className="w-5 h-5" />
          <h2 className="text-xl font-bold">{facility.name}</h2>
        </div>
        {facility.hourlyRate && (
          <p className="text-primary-100">
            £{facility.hourlyRate}/hour
          </p>
        )}
      </div>

      <div className="p-6">
        {/* Calendar Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <h3 className="text-lg font-semibold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-6">
          {dayNames.map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
          
          {generateCalendarDays().map((day, index) => (
            <button
              key={index}
              onClick={() => day.isSelectable && handleDateSelect(day.date)}
              disabled={!day.isSelectable}
              className={`
                p-2 text-sm rounded transition-colors
                ${day.isCurrentMonth ? 'text-gray-900' : 'text-gray-300'}
                ${day.isPast ? 'cursor-not-allowed opacity-50' : ''}
                ${day.isToday ? 'bg-primary-100 text-primary-800 font-bold' : ''}
                ${day.isSelected ? 'bg-primary-600 text-white' : ''}
                ${day.isSelectable && !day.isSelected ? 'hover:bg-gray-100' : ''}
              `}
            >
              {day.day}
            </button>
          ))}
        </div>

        {/* Time Slots */}
        {selectedDate && (
          <div className="border-t pt-6">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-5 h-5 text-primary-600" />
              <h4 className="text-lg font-semibold">
                {selectedDate.toLocaleDateString('en-GB', { 
                  weekday: 'long',
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h4>
            </div>

            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {availability && !loading && (
              <>
                {!availability.available ? (
                  <div className="bg-gray-50 rounded-md p-4 text-center">
                    <p className="text-gray-600">{availability.message}</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-6">
                      {availability.timeSlots.map((slot, index) => (
                        <button
                          key={index}
                          onClick={() => handleTimeSlotToggle(slot)}
                          disabled={!slot.available}
                          className={`
                            p-3 text-sm rounded-md border transition-colors
                            ${slot.available 
                              ? selectedTimeSlots.some(s => s.startTime === slot.startTime)
                                ? 'bg-primary-600 text-white border-primary-600'
                                : 'bg-white border-gray-300 hover:border-primary-300 hover:bg-primary-50'
                              : 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                            }
                          `}
                        >
                          <div className="flex items-center justify-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{slot.startTimeDisplay}</span>
                          </div>
                          {!slot.available && slot.reason === 'booked' && (
                            <div className="text-xs mt-1">Booked</div>
                          )}
                          {!slot.available && slot.reason === 'too_soon' && (
                            <div className="text-xs mt-1">Too soon</div>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Booking Summary */}
                    {selectedTimeSlots.length > 0 && (
                      <div className="bg-primary-50 rounded-lg p-4">
                        <h5 className="font-semibold text-primary-800 mb-3">Booking Summary</h5>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Date:</span>
                            <span className="font-medium">
                              {selectedDate.toLocaleDateString('en-GB')}
                            </span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span>Time:</span>
                            <span className="font-medium">
                              {selectedTimeSlots[0]?.startTimeDisplay} - {selectedTimeSlots[selectedTimeSlots.length - 1]?.endTimeDisplay}
                            </span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span>Duration:</span>
                            <span className="font-medium">
                              {getBookingDetails()?.totalHours} hours
                            </span>
                          </div>
                          
                          {getBookingDetails()?.totalCost && (
                            <div className="flex justify-between border-t pt-2">
                              <span className="font-semibold">Total Cost:</span>
                              <span className="font-bold text-primary-600">
                                £{getBookingDetails()?.totalCost?.toFixed(2)}
                              </span>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={handleProceedToBooking}
                          className="w-full mt-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-md transition-colors uppercase"
                        >
                          Proceed to Booking
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}