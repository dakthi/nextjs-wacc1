"use client";

import { useState } from "react";

interface Facility {
  id: number;
  name: string;
}

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    eventType: "",
    room: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    expectedGuests: "", // NEW FIELD
    description: "",
    catering: "",
    isCharity: false,
    charityNumber: "",
    isRegularBooking: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Map room display names to facility names for API
  const getFacilityName = (roomValue: string): string => {
    if (roomValue.includes("Main Hall")) return "Main Hall";
    if (roomValue.includes("Small Hall")) return "Small Hall";
    return roomValue;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // First get facilities to map room name to facility_id
      const facilitiesResponse = await fetch('/api/facilities');
      if (!facilitiesResponse.ok) {
        throw new Error('Failed to fetch facilities');
      }
      const facilities: Facility[] = await facilitiesResponse.json();
      
      const facilityName = getFacilityName(formData.room);
      const facility = facilities.find(f => f.name === facilityName);
      
      if (!facility) {
        throw new Error(`Facility "${facilityName}" not found`);
      }

      // Create date-time objects
      const eventDate = new Date(formData.eventDate);
      const [startHour, startMinute] = formData.startTime.split(':').map(Number);
      const [endHour, endMinute] = formData.endTime.split(':').map(Number);
      
      const startDateTime = new Date(eventDate);
      startDateTime.setHours(startHour, startMinute, 0, 0);
      
      const endDateTime = new Date(eventDate);
      endDateTime.setHours(endHour, endMinute, 0, 0);

      // Create notes field with additional information
      const notes = [
        formData.description ? `Description: ${formData.description}` : '',
        formData.organization ? `Organization: ${formData.organization}` : '',
        formData.expectedGuests ? `Expected Guests: ${formData.expectedGuests}` : '',
        formData.catering ? `Catering: ${formData.catering}` : '',
        formData.isCharity ? `Charity Event${formData.charityNumber ? ` (${formData.charityNumber})` : ''}` : '',
        formData.isRegularBooking ? 'Regular Booking: Yes' : ''
      ].filter(Boolean).join('\n');

      // Submit booking
      const bookingData = {
        facility_id: facility.id,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone || null,
        event_title: formData.eventType,
        event_description: formData.description || null,
        start_date_time: startDateTime.toISOString(),
        end_date_time: endDateTime.toISOString(),
        notes: notes || null
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit booking');
      }

      const booking = await response.json();
      
      setSubmitStatus({
        type: 'success',
        message: 'Booking submitted successfully! We\'ll contact you within 24 hours with availability and pricing.'
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        organization: "",
        eventType: "",
        room: "",
        eventDate: "",
        startTime: "",
        endTime: "",
        expectedGuests: "",
        description: "",
        catering: "",
        isCharity: false,
        charityNumber: "",
        isRegularBooking: false,
      });

    } catch (error) {
      console.error('Error submitting booking:', error);
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to submit booking. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
      {/* Contact Information */}
      <div className="md:col-span-2">
        <h4 className="text-lg font-semibold text-primary-600 mb-4 uppercase tracking-wide">
          Contact Information
        </h4>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      <div>
        <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
          Organisation (Optional)
        </label>
        <input
          type="text"
          id="organization"
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      {/* Event Details */}
      <div className="md:col-span-2 mt-6">
        <h4 className="text-lg font-semibold text-primary-600 mb-4 uppercase tracking-wide">
          Event Details
        </h4>
      </div>

      <div>
        <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-2">
          Event Type *
        </label>
        <select
          id="eventType"
          name="eventType"
          required
          value={formData.eventType}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">Select event type...</option>
          <option value="Birthday Party">Birthday Party</option>
          <option value="Wedding Reception">Wedding Reception</option>
          <option value="Funeral/Wake">Funeral/Wake</option>
          <option value="Community Meeting">Community Meeting</option>
          <option value="AGM">AGM</option>
          <option value="Training Course">Training Course</option>
          <option value="Fitness Class">Fitness Class</option>
          <option value="Cultural Event">Cultural Event</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="room" className="block text-sm font-medium text-gray-700 mb-2">
          Room Required *
        </label>
        <select
          id="room"
          name="room"
          required
          value={formData.room}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">Select room...</option>
          <option value="Main Hall + Outside Area">Main Hall + Outside Area (up to 120 people)</option>
          <option value="Small Hall">Small Hall (up to 18 people)</option>
        </select>
      </div>

      <div>
        <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-2">
          Event Date *
        </label>
        <input
          type="date"
          id="eventDate"
          name="eventDate"
          required
          value={formData.eventDate}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      <div>
        <label htmlFor="expectedGuests" className="block text-sm font-medium text-gray-700 mb-2">
          Expected Number of Guests *
        </label>
        <input
          type="number"
          id="expectedGuests"
          name="expectedGuests"
          required
          min="1"
          max="120"
          value={formData.expectedGuests}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      <div>
        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-2">
          Start Time *
        </label>
        <select
          id="startTime"
          name="startTime"
          required
          value={formData.startTime}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">Select start time...</option>
          {Array.from({ length: 17 }, (_, i) => {
            const hour = i + 7; // 7 AM to 11 PM
            return (
              <option key={hour} value={`${hour.toString().padStart(2, "0")}:00`}>
                {hour}:00
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-2">
          End Time *
        </label>
        <select
          id="endTime"
          name="endTime"
          required
          value={formData.endTime}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">Select end time...</option>
          {Array.from({ length: 17 }, (_, i) => {
            const hour = i + 7;
            return (
              <option key={hour} value={`${hour.toString().padStart(2, "0")}:00`}>
                {hour}:00
              </option>
            );
          })}
        </select>
      </div>

      <div className="md:col-span-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Event Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          placeholder="Please provide any additional details about your event..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      <div className="md:col-span-2">
        <label htmlFor="catering" className="block text-sm font-medium text-gray-700 mb-2">
          Catering Requirements
        </label>
        <input
          type="text"
          id="catering"
          name="catering"
          value={formData.catering}
          onChange={handleChange}
          placeholder="e.g., Outside catering, own food and drinks, etc."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      {/* Additional Information */}
      <div className="md:col-span-2 mt-6">
        <h4 className="text-lg font-semibold text-primary-600 mb-4 uppercase tracking-wide">
          Additional Information
        </h4>
      </div>

      <div className="md:col-span-2">
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isCharity"
              checked={formData.isCharity}
              onChange={handleChange}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              This is a registered charity event
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="isRegularBooking"
              checked={formData.isRegularBooking}
              onChange={handleChange}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              This is for regular bookings
            </span>
          </label>
        </div>
      </div>

      {formData.isCharity && (
        <div>
          <label
            htmlFor="charityNumber"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Charity Registration Number
          </label>
          <input
            type="text"
            id="charityNumber"
            name="charityNumber"
            value={formData.charityNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      )}

      <div className="md:col-span-2 mt-8">
        {submitStatus.type && (
          <div className={`mb-4 p-4 rounded-lg ${
            submitStatus.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {submitStatus.message}
          </div>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full font-bold py-4 px-8 rounded-lg text-lg uppercase tracking-wide transition-colors ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed text-white'
              : 'bg-primary-950 hover:bg-primary-900 text-white'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Send Booking Enquiry'}
        </button>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Your booking request will be sent directly to our team.
          We'll respond within 24 hours with availability and pricing.
        </p>
      </div>
    </form>
  );
}
