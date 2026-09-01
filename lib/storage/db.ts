import fs from 'fs';
import path from 'path';
import { Appointment, ClinicSettings, ServiceItem, FAQItem } from '../types';
import { INITIAL_CLINIC_SETTINGS, INITIAL_SERVICES, INITIAL_FAQS } from '../data/initial-data';
import { supabaseAdmin, isServerSupabaseConfigured } from '../supabase/server';

interface LocalStoreData {
  appointments: Appointment[];
  services: ServiceItem[];
  settings: ClinicSettings;
  faqs: FAQItem[];
}

const STORE_FILE_PATH = path.join(process.cwd(), 'lib', 'storage', 'local-store.json');

const INITIAL_DATA_SEED: LocalStoreData = {
  appointments: [
    {
      id: 'apt-seed-1',
      name: 'Muhammad Usman',
      phone: '03001234567',
      whatsapp: '03001234567',
      email: 'usman.patient@example.com',
      service: 'Root Canal Treatment',
      preferred_date: '2026-09-02',
      preferred_time: '04:00 PM',
      message: 'Experiencing tooth pain on the upper left side for 2 days.',
      status: 'confirmed',
      created_at: new Date(Date.now() - 3600000 * 24).toISOString()
    },
    {
      id: 'apt-seed-2',
      name: 'Fatima Noor',
      phone: '03339876543',
      whatsapp: '03339876543',
      email: 'fatima.n@example.com',
      service: 'Teeth Whitening',
      preferred_date: '2026-09-03',
      preferred_time: '06:30 PM',
      message: 'Consultation for wedding teeth whitening.',
      status: 'new',
      created_at: new Date(Date.now() - 3600000 * 5).toISOString()
    },
    {
      id: 'apt-seed-3',
      name: 'Kashif Ali',
      phone: '03125556677',
      whatsapp: '03125556677',
      service: 'Zirconia Crown',
      preferred_date: '2026-09-04',
      preferred_time: '05:00 PM',
      message: 'Need crown replacement consultation.',
      status: 'pending',
      created_at: new Date(Date.now() - 3600000 * 2).toISOString()
    }
  ],
  services: [...INITIAL_SERVICES],
  settings: { ...INITIAL_CLINIC_SETTINGS },
  faqs: [...INITIAL_FAQS]
};

// Global memory cache to speed up reads and sync with file
const globalState = globalThis as unknown as {
  _idc_store?: LocalStoreData;
};

function readLocalStore(): LocalStoreData {
  if (globalState._idc_store) {
    return globalState._idc_store;
  }

  try {
    if (fs.existsSync(STORE_FILE_PATH)) {
      const raw = fs.readFileSync(STORE_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(raw) as Partial<LocalStoreData>;
      const merged: LocalStoreData = {
        appointments: Array.isArray(parsed.appointments) ? parsed.appointments : INITIAL_DATA_SEED.appointments,
        services: Array.isArray(parsed.services) && parsed.services.length > 0 ? parsed.services : INITIAL_DATA_SEED.services,
        settings: parsed.settings ? { ...INITIAL_CLINIC_SETTINGS, ...parsed.settings } : INITIAL_DATA_SEED.settings,
        faqs: Array.isArray(parsed.faqs) && parsed.faqs.length > 0 ? parsed.faqs : INITIAL_DATA_SEED.faqs,
      };
      globalState._idc_store = merged;
      return merged;
    }
  } catch (err) {
    console.warn('Could not read persistent store file, initializing new one:', err);
  }

  // Initialize and write default file
  globalState._idc_store = {
    appointments: [...INITIAL_DATA_SEED.appointments],
    services: [...INITIAL_DATA_SEED.services],
    settings: { ...INITIAL_DATA_SEED.settings },
    faqs: [...INITIAL_DATA_SEED.faqs],
  };

  writeLocalStore(globalState._idc_store);
  return globalState._idc_store;
}

function writeLocalStore(data: LocalStoreData): void {
  globalState._idc_store = data;
  try {
    const dir = path.dirname(STORE_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not write persistent store file:', err);
  }
}

// --------------------- APPOINTMENTS ---------------------

export async function createAppointment(data: Omit<Appointment, 'id' | 'created_at' | 'status'>): Promise<Appointment> {
  const newAppointment: Appointment = {
    id: `apt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    ...data,
    status: 'new',
    created_at: new Date().toISOString(),
  };

  if (isServerSupabaseConfigured && supabaseAdmin) {
    try {
      const { data: inserted, error } = await supabaseAdmin
        .from('appointments')
        .insert([newAppointment])
        .select()
        .single();

      if (!error && inserted) {
        return inserted as Appointment;
      }
      console.warn('Supabase insert failed, using fallback storage:', error?.message);
    } catch (err) {
      console.warn('Supabase connection error:', err);
    }
  }

  const store = readLocalStore();
  store.appointments = [newAppointment, ...store.appointments];
  writeLocalStore(store);
  return newAppointment;
}

export async function getAppointments(): Promise<Appointment[]> {
  if (isServerSupabaseConfigured && supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data as Appointment[];
      }
      console.warn('Supabase select failed, returning fallback:', error?.message);
    } catch (err) {
      console.warn('Supabase query error:', err);
    }
  }

  const store = readLocalStore();
  return store.appointments;
}

export async function updateAppointmentStatus(id: string, status: Appointment['status']): Promise<Appointment | null> {
  if (isServerSupabaseConfigured && supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('appointments')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        return data as Appointment;
      }
    } catch (err) {
      console.warn('Supabase update status error:', err);
    }
  }

  const store = readLocalStore();
  const index = store.appointments.findIndex(a => a.id === id);
  if (index !== -1) {
    store.appointments[index] = {
      ...store.appointments[index],
      status,
      updated_at: new Date().toISOString()
    };
    writeLocalStore(store);
    return store.appointments[index];
  }
  return null;
}

export async function deleteAppointment(id: string): Promise<boolean> {
  const store = readLocalStore();
  store.appointments = store.appointments.filter(a => String(a.id).trim() !== String(id).trim());
  writeLocalStore(store);

  if (isServerSupabaseConfigured && supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin
        .from('appointments')
        .delete()
        .eq('id', id);

      if (error) {
        console.warn('Supabase delete error:', error.message);
      }
    } catch (err) {
      console.warn('Supabase delete error:', err);
    }
  }

  return true;
}

// --------------------- SETTINGS ---------------------

export async function getClinicSettings(): Promise<ClinicSettings> {
  if (isServerSupabaseConfigured && supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('clinic_settings')
        .select('*')
        .limit(1)
        .single();

      if (!error && data) {
        return data as ClinicSettings;
      }
    } catch (err) {
      console.warn('Supabase settings query error:', err);
    }
  }

  const store = readLocalStore();
  return store.settings || INITIAL_CLINIC_SETTINGS;
}

export async function updateClinicSettings(settings: Partial<ClinicSettings>): Promise<ClinicSettings> {
  const store = readLocalStore();
  const current = store.settings || INITIAL_CLINIC_SETTINGS;
  const updated: ClinicSettings = {
    ...current,
    ...settings,
    updated_at: new Date().toISOString()
  };

  if (isServerSupabaseConfigured && supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('clinic_settings')
        .upsert(updated)
        .select()
        .single();

      if (!error && data) {
        store.settings = data as ClinicSettings;
        writeLocalStore(store);
        return data as ClinicSettings;
      }
    } catch (err) {
      console.warn('Supabase update settings error:', err);
    }
  }

  store.settings = updated;
  writeLocalStore(store);
  return updated;
}

// --------------------- SERVICES ---------------------

export async function getServices(): Promise<ServiceItem[]> {
  if (isServerSupabaseConfigured && supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('services')
        .select('*')
        .eq('active', true);

      if (!error && data && data.length > 0) {
        return data as ServiceItem[];
      }
    } catch (err) {
      console.warn('Supabase services query error:', err);
    }
  }

  const store = readLocalStore();
  return store.services || INITIAL_SERVICES;
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | null> {
  const services = await getServices();
  return services.find(s => s.slug === slug) || null;
}

export async function updateService(service: ServiceItem): Promise<ServiceItem> {
  const store = readLocalStore();
  const services = store.services || [];
  const idx = services.findIndex(s => s.id === service.id || s.slug === service.slug);
  if (idx !== -1) {
    services[idx] = { ...service, updated_at: new Date().toISOString() };
  } else {
    services.push({ ...service, created_at: new Date().toISOString() });
  }
  store.services = services;
  writeLocalStore(store);

  if (isServerSupabaseConfigured && supabaseAdmin) {
    try {
      await supabaseAdmin.from('services').upsert(service);
    } catch (err) {
      console.warn('Supabase upsert service error:', err);
    }
  }

  return service;
}

// --------------------- FAQS ---------------------

export async function getFAQs(): Promise<FAQItem[]> {
  if (isServerSupabaseConfigured && supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('faqs')
        .select('*')
        .eq('active', true);

      if (!error && data && data.length > 0) {
        return data as FAQItem[];
      }
    } catch (err) {
      console.warn('Supabase FAQs query error:', err);
    }
  }

  const store = readLocalStore();
  return store.faqs || INITIAL_FAQS;
}

export async function updateFAQ(faq: FAQItem): Promise<FAQItem> {
  const store = readLocalStore();
  const faqs = store.faqs || [];
  const idx = faqs.findIndex(f => f.id === faq.id);
  if (idx !== -1) {
    faqs[idx] = { ...faq, updated_at: new Date().toISOString() };
  } else {
    faqs.push({ ...faq, id: faq.id || `faq-${Date.now()}`, created_at: new Date().toISOString() });
  }
  store.faqs = faqs;
  writeLocalStore(store);

  if (isServerSupabaseConfigured && supabaseAdmin) {
    try {
      await supabaseAdmin.from('faqs').upsert(faq);
    } catch (err) {
      console.warn('Supabase upsert FAQ error:', err);
    }
  }

  return faq;
}

