-- =========================================================
-- NOBLE HOSPITAL DATABASE SCHEMA (Supabase PostgreSQL)
-- =========================================================

-- 1. Departments Table
CREATE TABLE IF NOT EXISTS public.departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    icon VARCHAR(50) NOT NULL,
    head_of_department VARCHAR(150),
    contact_phone VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Doctors Table
CREATE TABLE IF NOT EXISTS public.doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    name VARCHAR(150) NOT NULL,
    qualification VARCHAR(150) NOT NULL,
    specialisation VARCHAR(150) NOT NULL,
    experience_years INT NOT NULL DEFAULT 5,
    consultation_fee INT NOT NULL DEFAULT 600,
    available_timings VARCHAR(100) NOT NULL DEFAULT '09:00 AM - 01:00 PM',
    available_days VARCHAR(100) NOT NULL DEFAULT 'Monday - Saturday',
    image_url TEXT,
    bio TEXT,
    rating NUMERIC(2, 1) DEFAULT 4.9,
    reviews_count INT DEFAULT 42,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Patients Table
CREATE TABLE IF NOT EXISTS public.patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(150),
    gender VARCHAR(20),
    age INT,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Appointments Table
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_number VARCHAR(20) UNIQUE NOT NULL,
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    patient_name VARCHAR(150) NOT NULL,
    patient_phone VARCHAR(20) NOT NULL,
    patient_email VARCHAR(150),
    doctor_id UUID REFERENCES public.doctors(id) ON DELETE SET NULL,
    doctor_name VARCHAR(150) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time VARCHAR(20) NOT NULL,
    status VARCHAR(30) DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    symptoms_notes TEXT,
    consultation_fee INT NOT NULL DEFAULT 600,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Anonymous/Public Read Policies (Website visitors can view departments and doctors)
CREATE POLICY "Allow public read access to departments" ON public.departments FOR SELECT USING (true);
CREATE POLICY "Allow public read access to active doctors" ON public.doctors FOR SELECT USING (is_active = true);

-- Public can check appointments to prevent double-booking slot conflicts
CREATE POLICY "Allow public read appointments for slot verification" ON public.appointments FOR SELECT USING (true);

-- Public can book appointments (INSERT)
CREATE POLICY "Allow public insert appointments" ON public.appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert patients" ON public.patients FOR INSERT WITH CHECK (true);

-- Authenticated Admin Full Access Policies
CREATE POLICY "Allow authenticated full access to departments" ON public.departments FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access to doctors" ON public.doctors FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access to patients" ON public.patients FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access to appointments" ON public.appointments FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Sample Seed Data
INSERT INTO public.departments (name, slug, description, icon) VALUES
('Cardiology', 'cardiology', 'Comprehensive care for heart health, hypertension, coronary disorders and cardiac prevention.', 'Heart'),
('Dermatology', 'dermatology', 'Advanced clinical and cosmetic dermatology for skin health, hair rejuvenation and allergies.', 'Sparkles'),
('Orthopedics', 'orthopedics', 'Specialized treatment for joint replacements, spine care, sports injuries and fractures.', 'Bone'),
('Pediatrics', 'pediatrics', 'Holistic child care from newborns to adolescents, immunizations and development milestones.', 'Baby'),
('General Medicine', 'general-medicine', 'Primary healthcare, internal medicine, chronic disease management and comprehensive check-ups.', 'Stethoscope'),
('Gynecology', 'gynecology', 'Obstetrics, women health screenings, maternal wellness and minimally invasive surgeries.', 'UserCheck')
ON CONFLICT (slug) DO NOTHING;

