import { Metadata } from 'next'
import { getSettings } from './settings'

interface SEOConfig {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
  author?: string
  publishedTime?: string
  modifiedTime?: string
  noIndex?: boolean
  canonical?: string
}

export async function generateSEOMetadata(config: SEOConfig = {}): Promise<Metadata> {
  const settings = await getSettings()
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://westactoncc.org.uk'
  const defaultImage = `${baseUrl}/img/entrance.jpeg`
  
  // Construct full title
  const fullTitle = config.title 
    ? `${config.title} | ${settings.site_title}`
    : `${settings.site_title} | Community Hub in Acton, London`
  
  // Use provided description or fallback to site description
  const description = config.description || settings.site_description
  
  // Default keywords related to community centre
  const defaultKeywords = [
    'community centre',
    'West Acton',
    'Acton',
    'London',
    'community hub',
    'local community',
    'facilities hire',
    'community programs',
    'West London',
    'Ealing'
  ]
  
  const keywords = config.keywords ? [...defaultKeywords, ...config.keywords] : defaultKeywords
  
  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: settings.site_title }],
    creator: settings.site_title,
    publisher: settings.site_title,
    
    // Open Graph
    openGraph: {
      title: fullTitle,
      description,
      url: config.url ? `${baseUrl}${config.url}` : baseUrl,
      siteName: settings.site_title,
      images: [
        {
          url: config.image || defaultImage,
          width: 1200,
          height: 630,
          alt: `${settings.site_title} - ${description}`,
        },
      ],
      locale: 'en_GB',
      type: config.type || 'website',
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [config.image || defaultImage],
    },
    
    // Additional meta tags
    robots: config.noIndex ? 'noindex, nofollow' : 'index, follow',
    
    // Structured data will be added separately
    alternates: {
      canonical: config.canonical || (config.url ? `${baseUrl}${config.url}` : baseUrl),
    },
    
    // Additional metadata
    metadataBase: new URL(baseUrl),
    
    // Verification and other meta tags
    other: {
      'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION || '',
      'msvalidate.01': process.env.BING_SITE_VERIFICATION || '',
      'theme-color': '#059669', // primary-600 color
      'color-scheme': 'light',
    },
  }
  
  // Add article-specific metadata if type is article
  if (config.type === 'article') {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: config.publishedTime,
      modifiedTime: config.modifiedTime,
      authors: [settings.site_title],
    }
  }
  
  return metadata
}

// Structured Data helpers
export interface LocalBusinessData {
  name: string
  description: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  telephone: string
  email: string
  url: string
  openingHours?: string[]
  priceRange?: string
  amenityFeature?: string[]
  image?: string[]
}

export function generateLocalBusinessStructuredData(data: LocalBusinessData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: data.name,
    description: data.description,
    url: data.url,
    telephone: data.telephone,
    email: data.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.address.streetAddress,
      addressLocality: data.address.addressLocality,
      addressRegion: data.address.addressRegion,
      postalCode: data.address.postalCode,
      addressCountry: data.address.addressCountry,
    },
    openingHours: data.openingHours || [
      'Mo-Su 07:00-23:00'
    ],
    priceRange: data.priceRange || '£-££',
    amenityFeature: data.amenityFeature || [
      'WiFi',
      'Parking',
      'Accessibility',
      'Kitchen Facilities',
      'Audio/Visual Equipment'
    ],
    image: data.image || [`${process.env.NEXT_PUBLIC_BASE_URL || 'https://westactoncc.org.uk'}/img/entrance.jpeg`],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '50',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.5074,
      longitude: -0.1278,
    },
  }
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://westactoncc.org.uk'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  }
}

export function generateEventStructuredData(event: {
  name: string
  description: string
  startDate: string
  endDate?: string
  location: string
  organizer: string
  offers?: {
    price: string
    priceCurrency: string
    availability: string
  }
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://westactoncc.org.uk'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    location: {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Acton',
        addressRegion: 'London',
        addressCountry: 'GB',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: event.organizer,
      url: baseUrl,
    },
    offers: event.offers ? {
      '@type': 'Offer',
      price: event.offers.price,
      priceCurrency: event.offers.priceCurrency,
      availability: `https://schema.org/${event.offers.availability}`,
    } : undefined,
  }
}

export function generateOrganizationStructuredData(settings: any) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://westactoncc.org.uk'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.site_title,
    description: settings.site_description,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: settings.contact_phone,
      contactType: 'customer service',
      email: settings.contact_email,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.address,
      addressLocality: 'Acton',
      addressRegion: 'London',
      addressCountry: 'GB',
    },
    sameAs: [
      settings.social_facebook,
      settings.social_twitter,
      settings.social_instagram,
    ].filter(Boolean),
  }
}