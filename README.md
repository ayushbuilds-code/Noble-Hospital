# Noble Hospital - Multispeciality Healthcare Website

A modern, responsive, production-ready healthcare web application for **Noble Hospital**, featuring **Neha**, the hospital's virtual female AI receptionist powered by Bolna AI voice calling SDK, Supabase database integration, and an administrative clinical dashboard.

---

## 🏥 Hospital Overview
- **Hospital Name:** Noble Hospital
- **Specialities:** Cardiology, Dermatology, Orthopedics, Pediatrics, General Medicine, Gynecology & Obstetrics
- **Virtual AI Receptionist:** Neha (Natural voice assistant supporting Hindi, English, and Hinglish)
- **Emergency Hotline:** +91 (020) 2680-3999 (24/7)
- **General Reception:** +91 (020) 2680-3000

---

## 🚀 Technology Stack
- **Frontend Framework:** React 18 with TypeScript & Vite
- **Styling:** Tailwind CSS (Deep Medical Blue `#123B67`, Teal `#16A6A0`, and subtle healthcare shadows)
- **Icons:** Lucide React
- **Voice Agent:** `@bolna/web-call` SDK (WebRTC audio, SIP.js session minting)
- **Database:** Supabase PostgreSQL client (`@supabase/supabase-js`) with offline-resilient local sync fallback
- **Routing:** React Router v6

---

## 📋 Website Sections
1. **Header & Navigation:** 24/7 emergency hotline, hospital brand logo, quick navigation, "Talk to Neha" pill, and "Book Appointment" CTA.
2. **Hero Section:** "Your Health. Our Priority." with dual action triggers and key hospital trust indicators.
3. **About Us:** Mission, 250+ bed facility details, multidisciplinary collaborative model.
4. **Meet Neha – Virtual Hospital Receptionist:**
   - Female assistant avatar with soundwave visualizer & live audio volume meter.
   - Multilingual support indicators: Hindi, English, and Hinglish.
   - Microphone permission preflight test & transparent connection states (`idle`, `connecting`, `ringing`, `active`, `ended`).
   - Bolna configuration modal to connect your live agent with one click.
5. **Departments:** Cards for Cardiology, Dermatology, Orthopedics, Pediatrics, General Medicine, and Gynecology.
6. **Our Doctors:** Profile cards with real photos, experience, timings, consultation fees, and instant booking trigger.
7. **Clinical Services:** Emergency & Trauma, ICU/CCU, In-hospital 24h Pharmacy, Automated Pathology, and Inpatient suites.
8. **Appointment Booking:**
   - Interactive date & real-time available time slot picker.
   - Slot conflict verification against Supabase records before booking.
   - Digital printable reference slip with copyable code (`NH-YYYY-XXXX`).
9. **Why Choose Noble Hospital:** Patient-focused care, experienced clinicians, multi-specialities, convenient booking, and modern infrastructure.
10. **FAQs:** Interactive accordion answering appointment scheduling, OPD hours, cancellations, and Neha's capabilities.
11. **Contact & Location:** Configurable address, phone numbers, Google Map embed, and online inquiry form.
12. **Footer:** Comprehensive sitemap, emergency contacts, Terms, and Privacy Policy modal.

---

## 🔒 Admin Dashboard (`/admin`)
- **Login Credentials:**
  - **Email:** `admin@noblehospital.com`
  - **Password:** `admin123`
- **Dashboard Features:**
  - Real-time KPIs: Total appointments, Today's appointments, Upcoming consultations, Active doctors.
  - Appointment Management: Filter by status, search by patient/doctor/phone, toggle status (Confirmed, Done, Cancelled).
  - Doctor Directory: View doctors, add new specialist with custom fee, qualifications, and timings.
  - Patient Registry: Patient contact list, visit history, and booking frequency.
  - Supabase Database Configuration: Configure Supabase URL & public Anon Key directly in the UI.

---

## ⚙️ Environment Configuration

Create a `.env` file in the root folder (or use `.env.example`):

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...

# Bolna Voice Agent Configuration
BOLNA_API_KEY=bn-your-bolna-api-key
BOLNA_AGENT_ID=your-agent-id
```

> **Note:** You can also configure Bolna and Supabase directly via the in-app modal without touching files!

---

## 🗄️ Database Setup (Supabase)
To set up tables and Row-Level Security in Supabase:
1. Open your Supabase Dashboard.
2. Go to **SQL Editor**.
3. Copy and run the queries in `supabase_schema.sql`.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

