import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getServices, getServiceBySlug, getClinicSettings } from '@/lib/storage/db';
import AppointmentSection from '@/components/sections/AppointmentSection';
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo/schema-generator';
import {
  Sparkles,
  ShieldAlert,
  Activity,
  Layers,
  Crown,
  Shield,
  Anchor,
  Smile,
  CheckCircle2,
  Calendar,
  Phone,
  MessageCircle,
  ChevronRight,
  ArrowLeft,
  LucideIcon
} from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp/generate-message';

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  ShieldAlert,
  Activity,
  Layers,
  Crown,
  Shield,
  Anchor,
  Smile,
};

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  const settings = await getClinicSettings();

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  const title = `${service.name} in Islamabad | ${settings.clinic_name}`;
  const description = `${service.short_description} Consult ${settings.clinic_name} in Islamabad. Open until 10 PM. Phone: ${settings.phone}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://islamabaddentalclinic.pk/services/${service.slug}`,
      siteName: settings.clinic_name,
      type: 'article',
    },
  };
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  const settings = await getClinicSettings();
  const allServices = await getServices();

  if (!service) {
    notFound();
  }

  const IconComponent = iconMap[service.icon] || Sparkles;
  const whatsappLink = buildWhatsAppLink(settings.whatsapp, undefined, `Hello Dental Smile, I would like to inquire about ${service.name}.`);

  const serviceSchema = generateServiceSchema(service, settings);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://dentalsmile.pk' },
    { name: 'Services', url: 'https://dentalsmile.pk/services' },
    { name: service.name, url: `https://dentalsmile.pk/services/${service.slug}` },
  ]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/services" className="hover:text-slate-900 transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-semibold">{service.name}</span>
          </nav>
        </div>
      </div>

      {/* Service Hero Header */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/80 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Col: Info & Actions */}
            <div className="lg:col-span-7 space-y-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-800"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to all clinical services</span>
              </Link>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center shadow-2xs">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                    Clinical Treatment in Islamabad
                  </span>
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    {service.name}
                  </h1>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {service.description}
              </p>

              {/* Service Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {service.badge && (
                  <span className="text-xs font-bold bg-sky-100 text-sky-900 px-3 py-1 rounded-full border border-sky-200">
                    {service.badge}
                  </span>
                )}
                <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
                  Open until 10 PM
                </span>
                <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-full border border-slate-200">
                  PMDC Verified Care
                </span>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="#appointment-section"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-bold transition-all shadow-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation for {service.name}</span>
                </Link>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs sm:text-sm font-bold transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Col: High-Res Service Photo Card */}
            {service.image && (
              <div className="lg:col-span-5">
                <div className="relative h-64 sm:h-80 w-full rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100">
                  <Image
                    src={service.image}
                    alt={`${service.name} at Dental Smile`}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 500px"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-300">
                      Dental Smile
                    </span>
                    <p className="text-sm font-bold mt-0.5">{service.name} Clinical Care</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Clinical Details Sections */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Content Body */}
            <div className="lg:col-span-8 space-y-10">
              {/* Indications: When is it needed? */}
              {service.indications && service.indications.length > 0 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-4">
                    When is {service.name} Recommended?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                    Patients commonly consider this treatment under the following clinical circumstances:
                  </p>
                  <ul className="space-y-3">
                    {service.indications.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Procedure Overview */}
              {service.procedure_overview && service.procedure_overview.length > 0 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-4">
                    What to Expect During the Procedure
                  </h2>
                  <div className="space-y-4">
                    {service.procedure_overview.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3.5">
                        <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Treatment Benefits */}
              {service.benefits && service.benefits.length > 0 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-4">
                    Key Advantages
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.benefits.map((benefit, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="block text-xs font-bold text-slate-900">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Medical Assessment Note */}
              <div className="p-5 rounded-xl bg-sky-50/60 border border-sky-100 text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-sky-900 block mb-1">Clinical Note:</span>
                Every patient&apos;s oral anatomy and health conditions are unique. An in-person dental consultation and clinical assessment are necessary to determine the most suitable treatment plan for your situation.
              </div>
            </div>

            {/* Sidebar: Other Services & Quick Contacts */}
            <div className="lg:col-span-4 space-y-6">
              {/* Other Services Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                  Other Dental Services
                </h3>
                <ul className="space-y-2">
                  {allServices
                    .filter((s) => s.id !== service.id)
                    .map((other) => (
                      <li key={other.id}>
                        <Link
                          href={`/services/${other.slug}`}
                          className="flex items-center justify-between py-2 text-xs font-medium text-slate-600 hover:text-sky-700 hover:bg-slate-50 px-2 rounded-lg transition-colors"
                        >
                          <span>{other.name}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Location & Quick Contact Card */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-sky-400">
                  Visit the Clinic
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {settings.address}
                </p>
                <div className="pt-2 border-t border-slate-800 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Hours:</span>
                    <span className="font-semibold text-emerald-400">{settings.opening_hours}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Phone:</span>
                    <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="font-semibold text-white hover:underline">
                      {settings.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Section Preselected for this service */}
      <AppointmentSection
        settings={settings}
        services={allServices}
        preselectedService={service.name}
      />
    </div>
  );
}
