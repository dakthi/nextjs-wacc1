"use client"

import { useState, useEffect } from "react"
import { Calendar, Mail, CheckCircle, ArrowLeft } from "lucide-react"
import BookingCalendar from "./BookingCalendar"
import BookingForm from "./BookingForm"

interface Facility {
  id: number
  name: string
  subtitle?: string | null
  description?: string | null
  capacity?: number | null
  hourlyRate: number | null
  features?: string[] | null
}

interface BookingData {
  startDateTime: string
  endDateTime: string
  totalHours: number
  totalCost: number | null
  facilityId: number
}

export function BookingSystemWrapper() {
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null)
  const [bookingMethod, setBookingMethod] = useState<'calendar' | 'form' | null>(null)
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const [step, setStep] = useState<'select' | 'booking' | 'form' | 'success'>('select')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchFacilities()
  }, [])

  const fetchFacilities = async () => {
    try {
      const response = await fetch('/api/facilities')
      if (!response.ok) throw new Error('Failed to fetch facilities')
      const data = await response.json()
      setFacilities(data)
    } catch (error) {
      console.error('Error fetching facilities:', error)
      setError('Failed to load facilities')
    } finally {
      setLoading(false)
    }
  }

  const handleFacilitySelect = (facility: Facility, method: 'calendar' | 'form') => {
    setSelectedFacility(facility)
    setBookingMethod(method)
    setStep(method === 'calendar' ? 'booking' : 'form')
  }

  const handleBookingSelect = (data: BookingData) => {
    setBookingData(data)
    setStep('form')
  }

  const handleBookingSuccess = () => {
    setStep('success')
  }

  const handleReset = () => {
    setSelectedFacility(null)
    setBookingMethod(null)
    setBookingData(null)
    setStep('select')
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-3">Loading facilities...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  // Success Step
  if (step === 'success') {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-600 text-white p-6 text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Booking Request Submitted!</h2>
          <p className="text-green-100">Thank you for your booking request</p>
        </div>
        
        <div className="p-8 text-center">
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">What happens next?</h3>
            
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary-600 text-sm font-bold">1</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Review & Confirmation</p>
                  <p className="text-sm text-gray-600">We'll review your request and check availability within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary-600 text-sm font-bold">2</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email Confirmation</p>
                  <p className="text-sm text-gray-600">You'll receive an email with booking details and payment information</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary-600 text-sm font-bold">3</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Your Event</p>
                  <p className="text-sm text-gray-600">Enjoy your event at West Acton Community Centre!</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t">
              <button
                onClick={handleReset}
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-md transition-colors uppercase"
              >
                Make Another Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Booking Form Step (after calendar selection)
  if (step === 'form' && bookingData && selectedFacility) {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-primary-600 text-white p-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setStep('booking')}
              className="p-1 hover:bg-primary-700 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl font-bold">Complete Booking for {selectedFacility.name}</h2>
              <p className="text-primary-100">Fill in your details</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Booking Summary</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p><strong>Facility:</strong> {selectedFacility.name}</p>
              <p><strong>Date:</strong> {new Date(bookingData.startDateTime).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {new Date(bookingData.startDateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(bookingData.endDateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
              <p><strong>Duration:</strong> {bookingData.totalHours} hours</p>
              {bookingData.totalCost && <p><strong>Estimated Cost:</strong> £{bookingData.totalCost}</p>}
            </div>
          </div>
          
          <BookingForm />
        </div>
      </div>
    )
  }

  // Calendar Booking Step
  if (step === 'booking' && selectedFacility && bookingMethod === 'calendar') {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setStep('select')}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to facility selection
        </button>
        
        <BookingCalendar
          facility={selectedFacility}
          onBookingSelect={handleBookingSelect}
        />
      </div>
    )
  }

  // Traditional Form Step
  if (step === 'form' && selectedFacility && bookingMethod === 'form') {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-primary-600 text-white p-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setStep('select')}
              className="p-1 hover:bg-primary-700 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl font-bold">Book {selectedFacility.name}</h2>
              <p className="text-primary-100">Traditional booking form</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
            <p className="text-sm text-blue-800">
              This form will open your email client with the booking details pre-filled. 
              We'll respond within 24 hours with availability and pricing.
            </p>
          </div>
          
          <BookingForm />
        </div>
      </div>
    )
  }

  // Facility Selection Step
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-primary-600 text-white p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Book Your Space</h2>
        <p className="text-primary-100">Choose a facility and booking method</p>
      </div>

      <div className="p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {facilities.map((facility) => (
            <div key={facility.id} className="border border-gray-200 rounded-lg p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{facility.name}</h3>
                {facility.subtitle && (
                  <p className="text-sm text-gray-600 mb-2">{facility.subtitle}</p>
                )}
                {facility.description && (
                  <p className="text-gray-700 mb-3">{facility.description}</p>
                )}
                
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  {facility.capacity && (
                    <span>👥 {facility.capacity} people</span>
                  )}
                  {facility.hourlyRate && (
                    <span>💷 £{facility.hourlyRate.toString()}/hour</span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleFacilitySelect(facility, 'calendar')}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-md transition-colors flex items-center justify-center space-x-2 uppercase"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book with Calendar</span>
                </button>
                
                <button
                  onClick={() => handleFacilitySelect(facility, 'form')}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-md transition-colors flex items-center justify-center space-x-2 uppercase"
                >
                  <Mail className="w-5 h-5" />
                  <span>Traditional Form</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Booking Methods Explained</h4>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-primary-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Calendar Booking</p>
                <p className="text-sm text-gray-600">
                  Interactive calendar with real-time availability checking. 
                  Select your preferred time slots and complete booking instantly.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-primary-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Traditional Form</p>
                <p className="text-sm text-gray-600">
                  Email-based booking form with detailed requirements. 
                  We'll respond within 24 hours with availability and pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}