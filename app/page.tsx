import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import TrustSection from '@/components/sections/TrustSection';
import BoutiqueExperienceSection from '@/components/sections/BoutiqueExperienceSection';
import AestheticSmileDesignSection from '@/components/sections/AestheticSmileDesignSection';
import SmileTransformationSlider from '@/components/sections/SmileTransformationSlider';
import DentalSymptomChecker from '@/components/sections/DentalSymptomChecker';
import ServicesGrid from '@/components/sections/ServicesGrid';
import EmergencyEveningBanner from '@/components/sections/EmergencyEveningBanner';
import ClinicalTeamSection from '@/components/sections/ClinicalTeamSection';
import SterilizationTechSection from '@/components/sections/SterilizationTechSection';
import TreatmentPricingGuide from '@/components/sections/TreatmentPricingGuide';
import ClinicFacilityGallery from '@/components/sections/ClinicFacilityGallery';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import ReviewsSection from '@/components/sections/ReviewsSection';
import AppointmentSection from '@/components/sections/AppointmentSection';
import LocationSection from '@/components/sections/LocationSection';
import FAQSection from '@/components/sections/FAQSection';
import QuickConsultationFloat from '@/components/layout/QuickConsultationFloat';
import { getClinicSettings, getServices, getFAQs } from '@/lib/storage/db';

export default async function HomePage() {
  const settings = await getClinicSettings();
  const services = await getServices();
  const faqs = await getFAQs();

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section with verified badges & clinic preview */}
      <HeroSection settings={settings} />

      {/* 2. Trust Highlights */}
      <TrustSection settings={settings} />

      {/* 3. Boutique Patient Experience & Comfort Menu (Anxiety-Free Dentistry) */}
      <BoutiqueExperienceSection settings={settings} />

      {/* 4. Aesthetic Smile Design & Cosmetic Veneers */}
      <AestheticSmileDesignSection settings={settings} />

      {/* 5. Interactive Before & After Smile Slider */}
      <SmileTransformationSlider settings={settings} />

      {/* 6. Interactive Dental Symptom & Treatment Finder */}
      <DentalSymptomChecker settings={settings} />

      {/* 7. Clinical Services Grid with Curated Images */}
      <ServicesGrid services={services} />

      {/* 8. Emergency Evening Care Fast-Track */}
      <EmergencyEveningBanner settings={settings} />

      {/* 9. Meet Doctors & Specialists */}
      <ClinicalTeamSection settings={settings} />

      {/* 10. 4-Step Sterilization & Tech Showcase */}
      <SterilizationTechSection settings={settings} />

      {/* 11. Treatment Guide & Transparent Estimates */}
      <TreatmentPricingGuide settings={settings} />

      {/* 12. Virtual Clinic Tour & Facility */}
      <ClinicFacilityGallery settings={settings} />

      {/* 13. Why Choose Dental Smile */}
      <WhyChooseUs settings={settings} />

      {/* 14. Patient Reviews & Google Testimonials */}
      <ReviewsSection settings={settings} />

      {/* 15. Interactive Appointment Booking & WhatsApp */}
      <AppointmentSection settings={settings} services={services} />

      {/* 16. Location, Directions & Working Hours */}
      <LocationSection settings={settings} />

      {/* 17. Comprehensive FAQs */}
      <FAQSection faqs={faqs} settings={settings} />

      {/* 18. Floating Quick Consultation Widget */}
      <QuickConsultationFloat settings={settings} />
    </div>
  );
}

