"use client";

import { useState } from "react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create email body including Expected Guests
    const emailBody = `
New Booking Enquiry - West Acton Community Centre

Contact Details:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Organisation: ${formData.organization || "N/A"}

Event Details:
Event Type: ${formData.eventType}
Room Required: ${formData.room}
Date: ${formData.eventDate}
Time: ${formData.startTime} - ${formData.endTime}
Expected Guests: ${formData.expectedGuests}
Description: ${formData.description}

Additional Information:
Catering Requirements: ${formData.catering || "None specified"}
Charity: ${formData.isCharity ? "Yes" : "No"}${
      formData.isCharity && formData.charityNumber
        ? ` (${formData.charityNumber})`
        : ""
    }
Regular Booking: ${formData.isRegularBooking ? "Yes" : "No"}
    `;

    const subject = encodeURIComponent(
      `Booking Enquiry - ${formData.eventType} - ${formData.eventDate}`
    );
    const body = encodeURIComponent(emailBody);
    const mailtoLink = `mailto:info@westactoncentre.co.uk?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
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
        <button
          type="submit"
          className="w-full bg-primary-950 hover:bg-primary-900 text-white font-bold py-4 px-8 rounded-lg text-lg uppercase tracking-wide transition-colors"
        >
          Send Booking Enquiry
        </button>
        <p className="text-sm text-gray-600 mt-4 text-center">
          This will open your email client with the booking details pre-filled.
          We'll respond within 24 hours with availability and pricing.
        </p>
      </div>
    </form>
  );
}
