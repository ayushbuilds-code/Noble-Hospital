import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  Sparkles,
  ShieldCheck,
  Copy,
  Printer,
  Users,
  X,
  RefreshCw
} from 'lucide-react';
import { Doctor, Department, Appointment, TimeSlot } from '../../types';
import {
  getDepartments,
  getDoctors,
  getAvailableTimeSlots,
  bookAppointment
} from '../../services/appointmentService';

interface BookingSectionProps {
  preselectedDoctor?: Doctor | null;
  onClearPreselectedDoctor?: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  preselectedDoctor,
  onClearPreselectedDoctor
}) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);

  // Form inputs
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [selectedDeptName, setSelectedDeptName] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0] // Default tomorrow
  );
  const [appointmentTime, setAppointmentTime] = useState('');
  const [symptomsNotes, setSymptomsNotes] = useState('');

  // Slot verification state
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Load initial departments & doctors
  useEffect(() => {
    Promise.all([getDepartments(), getDoctors()]).then(([depts, docs]) => {
      setDepartments(depts);
      setDoctors(docs);
      if (depts.length > 0 && !selectedDeptName) {
        setSelectedDeptName(depts[0].name);
      }
    });
  }, []);

  // Sync when preselected doctor changes from Doctors section
  useEffect(() => {
    if (preselectedDoctor) {
      setSelectedDeptName(preselectedDoctor.departmentName);
      setSelectedDoctorId(preselectedDoctor.id);
    }
  }, [preselectedDoctor]);

  // Update doctor options when department changes
  useEffect(() => {
    if (selectedDeptName) {
      const match = doctors.filter(
        (d) => d.departmentName.toLowerCase() === selectedDeptName.toLowerCase()
      );
      setFilteredDoctors(match);

      // If current doctor not in department, pick first available
      if (!match.some((d) => d.id === selectedDoctorId)) {
        setSelectedDoctorId(match[0]?.id || '');
      }
    }
  }, [selectedDeptName, doctors]);

  // Fetch available slots whenever doctor or date changes
  useEffect(() => {
    if (selectedDoctorId && appointmentDate) {
      setLoadingSlots(true);
      getAvailableTimeSlots(selectedDoctorId, appointmentDate)
        .then((slots) => {
          setTimeSlots(slots);
          // Auto select first available slot if current not available
          const available = slots.filter((s) => s.isAvailable);
          if (available.length > 0 && !slots.some((s) => s.time === appointmentTime && s.isAvailable)) {
            setAppointmentTime(available[0].time);
          }
        })
        .finally(() => setLoadingSlots(false));
    }
  }, [selectedDoctorId, appointmentDate]);

  const selectedDoctorObj = doctors.find((d) => d.id === selectedDoctorId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError(null);

    if (!selectedDoctorObj) {
      setBookingError('Please select a doctor to proceed.');
      return;
    }
    if (!appointmentTime) {
      setBookingError('Please select an available consultation time slot.');
      return;
    }
    if (patientPhone.replace(/\D/g, '').length < 10) {
      setBookingError('Please provide a valid 10-digit mobile number.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await bookAppointment({
        patientName,
        patientPhone,
        patientEmail: patientEmail || undefined,
        departmentName: selectedDeptName,
        doctorId: selectedDoctorObj.id,
        doctorName: selectedDoctorObj.name,
        appointmentDate,
        appointmentTime,
        symptomsNotes,
        consultationFee: selectedDoctorObj.consultationFee
      });

      if (res.success && res.appointment) {
        setConfirmedAppointment(res.appointment);
      } else {
        setBookingError(res.error || 'Failed to confirm appointment. Please choose another slot.');
      }
    } catch (err: any) {
      setBookingError(err.message || 'Error communicating with booking system.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyReference = () => {
    if (confirmedAppointment) {
      navigator.clipboard.writeText(confirmedAppointment.referenceNumber);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const resetForm = () => {
    setConfirmedAppointment(null);
    setPatientName('');
    setPatientPhone('');
    setPatientEmail('');
    setSymptomsNotes('');
    if (onClearPreselectedDoctor) onClearPreselectedDoctor();
  };

  return (
    <section id="appointment-booking" className="py-20 bg-gradient-to-b from-[#F8FAFC] to-[#F0F5FA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#EBF3FA] text-[#123B67] text-xs font-bold uppercase tracking-wider">
            Online Outpatient Scheduling
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123B67] tracking-tight">
            Book an In-Hospital Appointment
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Verify real-time doctor availability and secure your consultation slot with immediate digital confirmation.
          </p>
        </div>

        {/* Confirmation Modal / Card if already booked */}
        {confirmedAppointment ? (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-emerald-200 shadow-soft-lg text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-5">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              Appointment Confirmed
            </span>

            <h3 className="text-2xl font-extrabold text-[#123B67]">
              Thank You, {confirmedAppointment.patientName}!
            </h3>

            <p className="text-sm text-slate-600 mt-2">
              Your consultation has been reserved in Noble Hospital's records. A confirmation SMS will be dispatched to <strong className="text-slate-800">{confirmedAppointment.patientPhone}</strong>.
            </p>

            {/* Reference Slip Card */}
            <div className="my-8 p-6 bg-[#F8FAFC] rounded-2xl border border-slate-200 text-left space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Reference Slip</span>
                <button
                  onClick={handleCopyReference}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-teal hover:underline"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedRef ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Reference No:</span>
                  <span className="font-mono font-bold text-base text-[#123B67]">{confirmedAppointment.referenceNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Consultation Fee:</span>
                  <span className="font-bold text-base text-[#16A6A0]">₹{confirmedAppointment.consultationFee}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Specialist Doctor:</span>
                  <span className="font-semibold text-slate-800">{confirmedAppointment.doctorName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Department:</span>
                  <span className="font-semibold text-slate-800">{confirmedAppointment.departmentName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Appointment Date:</span>
                  <span className="font-semibold text-slate-800">{confirmedAppointment.appointmentDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Reserved Slot:</span>
                  <span className="font-semibold text-slate-800">{confirmedAppointment.appointmentTime}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 flex items-center justify-center gap-2 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Slip</span>
              </button>
              <button
                onClick={resetForm}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#123B67] to-[#16A6A0] hover:opacity-95 shadow transition-all"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        ) : (
          /* Main Interactive Booking Form */
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-soft-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Doctor Selection Header if preselected */}
              {preselectedDoctor && selectedDoctorObj && (
                <div className="p-4 rounded-2xl bg-[#F0FAF9] border border-brand-teal/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedDoctorObj.imageUrl}
                      alt={selectedDoctorObj.name}
                      className="w-12 h-12 rounded-xl object-cover border border-brand-teal shrink-0 shadow-sm"
                    />
                    <div>
                      <span className="text-[10px] font-bold text-brand-teal uppercase tracking-wider block">Selected Specialist</span>
                      <h4 className="text-sm font-bold text-[#123B67]">{selectedDoctorObj.name}</h4>
                      <p className="text-[11px] text-slate-500">{selectedDoctorObj.specialisation} • Fee: ₹{selectedDoctorObj.consultationFee}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => {
                        if (onClearPreselectedDoctor) onClearPreselectedDoctor();
                        const docSection = document.getElementById('doctors');
                        if (docSection) {
                          docSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#123B67] bg-white border border-brand-teal/30 hover:bg-brand-teal-50 hover:border-brand-teal transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                      title="Browse our specialists directory"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-brand-teal" />
                      <span>Change Doctor</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (onClearPreselectedDoctor) onClearPreselectedDoctor();
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Clear selection banner"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Department & Doctor Selectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedDeptName}
                    onChange={(e) => {
                      setSelectedDeptName(e.target.value);
                      if (preselectedDoctor && e.target.value !== preselectedDoctor.departmentName) {
                        if (onClearPreselectedDoctor) onClearPreselectedDoctor();
                      }
                    }}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal focus:bg-white font-medium transition-all"
                  >
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.name}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Specialist Doctor <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedDoctorId}
                    onChange={(e) => {
                      setSelectedDoctorId(e.target.value);
                      if (preselectedDoctor && e.target.value !== preselectedDoctor.id) {
                        if (onClearPreselectedDoctor) onClearPreselectedDoctor();
                      }
                    }}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal focus:bg-white font-medium transition-all"
                  >
                    {filteredDoctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} ({doc.specialisation}) - ₹{doc.consultationFee}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time Slot Availability Picker */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal focus:bg-white font-medium transition-all"
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">OPD is open Monday through Saturday.</span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Available Time Slot <span className="text-red-500">*</span>
                    </label>
                    {loadingSlots && (
                      <span className="text-[11px] text-brand-teal font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3 animate-spin" /> Checking slots...
                      </span>
                    )}
                  </div>

                  {/* Interactive slot grid */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-40 overflow-y-auto p-1.5 border border-slate-200 rounded-xl bg-slate-50">
                    {timeSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot.time}
                        disabled={!slot.isAvailable}
                        onClick={() => setAppointmentTime(slot.time)}
                        className={`py-2 px-2 rounded-lg text-xs font-medium transition-all text-center ${
                          appointmentTime === slot.time
                            ? 'bg-[#123B67] text-white shadow font-bold'
                            : slot.isAvailable
                            ? 'bg-white text-slate-700 hover:border-brand-teal border border-slate-200'
                            : 'bg-slate-200/60 text-slate-400 line-through cursor-not-allowed border border-transparent'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    {appointmentTime ? `Selected slot: ${appointmentTime}` : 'Choose from available timings'}
                  </span>
                </div>
              </div>

              {/* Patient Personal Details */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-sm font-bold text-[#123B67] mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-brand-teal" />
                  Patient Details
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kadam"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-slate-400">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="patient@example.com"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Symptoms or Consultation Reason <span className="text-slate-400">(Optional)</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Briefly describe your symptoms (e.g. joint ache, persistent fever, routine follow-up)..."
                    value={symptomsNotes}
                    onChange={(e) => setSymptomsNotes(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                  ></textarea>
                </div>
              </div>

              {/* Error notice if slot occupied */}
              {bookingError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{bookingError}</span>
                </div>
              )}

              {/* Submit CTA Bar */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-brand-teal" />
                  <span>Verified live slot confirmation directly into hospital records</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#123B67] to-[#16A6A0] hover:opacity-95 shadow-md shadow-brand-blue/20 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{submitting ? 'Verifying & Confirming...' : 'Confirm Appointment'}</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </section>
  );
};

