export interface Department {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  headOfDepartment?: string;
  contactPhone?: string;
}

export interface Doctor {
  id: string;
  departmentId: string;
  departmentName: string;
  name: string;
  qualification: string;
  specialisation: string;
  experienceYears: number;
  consultationFee: number;
  availableTimings: string;
  availableDays: string;
  imageUrl: string;
  bio: string;
  rating: number;
  reviewsCount: number;
  isActive: boolean;
}

export interface Patient {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  gender?: string;
  age?: number;
  address?: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  referenceNumber: string;
  patientId?: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  doctorId: string;
  doctorName: string;
  departmentName: string;
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // e.g. "10:30 AM"
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  symptomsNotes?: string;
  consultationFee: number;
  createdAt: string;
}

export interface TimeSlot {
  time: string;
  isAvailable: boolean;
  isBooked: boolean;
}

export type BolnaCallState = 'idle' | 'requesting-permission' | 'connecting' | 'ringing' | 'active' | 'ended' | 'error';

