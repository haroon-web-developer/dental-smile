import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileStickyBar from '@/components/layout/MobileStickyBar';
import { getClinicSettings, getServices } from '@/lib/storage/db';
import { generateDentistSchema } from '@/lib/seo/schema-generator';

export const viewport: Viewport = {
  themeColor: '#0284c7',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getClinicSettings();
  const title = `${settings.clinic_name} | Modern & Gentle Dentistry in Islamabad (4.9★)`;
  const description = `${settings.clinic_name} offers premium, gentle dental care in Islamabad: teeth whitening, root canals, dental implants, zirconia crowns, fillings & braces. Open until 10 PM. Call ${settings.phone}.`;

  return {
    title: {
      default: title,
      template: `%s | ${settings.clinic_name}`,
    },
    description,
    keywords: [
      'Dental Smile Islamabad',
      'dental clinic Islamabad',
      'dentist Islamabad',
      'dental clinic in Islamabad',
      'best dentist in Islamabad',
      'dentist near me',
      'cosmetic dentist Islamabad',
      'teeth whitening Islamabad',
      'root canal Islamabad',
      'dental implant Islamabad',
      'braces Islamabad',
      'tooth extraction Islamabad',
      'zirconia crown Islamabad',
      'dental filling Islamabad',
    ],
    authors: [{ name: settings.clinic_name }],
    creator: settings.clinic_name,
    publisher: settings.clinic_name,
    formatDetection: {
      email: false,
      address: true,
      telephone: true,
    },
    metadataBase: new URL('https://dentalsmile.pk'),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title,
      description,
      url: 'https://dentalsmile.pk',
      siteName: settings.clinic_name,
      locale: 'en_PK',
      type: 'website',
      images: [
        {
          url: '/dental-smile-logo.jpg',
          width: 1200,
          height: 630,
          alt: `${settings.clinic_name} in Islamabad`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/dental-smile-logo.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getClinicSettings();
  const services = await getServices();
  const schemaData = generateDentistSchema(settings);

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col font-sans selection:bg-sky-500 selection:text-white pb-14 lg:pb-0">
        <Header settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} services={services} />
        <MobileStickyBar settings={settings} />
      </body>
    </html>
  );
}
