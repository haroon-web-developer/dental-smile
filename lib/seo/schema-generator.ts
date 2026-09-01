import { ClinicSettings, ServiceItem, FAQItem } from '../types';

export function generateDentistSchema(settings: ClinicSettings, siteUrl = 'https://islamabaddentalclinic.pk') {
  return {
    '@context': 'https://schema.org',
    '@type': ['Dentist', 'MedicalBusiness', 'LocalBusiness'],
    '@id': `${siteUrl}/#organization`,
    name: settings.clinic_name,
    url: siteUrl,
    telephone: settings.phone,
    image: `${siteUrl}/images/hero-dental-clinic.webp`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ground Floor, Executive Arcade, near Islamabad Mart, Markaz Margalla View, D-17',
      addressLocality: 'Islamabad',
      addressRegion: 'Islamabad Capital Territory',
      postalCode: '44000',
      addressCountry: 'PK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 33.6844,
      longitude: 72.8528,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        opens: '10:00',
        closes: '22:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: settings.google_rating.toString(),
      reviewCount: settings.google_review_count.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    priceRange: '$$',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Dental Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Teeth Whitening' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Root Canal Treatment' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tooth Extraction' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tooth Filling' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Zirconia Crown' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'PFM Crown' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dental Implant' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Braces' } },
      ],
    },
  };
}

export function generateServiceSchema(service: ServiceItem, settings: ClinicSettings, siteUrl = 'https://islamabaddentalclinic.pk') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Dental Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Dentist',
      name: settings.clinic_name,
      telephone: settings.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Ground Floor, Executive Arcade, near Islamabad Mart, Markaz Margalla View, D-17',
        addressLocality: 'Islamabad',
        addressCountry: 'PK',
      },
    },
    areaServed: {
      '@type': 'City',
      name: 'Islamabad',
    },
  };
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
