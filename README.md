# Islamabad Dental Clinic — Production Website

A complete, production-ready, human-designed web application and management dashboard for **Islamabad Dental Clinic**, located in D-17 Islamabad, Pakistan.

---

## 🏥 Business Profile

* **Business Name:** Islamabad Dental Clinic
* **Category:** Dental Clinic / Oral Healthcare
* **Location:** Ground Floor, Executive Arcade, near Islamabad Mart, Markaz Margalla View, D-17, Islamabad, Pakistan
* **Phone:** `0318 5446951`
* **WhatsApp:** `+92 318 5446951` (`923185446951`)
* **Google Rating:** `4.9 / 5.0`
* **Google Reviews:** `174+`
* **Status:** Open until 10:00 PM daily

### Listed Dental Services

1. **Teeth Whitening** — Professional shade brightening and stain removal
2. **Root Canal Treatment** — Infection clearance, nerve treatment, and natural tooth preservation
3. **Tooth Extraction** — Gentle removal of damaged or impacted teeth
4. **Tooth Filling** — Tooth-colored composite restorations
5. **Zirconia Crown** — High-strength aesthetic crowns
6. **PFM Crown** — Porcelain-Fused-to-Metal crowns
7. **Dental Implant** — Titanium post replacement for missing teeth
8. **Braces** — Orthodontic teeth alignment

---

## 🛠️ Technology Stack

* **Framework:** Next.js 15+ (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (Modern, accessible, high contrast)
* **Icons:** `lucide-react`
* **Database & Persistence:** Supabase (PostgreSQL with RLS) + Zero-Config In-Memory Fallback Adapter
* **SEO & Structured Data:** `Dentist`, `MedicalBusiness`, `Service`, `FAQPage`, and `BreadcrumbList` JSON-LD schemas
* **Deployment Target:** Vercel

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
npm install
```

### 2. Environment Variables Configuration

Copy the sample environment file:

```bash
cp .env.example .env.local
```

Fill in your configuration:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Clinic Business Defaults
NEXT_PUBLIC_CLINIC_PHONE="0318 5446951"
NEXT_PUBLIC_CLINIC_WHATSAPP="923185446951"

# Admin Authentication
ADMIN_EMAIL="admin@dentalsmile.pk"
ADMIN_PASSWORD="YourSecurePasswordHere"
ADMIN_SESSION_SECRET="your-32-character-session-secret"
```

> **Note:** If Supabase credentials are not provided, the application gracefully operates using its robust in-memory database adapter, making local testing and previewing immediate and seamless.

### 3. Database Migration (Supabase)

To connect Supabase:
1. Create a new project in [Supabase](https://supabase.com).
2. Navigate to the **SQL Editor**.
3. Copy and run the SQL migration located at `supabase/migrations/20260831_init_schema.sql`.
4. Copy your Supabase URL, Anon Key, and Service Role Key to `.env.local` or Vercel Environment Variables.

### 4. Run Development Server

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

---

## 🔐 Admin Dashboard

Access the secure staff portal at `/admin` (or `/admin/login`).

* **Default Admin Email:** `admin@islamabaddentalclinic.pk`
* **Default Initial Password:** `IslamabadDental2026!` (configurable via `ADMIN_PASSWORD`)

### Features in Admin:
* **Real-Time Appointment Management:** View, search, filter by status (`new`, `pending`, `confirmed`, `completed`, `cancelled`), and update appointments.
* **Direct Patient WhatsApp Button:** One-click opens a pre-composed WhatsApp message with the patient regarding their specific requested time slot and procedure.
* **Service Manager:** Enable/disable services or edit their public descriptions.
* **Clinic Settings CMS:** Modify business hours, address, phone number, hero copy, and Google review counts without modifying code.
* **FAQ Manager:** Add, edit, or remove patient FAQ items.

---

## 📈 Local SEO & Schema Implementations

* **Local Schema Markup (`Dentist` / `MedicalBusiness`):** Includes exact geolocation coordinates (`33.6844`, `72.8711`), opening hours, telephone, price range, and address in D-17 Islamabad.
* **Service Schemas (`MedicalProcedure`):** Attached dynamically to every `/services/[slug]` route.
* **FAQ Schema (`FAQPage`):** Attached to `/faq` and homepage for search rich snippets.
* **Automated XML Sitemap:** Available at `/sitemap.xml`.
* **Search Engine Directive:** Available at `/robots.txt`.

---

## 🚢 Deploying to Vercel

1. Push this repository to GitHub or GitLab.
2. Import the repository into your [Vercel Dashboard](https://vercel.com).
3. Add the environment variables from `.env.example` to Vercel Project Settings.
4. Click **Deploy**. Vercel will automatically build and optimize the Next.js application.

---

© 2026 Islamabad Dental Clinic. Built for patient trust and high-conversion oral healthcare.
