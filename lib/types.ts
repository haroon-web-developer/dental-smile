export interface Appointment {
  id: string;
  name: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  message?: string;
  status: 'new' | 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  updated_at?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  icon: string;
  image?: string;
  badge?: string;
  active: boolean;
  indications?: string[];
  procedure_overview?: string[];
  benefits?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface ClinicSettings {
  id: string;
  clinic_name: string;
  phone: string;
  whatsapp: string;
  address: string;
  opening_hours: string;
  hero_title: string;
  hero_description: string;
  google_rating: number;
  google_review_count: number;
  google_maps_url: string;
  google_maps_embed_url: string;
  maintenance_mode?: boolean;
  maintenance_title?: string;
  maintenance_message?: string;
  maintenance_expected_back?: string;
  maintenance_contact_phone?: string;
  maintenance_contact_whatsapp?: string;
  maintenance_secret_key?: string;
  updated_at?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date_text: string;
  text: string;
  source: 'Google Reviews';
  verified: boolean;
}

export interface DoctorProfile {
  id: string;
  name: string;
  title: string;
  role: string;
  qualifications: string[];
  experience: string;
  specialties: string[];
  photo: string;
  pmdc_reg: string;
  availability: string;
  bio: string;
}

export interface BeforeAfterCase {
  id: string;
  title: string;
  category: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  duration: string;
  visits: string;
  procedureSlug: string;
}

export interface SymptomItem {
  id: string;
  symptom: string;
  emoji: string;
  category: string;
  description: string;
  recommendedService: string;
  procedureSlug: string;
  urgency: 'Immediate' | 'Moderate' | 'Elective';
  typicalVisits: string;
}

