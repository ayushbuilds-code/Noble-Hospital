import { Department, Doctor, Appointment } from '../types';

export const INITIAL_DEPARTMENTS: Department[] = [
  {
    id: 'dept-1',
    name: 'Cardiology',
    slug: 'cardiology',
    description: 'Comprehensive cardiac care including preventive screenings, advanced ECG/Echocardiography, hypertension management, and heart health counseling.',
    icon: 'Heart',
    headOfDepartment: 'Dr. Rajesh Sharma',
    contactPhone: '+91 (020) 2680-3101'
  },
  {
    id: 'dept-2',
    name: 'Dermatology',
    slug: 'dermatology',
    description: 'Specialized clinical dermatology, hair and scalp treatments, acne therapies, allergic disorders, and modern laser skincare.',
    icon: 'Sparkles',
    headOfDepartment: 'Dr. Ananya Sen',
    contactPhone: '+91 (020) 2680-3102'
  },
  {
    id: 'dept-3',
    name: 'Orthopedics',
    slug: 'orthopedics',
    description: 'Advanced joint reconstruction, spine evaluations, fracture management, arthroscopy, and physical rehabilitation support.',
    icon: 'Activity',
    headOfDepartment: 'Dr. Vikram Malhotra',
    contactPhone: '+91 (020) 2680-3103'
  },
  {
    id: 'dept-4',
    name: 'Pediatrics',
    slug: 'pediatrics',
    description: 'Dedicated child healthcare ranging from newborn care, vaccination schedules, pediatric developmental assessments, and acute illness treatment.',
    icon: 'Smile',
    headOfDepartment: 'Dr. Meera Kulkarni',
    contactPhone: '+91 (020) 2680-3104'
  },
  {
    id: 'dept-5',
    name: 'General Medicine',
    slug: 'general-medicine',
    description: 'Holistic primary care, infectious diseases, diabetic management, thyroid disorders, and routine preventive health evaluations.',
    icon: 'Stethoscope',
    headOfDepartment: 'Dr. Arvind Joshi',
    contactPhone: '+91 (020) 2680-3105'
  },
  {
    id: 'dept-6',
    name: 'Gynecology & Obstetrics',
    slug: 'gynecology',
    description: 'Compassionate women health care, prenatal & antenatal supervision, fertility counseling, menopause care, and routine gynecological screenings.',
    icon: 'ShieldCheck',
    headOfDepartment: 'Dr. Sunita Deshmukh',
    contactPhone: '+91 (020) 2680-3106'
  }
];

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    departmentId: 'dept-1',
    departmentName: 'Cardiology',
    name: 'Dr. Rajesh Sharma',
    qualification: 'MD, DM (Cardiology), FACC',
    specialisation: 'Senior Interventional Cardiologist',
    experienceYears: 18,
    consultationFee: 1000,
    availableTimings: '09:00 AM - 01:00 PM',
    availableDays: 'Monday, Wednesday, Friday',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    bio: 'Over 18 years of experience in preventative and interventional cardiology with over 4,000 successful procedures.',
    rating: 4.9,
    reviewsCount: 128,
    isActive: true
  },
  {
    id: 'doc-2',
    departmentId: 'dept-1',
    departmentName: 'Cardiology',
    name: 'Dr. Priya Nambiar',
    qualification: 'MD, DNB (Cardiology)',
    specialisation: 'Cardiovascular Consultant & Heart Rhythm Specialist',
    experienceYears: 12,
    consultationFee: 900,
    availableTimings: '02:00 PM - 06:00 PM',
    availableDays: 'Tuesday, Thursday, Saturday',
    imageUrl: 'https://images.unsplash.com/photo-1594824813633-8743d414e0f6?auto=format&fit=crop&w=600&q=80',
    bio: 'Specialist in non-invasive imaging, arrhythmias, hypertension control, and lifestyle heart wellness.',
    rating: 4.8,
    reviewsCount: 94,
    isActive: true
  },
  {
    id: 'doc-3',
    departmentId: 'dept-2',
    departmentName: 'Dermatology',
    name: 'Dr. Ananya Sen',
    qualification: 'MBBS, MD (Dermatology, Venereology & Leprosy)',
    specialisation: 'Consultant Dermatologist & Aesthetic Specialist',
    experienceYears: 11,
    consultationFee: 800,
    availableTimings: '10:00 AM - 02:00 PM',
    availableDays: 'Monday - Friday',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    bio: 'Expert in clinical dermatology, chronic eczema, psoriasis, acne scar treatments, and advanced laser protocols.',
    rating: 4.9,
    reviewsCount: 156,
    isActive: true
  },
  {
    id: 'doc-4',
    departmentId: 'dept-3',
    departmentName: 'Orthopedics',
    name: 'Dr. Vikram Malhotra',
    qualification: 'MS (Orthopedics), MCh (Ortho, UK)',
    specialisation: 'Joint Replacement & Arthroscopy Surgeon',
    experienceYears: 16,
    consultationFee: 950,
    availableTimings: '09:30 AM - 01:30 PM',
    availableDays: 'Monday, Wednesday, Friday',
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    bio: 'Specialized in minimally invasive knee and hip replacements, ligament repair, and sports injury recovery.',
    rating: 4.9,
    reviewsCount: 110,
    isActive: true
  },
  {
    id: 'doc-5',
    departmentId: 'dept-4',
    departmentName: 'Pediatrics',
    name: 'Dr. Meera Kulkarni',
    qualification: 'MBBS, DCH, DNB (Pediatrics)',
    specialisation: 'Senior Pediatrician & Child Health Consultant',
    experienceYears: 14,
    consultationFee: 750,
    availableTimings: '11:00 AM - 03:00 PM',
    availableDays: 'Monday - Saturday',
    imageUrl: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=600&q=80',
    bio: 'Caring pediatrician passionate about early childhood development, vaccinations, nutritional guidance, and pediatric infections.',
    rating: 5.0,
    reviewsCount: 178,
    isActive: true
  },
  {
    id: 'doc-6',
    departmentId: 'dept-5',
    departmentName: 'General Medicine',
    name: 'Dr. Arvind Joshi',
    qualification: 'MBBS, MD (General Medicine)',
    specialisation: 'Internal Medicine & Critical Care Physician',
    experienceYears: 20,
    consultationFee: 700,
    availableTimings: '08:30 AM - 12:30 PM',
    availableDays: 'Monday - Saturday',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
    bio: 'Senior physician with two decades of experience managing complex lifestyle disorders, diabetes, and geriatrics.',
    rating: 4.8,
    reviewsCount: 204,
    isActive: true
  },
  {
    id: 'doc-7',
    departmentId: 'dept-6',
    departmentName: 'Gynecology & Obstetrics',
    name: 'Dr. Sunita Deshmukh',
    qualification: 'MBBS, MS (Obstetrics & Gynecology)',
    specialisation: 'Senior Gynecologist & High-Risk Pregnancy Specialist',
    experienceYears: 17,
    consultationFee: 900,
    availableTimings: '02:30 PM - 06:30 PM',
    availableDays: 'Monday - Friday',
    imageUrl: 'https://images.unsplash.com/photo-1594824813633-8743d414e0f6?auto=format&fit=crop&w=600&q=80',
    bio: 'Specialized in high-risk pregnancy management, painless deliveries, lap gynecological surgeries, and women hormonal wellness.',
    rating: 4.9,
    reviewsCount: 165,
    isActive: true
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    referenceNumber: 'NH-2026-4891',
    patientName: 'Rohan Verma',
    patientPhone: '+91 98220 14852',
    patientEmail: 'rohan.verma@example.com',
    doctorId: 'doc-1',
    doctorName: 'Dr. Rajesh Sharma',
    departmentName: 'Cardiology',
    appointmentDate: new Date().toISOString().split('T')[0],
    appointmentTime: '10:00 AM',
    status: 'confirmed',
    symptomsNotes: 'Routine follow-up for blood pressure tracking and ECG review.',
    consultationFee: 1000,
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'apt-102',
    referenceNumber: 'NH-2026-4892',
    patientName: 'Sunita Patel',
    patientPhone: '+91 97654 32189',
    patientEmail: 'sunita.patel@example.com',
    doctorId: 'doc-3',
    doctorName: 'Dr. Ananya Sen',
    departmentName: 'Dermatology',
    appointmentDate: new Date().toISOString().split('T')[0],
    appointmentTime: '11:30 AM',
    status: 'pending',
    symptomsNotes: 'Persistent skin rash and allergy flare up on forearms.',
    consultationFee: 800,
    createdAt: new Date(Date.now() - 43200000).toISOString()
  },
  {
    id: 'apt-103',
    referenceNumber: 'NH-2026-4893',
    patientName: 'Amitabh Sen',
    patientPhone: '+91 98811 54321',
    patientEmail: 'amitabh.sen@example.com',
    doctorId: 'doc-4',
    doctorName: 'Dr. Vikram Malhotra',
    departmentName: 'Orthopedics',
    appointmentDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    appointmentTime: '10:30 AM',
    status: 'confirmed',
    symptomsNotes: 'Right knee stiffness after jogging, requesting joint assessment.',
    consultationFee: 950,
    createdAt: new Date().toISOString()
  }
];

export const FAQ_DATA = [
  {
    id: 'faq-1',
    question: 'How do I book an appointment at Noble Hospital?',
    answer: 'You can book an appointment directly through our online appointment booking form on this website, or by speaking with Neha, our AI voice receptionist, or by calling our reception helpline at +91 (020) 2680-3000.'
  },
  {
    id: 'faq-2',
    question: 'Who is Neha and how can she assist me?',
    answer: 'Neha is Noble Hospital\'s female virtual receptionist. Powered by conversational AI, she can help you explore departments, learn about doctors and their available timings, schedule consultations, and answer general hospital queries in English, Hindi, or Hinglish.'
  },
  {
    id: 'faq-3',
    question: 'What are the standard OPD consultation timings at Noble Hospital?',
    answer: 'Outpatient consultation timings run from Monday through Saturday, 08:30 AM to 07:00 PM across departments. Emergency services and acute trauma care operate 24 hours a day, 7 days a week.'
  },
  {
    id: 'faq-4',
    question: 'Can I reschedule or cancel my appointment?',
    answer: 'Yes. Appointments can be rescheduled or cancelled up to 2 hours prior to your scheduled consultation time. You can contact our support desk with your unique Reference Number (e.g. NH-2026-XXXX) or manage it via our hospital desk.'
  },
  {
    id: 'faq-5',
    question: 'What documents should I bring for my first doctor consultation?',
    answer: 'Please bring a valid photo ID, your Noble Hospital appointment reference number, any prior medical records/prescriptions, and relevant diagnostic reports (ECG, blood reports, or X-rays).'
  },
  {
    id: 'faq-6',
    question: 'Does Noble Hospital accept cashless health insurance (TPA)?',
    answer: 'Yes, Noble Hospital has a dedicated 24/7 TPA & Insurance Helpdesk that facilitates cashless claims and pre-authorizations with all major insurance providers and government health schemes.'
  }
];

