"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import AdminLayout from "@/components/AdminLayout"
import AdminAuth from "@/components/AdminAuth"
import FileUpload from "@/components/FileUpload"

interface Note {
  id: number
  title: string
  content: string
  author: string
  createdAt: string
}

interface HomepageSettings {
  // Site Info (moved from Settings)
  site_title: string
  site_description: string
  
  // Hero Section
  hero_background_image: string
  hero_subtitle: string
  hero_cta_button_text: string
  hero_cta_button_link: string
  
  // Contact Info (moved from Settings)
  contact_phone: string
  contact_email: string
  address: string
  
  // Stats (moved from Settings)
  residents_served: string
  weekly_programs: string
  community_residents: string
  opening_hours_text: string
  opening_hours_details: string
  
  // Social Media (moved from Settings)
  social_facebook: string
  social_instagram: string
  
  // Split Banner Section
  banner_programs_title: string
  banner_programs_subtitle: string
  banner_programs_image: string
  banner_facilities_title: string
  banner_facilities_subtitle: string
  
  // Community Impact Section
  community_section_pretitle: string
  community_section_title: string
  community_section_description: string
  
  // Facilities Section
  facilities_section_title: string
  facilities_section_heading: string
  
  // Location Section
  location_section_title: string
  location_section_description: string
  location_section_contact: string
  location_section_heading: string
  location_section_image: string
  location_benefit_1_title: string
  location_benefit_1_desc: string
  location_benefit_2_title: string
  location_benefit_2_desc: string
  location_benefit_3_title: string
  location_benefit_3_desc: string
  location_button_1_text: string
  location_button_1_link: string
  location_button_2_text: string
  location_button_2_link: string
  
  // Programs Section
  programs_section_title: string
  programs_button_text: string
}

const defaultSettings: HomepageSettings = {
  // Site Info (moved from Settings)
  site_title: "West Acton Community Centre",
  site_description: "A vibrant community centre serving West Acton and surrounding areas",
  
  // Hero Section
  hero_background_image: "/img/entrance.jpeg",
  hero_subtitle: "Your local hub for education, leisure, and recreational programs. We serve over 2,000 residents in West Acton with 15+ regular programs every week.",
  hero_cta_button_text: "EXPLORE OUR PROGRAMS",
  hero_cta_button_link: "/programs",
  
  // Contact Info (moved from Settings)
  contact_phone: "+44 20 1234 5678",
  contact_email: "info@westactoncc.org.uk",
  address: "West Acton Community Centre, High Street, London W3",
  
  // Stats (moved from Settings)
  residents_served: "2,000+",
  weekly_programs: "15+",
  community_residents: "2,000+",
  opening_hours_text: "7 days",
  opening_hours_details: "Monday to Sunday, 7am-11pm",
  
  // Social Media (moved from Settings)
  social_facebook: "",
  social_instagram: "",
  
  // Split Banner Section
  banner_programs_title: "REGULAR PROGRAMMES",
  banner_programs_subtitle: "Weekly activities for all ages and interests",
  banner_programs_image: "/img/poster-stayandplay.jpeg",
  banner_facilities_title: "ROOM HIRE",
  banner_facilities_subtitle: "Flexible spaces for your events",
  
  // Community Impact Section
  community_section_pretitle: "Community Impact",
  community_section_title: "Serving West Acton Together",
  community_section_description: "West Acton Community Centre is dedicated to improving wellbeing through education, leisure, and recreational programmes. We work closely with local businesses and community members to create a vibrant, supportive community.",
  
  // Facilities Section
  facilities_section_title: "Modern Facilities for Every Occasion",
  facilities_section_heading: "Our Available Spaces",
  
  // Location Section
  location_section_title: "Convenient Location & Access",
  location_section_description: "Located in Churchill Gardens, West Acton, we're easily accessible by public transport and offer onsite parking. Our central location makes us the perfect hub for West London community activities.",
  location_section_contact: "Find us at Churchill Gardens, West Acton, London W3 0PG",
  location_section_heading: "Getting Here",
  location_section_image: "/img/entrance.jpeg",
  location_benefit_1_title: "West Acton Station",
  location_benefit_1_desc: "Just minutes from West Acton Underground station on the Central line, providing direct access to Central London",
  location_benefit_2_title: "Bus Routes",
  location_benefit_2_desc: "Served by bus 218 and other local routes for easy access from across London and surrounding areas",
  location_benefit_3_title: "Private On-site Parking",
  location_benefit_3_desc: "Free private parking available for visitors and event attendees, with disabled access spaces",
  location_button_1_text: "Get Directions",
  location_button_1_link: "https://maps.google.com/?q=Churchill+Gardens+West+Acton+London+W3+0PG",
  location_button_2_text: "Contact Us",
  location_button_2_link: "/contact",
  
  // Programs Section
  programs_section_title: "Featured Programmes This Week",
  programs_button_text: "View All Programmes",
}

export default function HomepageAdmin() {
  const { data: session } = useSession()
  const [settings, setSettings] = useState<HomepageSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [notes, setNotes] = useState<Note[]>([])
  const [showAddNote, setShowAddNote] = useState(false)
  const [noteForm, setNoteForm] = useState({ title: '', content: '' })

  useEffect(() => {
    fetchSettings()
    fetchNotes()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings')
      if (!response.ok) throw new Error('Failed to fetch settings')
      const data = await response.json()
      
      const settings = data.reduce((acc: any, setting: any) => {
        acc[setting.key] = setting.value
        return acc
      }, {})
      
      setSettings({
        // Site Info
        site_title: settings.site_title || defaultSettings.site_title,
        site_description: settings.site_description || defaultSettings.site_description,
        
        // Hero Section
        hero_background_image: settings.hero_background_image || defaultSettings.hero_background_image,
        hero_subtitle: settings.hero_subtitle || defaultSettings.hero_subtitle,
        hero_cta_button_text: settings.hero_cta_button_text || defaultSettings.hero_cta_button_text,
        hero_cta_button_link: settings.hero_cta_button_link || defaultSettings.hero_cta_button_link,
        
        // Contact Info
        contact_phone: settings.contact_phone || defaultSettings.contact_phone,
        contact_email: settings.contact_email || defaultSettings.contact_email,
        address: settings.address || defaultSettings.address,
        
        // Stats
        residents_served: settings.residents_served || defaultSettings.residents_served,
        weekly_programs: settings.weekly_programs || defaultSettings.weekly_programs,
        community_residents: settings.community_residents || defaultSettings.community_residents,
        opening_hours_text: settings.opening_hours_text || defaultSettings.opening_hours_text,
        opening_hours_details: settings.opening_hours_details || defaultSettings.opening_hours_details,
        
        // Social Media
        social_facebook: settings.social_facebook || defaultSettings.social_facebook,
        social_instagram: settings.social_instagram || defaultSettings.social_instagram,
        
        // Other sections (keep existing functionality)
        banner_programs_title: settings.banner_programs_title || defaultSettings.banner_programs_title,
        banner_programs_subtitle: settings.banner_programs_subtitle || defaultSettings.banner_programs_subtitle,
        banner_programs_image: settings.banner_programs_image || defaultSettings.banner_programs_image,
        banner_facilities_title: settings.banner_facilities_title || defaultSettings.banner_facilities_title,
        banner_facilities_subtitle: settings.banner_facilities_subtitle || defaultSettings.banner_facilities_subtitle,
        
        community_section_pretitle: settings.community_section_pretitle || defaultSettings.community_section_pretitle,
        community_section_title: settings.community_section_title || defaultSettings.community_section_title,
        community_section_description: settings.community_section_description || defaultSettings.community_section_description,
        
        facilities_section_title: settings.facilities_section_title || defaultSettings.facilities_section_title,
        facilities_section_heading: settings.facilities_section_heading || defaultSettings.facilities_section_heading,
        
        location_section_title: settings.location_section_title || defaultSettings.location_section_title,
        location_section_description: settings.location_section_description || defaultSettings.location_section_description,
        location_section_contact: settings.location_section_contact || defaultSettings.location_section_contact,
        location_section_heading: settings.location_section_heading || defaultSettings.location_section_heading,
        location_section_image: settings.location_section_image || defaultSettings.location_section_image,
        location_benefit_1_title: settings.location_benefit_1_title || defaultSettings.location_benefit_1_title,
        location_benefit_1_desc: settings.location_benefit_1_desc || defaultSettings.location_benefit_1_desc,
        location_benefit_2_title: settings.location_benefit_2_title || defaultSettings.location_benefit_2_title,
        location_benefit_2_desc: settings.location_benefit_2_desc || defaultSettings.location_benefit_2_desc,
        location_benefit_3_title: settings.location_benefit_3_title || defaultSettings.location_benefit_3_title,
        location_benefit_3_desc: settings.location_benefit_3_desc || defaultSettings.location_benefit_3_desc,
        location_button_1_text: settings.location_button_1_text || defaultSettings.location_button_1_text,
        location_button_1_link: settings.location_button_1_link || defaultSettings.location_button_1_link,
        location_button_2_text: settings.location_button_2_text || defaultSettings.location_button_2_text,
        location_button_2_link: settings.location_button_2_link || defaultSettings.location_button_2_link,
        
        programs_section_title: settings.programs_section_title || defaultSettings.programs_section_title,
        programs_button_text: settings.programs_button_text || defaultSettings.programs_button_text,
      })
    } catch (error) {
      console.error('Error fetching homepage settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof HomepageSettings, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/admin/notes')
      if (response.ok) {
        const data = await response.json()
        setNotes(data.slice(0, 3))
      }
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/admin/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...noteForm,
          author: session?.user?.email || 'Unknown'
        }),
      })
      
      if (response.ok) {
        setNoteForm({ title: '', content: '' })
        setShowAddNote(false)
        fetchNotes()
      }
    } catch (error) {
      console.error('Error adding note:', error)
    }
  }

  const deleteNote = async (id: number) => {
    if (confirm('Delete this note?')) {
      try {
        const response = await fetch(`/api/admin/notes/${id}`, { method: 'DELETE' })
        if (response.ok) fetchNotes()
      } catch (error) {
        console.error('Error deleting note:', error)
      }
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage("")
    
    try {
      const settingsToUpdate = Object.entries(settings).map(([key, value]) => ({
        key,
        value,
        type: key.includes('image') ? 'image' : 'text',
        description: `🏠 HOME - ${key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`
      }))

      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ settings: settingsToUpdate })
      })

      if (!response.ok) throw new Error('Failed to save settings')

      setMessage("Homepage settings saved successfully!")
      setTimeout(() => setMessage(""), 3000)
    } catch (error) {
      setMessage("Error saving settings. Please try again.")
      console.error('Error saving homepage settings:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminAuth>
      <AdminLayout>
        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-6">
            <div className="mb-4 md:mb-6">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Homepage Content Management</h1>
              <p className="mt-2 text-sm md:text-base text-gray-600">
                Control all content appearing on your homepage. Changes will be reflected immediately.
              </p>
            </div>


            {loading ? (
              <div className="flex items-center justify-center py-8 md:py-12">
                <div className="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-primary-600"></div>
                <span className="ml-3 text-sm md:text-base">Loading homepage settings...</span>
              </div>
            ) : (
              <div className="space-y-6 md:space-y-8">
                {/* Site Information */}
                <div className="bg-white shadow rounded-lg p-4 md:p-6">
                  <h2 className="text-lg font-semibold mb-4">Site Information</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Basic site information displayed in headers and meta tags.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Title
                      </label>
                      <input
                        type="text"
                        value={settings.site_title}
                        onChange={(e) => handleInputChange('site_title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                        placeholder="West Acton Community Centre"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Description
                      </label>
                      <textarea
                        value={settings.site_description}
                        onChange={(e) => handleInputChange('site_description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                        placeholder="A vibrant community centre serving West Acton and surrounding areas"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white shadow rounded-lg p-4 md:p-6">
                  <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Contact details and address information.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={settings.contact_phone}
                        onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                        placeholder="+44 20 1234 5678"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={settings.contact_email}
                        onChange={(e) => handleInputChange('contact_email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                        placeholder="info@westactoncc.org.uk"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        value={settings.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                        placeholder="West Acton Community Centre, High Street, London W3"
                      />
                    </div>
                  </div>
                </div>

                {/* Statistics & Hours */}
                <div className="bg-white shadow rounded-lg p-4 md:p-6">
                  <h2 className="text-lg font-semibold mb-4">Statistics & Opening Hours</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Community statistics and opening hours displayed on the homepage.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Residents Served
                      </label>
                      <input
                        type="text"
                        value={settings.residents_served}
                        onChange={(e) => handleInputChange('residents_served', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                        placeholder="2,000+"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weekly Programs
                      </label>
                      <input
                        type="text"
                        value={settings.weekly_programs}
                        onChange={(e) => handleInputChange('weekly_programs', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                        placeholder="15+"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Community Residents
                      </label>
                      <input
                        type="text"
                        value={settings.community_residents}
                        onChange={(e) => handleInputChange('community_residents', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                        placeholder="2,000+"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Opening Hours (Short)
                      </label>
                      <input
                        type="text"
                        value={settings.opening_hours_text}
                        onChange={(e) => handleInputChange('opening_hours_text', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                        placeholder="7 days"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Opening Hours (Detailed)
                      </label>
                      <input
                        type="text"
                        value={settings.opening_hours_details}
                        onChange={(e) => handleInputChange('opening_hours_details', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                        placeholder="Monday to Sunday, 7am-11pm"
                      />
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-white shadow rounded-lg p-4 md:p-6">
                  <h2 className="text-lg font-semibold mb-4">Social Media</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Social media profile links.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Facebook URL
                      </label>
                      <input
                        type="url"
                        value={settings.social_facebook}
                        onChange={(e) => handleInputChange('social_facebook', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                        placeholder="https://facebook.com/yourpage"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Instagram URL
                      </label>
                      <input
                        type="url"
                        value={settings.social_instagram}
                        onChange={(e) => handleInputChange('social_instagram', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                        placeholder="https://instagram.com/yourprofile"
                      />
                    </div>
                  </div>
                </div>

                {/* Hero Section */}
                <div className="bg-white shadow rounded-lg p-4 md:p-6">
                  <h2 className="text-lg font-semibold mb-4">Hero Section</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Control the main hero banner that appears at the top of your homepage.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <FileUpload
                        onFileSelect={(mediaItem) => {
                          if (mediaItem.filePath) {
                            handleInputChange('hero_background_image', mediaItem.filePath)
                          } else {
                            handleInputChange('hero_background_image', '')
                          }
                        }}
                        currentImage={settings.hero_background_image}
                        label="Hero Background Image"
                        accept="image/*"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hero Subtitle
                      </label>
                      <textarea
                        value={settings.hero_subtitle}
                        onChange={(e) => handleInputChange('hero_subtitle', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                        placeholder="Your local hub for education, leisure, and recreational programs..."
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Call-to-Action Button Text
                        </label>
                        <input
                          type="text"
                          value={settings.hero_cta_button_text}
                          onChange={(e) => handleInputChange('hero_cta_button_text', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                          placeholder="EXPLORE OUR PROGRAMS"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Button Link
                        </label>
                        <input
                          type="text"
                          value={settings.hero_cta_button_link}
                          onChange={(e) => handleInputChange('hero_cta_button_link', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                          placeholder="/programs"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Split Banner Section */}
                <div className="bg-white shadow rounded-lg p-4 md:p-6">
                  <h2 className="text-lg font-semibold mb-4">Split Banner Section</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Dynamic content from Programs and Facilities will be automatically included. Configure titles and images here.
                  </p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    {/* Programs Banner */}
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">Programs Section</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={settings.banner_programs_title}
                          onChange={(e) => handleInputChange('banner_programs_title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subtitle
                        </label>
                        <input
                          type="text"
                          value={settings.banner_programs_subtitle}
                          onChange={(e) => handleInputChange('banner_programs_subtitle', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                        />
                      </div>
                      
                      <div>
                        <FileUpload
                          onFileSelect={(mediaItem) => {
                            if (mediaItem.filePath) {
                              handleInputChange('banner_programs_image', mediaItem.filePath)
                            } else {
                              handleInputChange('banner_programs_image', '')
                            }
                          }}
                          currentImage={settings.banner_programs_image}
                          label="Programs Background Image"
                          accept="image/*"
                        />
                      </div>
                    </div>

                    {/* Facilities Banner */}
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">Facilities Section</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={settings.banner_facilities_title}
                          onChange={(e) => handleInputChange('banner_facilities_title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subtitle
                        </label>
                        <input
                          type="text"
                          value={settings.banner_facilities_subtitle}
                          onChange={(e) => handleInputChange('banner_facilities_subtitle', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Community Impact Section */}
                <div className="bg-white shadow rounded-lg p-4 md:p-6">
                  <h2 className="text-lg font-semibold mb-4">Community Impact Section</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Statistics are pulled from Settings. Configure section titles and descriptions here.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pre-title
                      </label>
                      <input
                        type="text"
                        value={settings.community_section_pretitle}
                        onChange={(e) => handleInputChange('community_section_pretitle', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section Title
                      </label>
                      <input
                        type="text"
                        value={settings.community_section_title}
                        onChange={(e) => handleInputChange('community_section_title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={settings.community_section_description}
                        onChange={(e) => handleInputChange('community_section_description', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                      />
                    </div>
                  </div>
                </div>

                {/* Location Section */}
                <div className="bg-white shadow rounded-lg p-4 md:p-6">
                  <h2 className="text-lg font-semibold mb-4">Location & Access Section</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section Title
                      </label>
                      <input
                        type="text"
                        value={settings.location_section_title}
                        onChange={(e) => handleInputChange('location_section_title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={settings.location_section_description}
                        onChange={(e) => handleInputChange('location_section_description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Line
                      </label>
                      <input
                        type="text"
                        value={settings.location_section_contact}
                        onChange={(e) => handleInputChange('location_section_contact', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section Heading
                      </label>
                      <input
                        type="text"
                        value={settings.location_section_heading}
                        onChange={(e) => handleInputChange('location_section_heading', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                      />
                    </div>
                    
                    <div>
                      <FileUpload
                        onFileSelect={(mediaItem) => {
                          if (mediaItem.filePath) {
                            handleInputChange('location_section_image', mediaItem.filePath)
                          } else {
                            handleInputChange('location_section_image', '')
                          }
                        }}
                        currentImage={settings.location_section_image}
                        label="Location Section Image"
                        accept="image/*"
                      />
                    </div>
                  </div>
                </div>

                {/* Facilities Section */}
                <div className="bg-white shadow rounded-lg p-4 md:p-6">
                  <h2 className="text-lg font-semibold mb-4">Facilities Section</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Control the facilities benefits section. Individual facilities are managed from the Facilities admin.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section Title
                      </label>
                      <input
                        type="text"
                        value={settings.facilities_section_title}
                        onChange={(e) => handleInputChange('facilities_section_title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                        placeholder="Modern Facilities for Every Occasion"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section Heading
                      </label>
                      <input
                        type="text"
                        value={settings.facilities_section_heading}
                        onChange={(e) => handleInputChange('facilities_section_heading', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                        placeholder="Our Available Spaces"
                      />
                    </div>
                  </div>
                </div>

                {/* Programs Section */}
                <div className="bg-white shadow rounded-lg p-4 md:p-6">
                  <h2 className="text-lg font-semibold mb-4">Programs Section</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Control the featured programs section. Individual programs are managed from the Programs admin.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section Title
                      </label>
                      <input
                        type="text"
                        value={settings.programs_section_title}
                        onChange={(e) => handleInputChange('programs_section_title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                        placeholder="Featured Programmes This Week"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Button Text
                      </label>
                      <input
                        type="text"
                        value={settings.programs_button_text}
                        onChange={(e) => handleInputChange('programs_button_text', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                        placeholder="View All Programmes"
                      />
                    </div>
                  </div>
                </div>

                {/* Internal Notes */}
                <div className="bg-white shadow rounded-lg">
                  <div className="px-4 md:px-6 py-4 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <h2 className="text-lg font-semibold text-gray-900">Internal Notes</h2>
                      <button
                        onClick={() => setShowAddNote(!showAddNote)}
                        className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded text-sm font-medium uppercase"
                      >
                        {showAddNote ? 'Cancel' : 'Add Note'}
                      </button>
                    </div>
                  </div>
                  
                  {showAddNote && (
                    <form onSubmit={handleAddNote} className="p-4 md:p-6 border-b border-gray-200 bg-gray-50">
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Note title..."
                          value={noteForm.title}
                          onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                          required
                        />
                        <textarea
                          placeholder="Note content..."
                          value={noteForm.content}
                          onChange={(e) => setNoteForm({ ...noteForm, content: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                          rows={3}
                          required
                        />
                        <button
                          type="submit"
                          className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded text-sm font-medium uppercase"
                        >
                          Save Note
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="p-4 md:p-6">
                    {notes.length === 0 ? (
                      <div className="text-center py-6 md:py-8">
                        <p className="text-gray-500 text-sm md:text-base">No notes yet. Add your first internal note above.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {notes.map((note) => (
                          <div key={note.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                              <h4 className="font-semibold text-gray-900 text-sm md:text-base">{note.title}</h4>
                              <button
                                onClick={() => deleteNote(note.id)}
                                className="text-red-600 hover:text-red-800 text-xs md:text-sm uppercase self-end sm:self-start"
                              >
                                Delete
                              </button>
                            </div>
                            <p className="text-gray-700 text-xs md:text-sm mb-2 whitespace-pre-wrap">
                              {note.content.length > 100 ? `${note.content.substring(0, 100)}...` : note.content}
                            </p>
                            <div className="text-xs text-gray-500">
                              By {note.author} on {new Date(note.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Data Integration Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-sm font-semibold text-blue-900 mb-2">Dynamic Data Integration</h3>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p><strong>Programs:</strong> Automatically pulled from active programs in the Programs section</p>
                    <p><strong>Facilities:</strong> Automatically pulled from active facilities with rates and images</p>
                    <p><strong>Community Stats:</strong> Automatically pulled from Settings (residents served, weekly programs, etc.)</p>
                    <p><strong>Contact Info:</strong> Automatically pulled from Settings (phone, email)</p>
                    <p><strong>Site Details:</strong> Site title and other info pulled from Settings</p>
                  </div>
                </div>

                {/* Save Button with Success Message */}
                <div className="space-y-3">
                  {message && (
                    <div className={`p-3 md:p-4 rounded-md text-sm md:text-base ${
                      message.includes('Error') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'
                    }`}>
                      {message}
                    </div>
                  )}
                  <div className="flex justify-center md:justify-end">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 md:py-2 rounded-md text-sm md:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed uppercase"
                    >
                      {saving ? 'Saving...' : 'Save Homepage Settings'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
    </AdminAuth>
  )
}