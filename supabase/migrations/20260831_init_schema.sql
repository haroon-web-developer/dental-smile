-- Supabase Schema for Islamabad Dental Clinic
-- Migration: 20260831_init_schema.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. APPOINTMENTS TABLE
CREATE TABLE IF NOT EXISTS public.appointments (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  email TEXT,
  service TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Sparkles',
  active BOOLEAN NOT NULL DEFAULT true,
  indications JSONB DEFAULT '[]'::jsonb,
  procedure_overview JSONB DEFAULT '[]'::jsonb,
  benefits JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CLINIC SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.clinic_settings (
  id TEXT PRIMARY KEY DEFAULT 'default-settings',
  clinic_name TEXT NOT NULL DEFAULT 'Dental Smile',
  phone TEXT NOT NULL DEFAULT '0318 5446951',
  whatsapp TEXT NOT NULL DEFAULT '923185446951',
  address TEXT NOT NULL DEFAULT 'Ground Floor, Executive Arcade, near Islamabad Mart, Markaz Margalla View, D-17, Islamabad, Pakistan',
  opening_hours TEXT NOT NULL DEFAULT 'Open until 10:00 PM',
  hero_title TEXT NOT NULL DEFAULT 'Confident Smiles Start With Better Dental Care',
  hero_description TEXT NOT NULL,
  google_rating NUMERIC(3, 1) NOT NULL DEFAULT 4.9,
  google_review_count INTEGER NOT NULL DEFAULT 174,
  google_maps_url TEXT,
  google_maps_embed_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. FAQS TABLE
CREATE TABLE IF NOT EXISTS public.faqs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinic_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Public can insert appointments
CREATE POLICY "Public insert appointments" ON public.appointments
  FOR INSERT WITH CHECK (true);

-- Authenticated / Admin can view & update all appointments
CREATE POLICY "Admin access appointments" ON public.appointments
  FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Public can read active services, settings, and faqs
CREATE POLICY "Public read services" ON public.services
  FOR SELECT USING (active = true);

CREATE POLICY "Public read settings" ON public.clinic_settings
  FOR SELECT USING (true);

CREATE POLICY "Public read faqs" ON public.faqs
  FOR SELECT USING (active = true);

-- Admin can manage services, settings, faqs
CREATE POLICY "Admin manage services" ON public.services
  FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Admin manage settings" ON public.clinic_settings
  FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Admin manage faqs" ON public.faqs
  FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON public.appointments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON public.appointments(status);
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
