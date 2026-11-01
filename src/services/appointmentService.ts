import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Department, Doctor, Appointment, TimeSlot } from '../types';
import { INITIAL_DEPARTMENTS, INITIAL_DOCTORS, INITIAL_APPOINTMENTS } from '../data/initialData';

const APPOINTMENTS_STORAGE_KEY = 'noble_hospital_appointments';
const DOCTORS_STORAGE_KEY = 'noble_hospital_doctors';
const DEPARTMENTS_STORAGE_KEY = 'noble_hospital_departments';

// Helper for local storage
const getStoredData = <T>(key: string, defaultData: T): T => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultData));
      return defaultData;
    }
    return JSON.parse(raw);
  } catch {
    return defaultData;
  }
};

const setStoredData = <T>(key: string, data: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Failed to write to localStorage for key: ${key}`, err);
  }
};

// Standard available hospital time slots
export const STANDARD_TIME_SLOTS = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:00 PM',
  '05:30 PM',
  '06:00 PM',
];

export const getDepartments = async (): Promise<Department[]> => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('departments')
        .select('*')
        .order('name');
      
      if (!error && data && data.length > 0) {
        return data.map((d: any) => ({
          id: d.id,
          name: d.name,
          slug: d.slug,
          description: d.description,
          icon: d.icon,
          headOfDepartment: d.head_of_department,
          contactPhone: d.contact_phone
        }));
      }
    } catch (err) {
      console.warn('Supabase fetch departments failed, using fallback:', err);
    }
  }

  return getStoredData(DEPARTMENTS_STORAGE_KEY, INITIAL_DEPARTMENTS);
};

export const getDoctors = async (departmentId?: string): Promise<Doctor[]> => {
  if (isSupabaseConfigured() && supabase) {
    try {
      let query = supabase.from('doctors').select('*');
      if (departmentId) {
        query = query.eq('department_id', departmentId);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data.map((doc: any) => ({
          id: doc.id,
          departmentId: doc.department_id,
          departmentName: doc.department_name || '',
          name: doc.name,
          qualification: doc.qualification,
          specialisation: doc.specialisation,
          experienceYears: doc.experience_years,
          consultationFee: doc.consultation_fee,
          availableTimings: doc.available_timings,
          availableDays: doc.available_days,
          imageUrl: doc.image_url,
          bio: doc.bio,
          rating: Number(doc.rating) || 4.9,
          reviewsCount: doc.reviews_count || 50,
          isActive: doc.is_active !== false
        }));
      }
    } catch (err) {
      console.warn('Supabase fetch doctors failed, using fallback:', err);
    }
  }

  const allDoctors = getStoredData(DOCTORS_STORAGE_KEY, INITIAL_DOCTORS);
  if (departmentId) {
    return allDoctors.filter(d => d.departmentId === departmentId && d.isActive);
  }
  return allDoctors.filter(d => d.isActive);
};

export const getAllDoctorsAdmin = async (): Promise<Doctor[]> => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('doctors').select('*');
      if (!error && data && data.length > 0) {
        return data.map((doc: any) => ({
          id: doc.id,
          departmentId: doc.department_id,
          departmentName: doc.department_name || '',
          name: doc.name,
          qualification: doc.qualification,
          specialisation: doc.specialisation,
          experienceYears: doc.experience_years,
          consultationFee: doc.consultation_fee,
          availableTimings: doc.available_timings,
          availableDays: doc.available_days,
          imageUrl: doc.image_url,
          bio: doc.bio,
          rating: Number(doc.rating) || 4.9,
          reviewsCount: doc.reviews_count || 50,
          isActive: doc.is_active !== false
        }));
      }
    } catch (err) {
      console.warn('Supabase admin fetch doctors failed, using fallback:', err);
    }
  }
  return getStoredData(DOCTORS_STORAGE_KEY, INITIAL_DOCTORS);
};

export const getAppointments = async (): Promise<Appointment[]> => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('appointment_date', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((a: any) => ({
          id: a.id,
          referenceNumber: a.reference_number,
          patientId: a.patient_id,
          patientName: a.patient_name,
          patientPhone: a.patient_phone,
          patientEmail: a.patient_email,
          doctorId: a.doctor_id,
          doctorName: a.doctor_name,
          departmentName: a.department_name,
          appointmentDate: a.appointment_date,
          appointmentTime: a.appointment_time,
          status: a.status,
          symptomsNotes: a.symptoms_notes,
          consultationFee: a.consultation_fee,
          createdAt: a.created_at
        }));
      }
    } catch (err) {
      console.warn('Supabase fetch appointments failed, using fallback:', err);
    }
  }
  return getStoredData(APPOINTMENTS_STORAGE_KEY, INITIAL_APPOINTMENTS);
};

export const verifySlotAvailability = async (
  doctorId: string,
  date: string,
  time: string
): Promise<{ available: boolean; reason?: string }> => {
  // Check Supabase if configured
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('id, status')
        .eq('doctor_id', doctorId)
        .eq('appointment_date', date)
        .eq('appointment_time', time)
        .neq('status', 'cancelled');

      if (!error && data && data.length > 0) {
        return { available: false, reason: 'This time slot is already booked for this specialist.' };
      }
    } catch (err) {
      console.warn('Supabase slot check fallback:', err);
    }
  }

  // Check local store
  const stored = getStoredData<Appointment[]>(APPOINTMENTS_STORAGE_KEY, INITIAL_APPOINTMENTS);
  const conflict = stored.find(
    a => a.doctorId === doctorId &&
         a.appointmentDate === date &&
         a.appointmentTime === time &&
         a.status !== 'cancelled'
  );

  if (conflict) {
    return { available: false, reason: 'This time slot has already been reserved. Please pick another time.' };
  }

  return { available: true };
};

export const getAvailableTimeSlots = async (doctorId: string, date: string): Promise<TimeSlot[]> => {
  const allAppointments = await getAppointments();
  const bookedTimes = new Set(
    allAppointments
      .filter(a => a.doctorId === doctorId && a.appointmentDate === date && a.status !== 'cancelled')
      .map(a => a.appointmentTime)
  );

  return STANDARD_TIME_SLOTS.map(slot => ({
    time: slot,
    isAvailable: !bookedTimes.has(slot),
    isBooked: bookedTimes.has(slot)
  }));
};

export interface BookingPayload {
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  departmentName: string;
  doctorId: string;
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  symptomsNotes?: string;
  consultationFee: number;
}

export const bookAppointment = async (payload: BookingPayload): Promise<{ success: boolean; appointment?: Appointment; error?: string }> => {
  // 1. Verify slot availability
  const check = await verifySlotAvailability(payload.doctorId, payload.appointmentDate, payload.appointmentTime);
  if (!check.available) {
    return { success: false, error: check.reason || 'Selected slot is no longer available.' };
  }

  // Generate unique hospital reference number: NH-YYYY-XXXX
  const randSeq = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  const referenceNumber = `NH-${year}-${randSeq}`;

  const newAppointment: Appointment = {
    id: `apt-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    referenceNumber,
    patientName: payload.patientName.trim(),
    patientPhone: payload.patientPhone.trim(),
    patientEmail: payload.patientEmail?.trim() || undefined,
    doctorId: payload.doctorId,
    doctorName: payload.doctorName,
    departmentName: payload.departmentName,
    appointmentDate: payload.appointmentDate,
    appointmentTime: payload.appointmentTime,
    status: 'confirmed',
    symptomsNotes: payload.symptomsNotes?.trim() || 'General consultation request',
    consultationFee: payload.consultationFee,
    createdAt: new Date().toISOString()
  };

  // Try writing to Supabase
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert({
          reference_number: newAppointment.referenceNumber,
          patient_name: newAppointment.patientName,
          patient_phone: newAppointment.patientPhone,
          patient_email: newAppointment.patientEmail,
          doctor_id: newAppointment.doctorId,
          doctor_name: newAppointment.doctorName,
          department_name: newAppointment.departmentName,
          appointment_date: newAppointment.appointmentDate,
          appointment_time: newAppointment.appointmentTime,
          status: newAppointment.status,
          symptoms_notes: newAppointment.symptomsNotes,
          consultation_fee: newAppointment.consultationFee
        })
        .select()
        .single();

      if (!error && data) {
        newAppointment.id = data.id;
      }
    } catch (err) {
      console.warn('Supabase insert appointment encountered error, falling back to local sync:', err);
    }
  }

  // Always update local store to ensure high reliability and immediate rendering
  const existing = getStoredData<Appointment[]>(APPOINTMENTS_STORAGE_KEY, INITIAL_APPOINTMENTS);
  setStoredData(APPOINTMENTS_STORAGE_KEY, [newAppointment, ...existing]);

  return { success: true, appointment: newAppointment };
};

export const updateAppointmentStatus = async (
  appointmentId: string,
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
): Promise<boolean> => {
  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase
        .from('appointments')
        .update({ status })
        .eq('id', appointmentId);
    } catch (err) {
      console.warn('Failed to update Supabase status:', err);
    }
  }

  const existing = getStoredData<Appointment[]>(APPOINTMENTS_STORAGE_KEY, INITIAL_APPOINTMENTS);
  const updated = existing.map(a => a.id === appointmentId ? { ...a, status } : a);
  setStoredData(APPOINTMENTS_STORAGE_KEY, updated);
  return true;
};

export const addDoctor = async (doctor: Omit<Doctor, 'id' | 'rating' | 'reviewsCount'>): Promise<Doctor> => {
  const newDoc: Doctor = {
    ...doctor,
    id: `doc-${Date.now()}`,
    rating: 5.0,
    reviewsCount: 1
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data } = await supabase
        .from('doctors')
        .insert({
          name: newDoc.name,
          department_id: newDoc.departmentId,
          qualification: newDoc.qualification,
          specialisation: newDoc.specialisation,
          experience_years: newDoc.experienceYears,
          consultation_fee: newDoc.consultationFee,
          available_timings: newDoc.availableTimings,
          available_days: newDoc.availableDays,
          image_url: newDoc.imageUrl,
          bio: newDoc.bio,
          is_active: newDoc.isActive
        })
        .select()
        .single();

      if (data) newDoc.id = data.id;
    } catch (err) {
      console.warn('Failed to insert doctor in Supabase:', err);
    }
  }

  const existing = getStoredData<Doctor[]>(DOCTORS_STORAGE_KEY, INITIAL_DOCTORS);
  setStoredData(DOCTORS_STORAGE_KEY, [...existing, newDoc]);
  return newDoc;
};

