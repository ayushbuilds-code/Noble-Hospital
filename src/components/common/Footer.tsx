import React, { useState } from 'react';
import { Heart, MapPin, Phone, Mail, Clock, ShieldCheck, ChevronRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0C2847] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#16A6A0] to-white/20 flex items-center justify-center text-white shadow-md">
                <Heart className="w-5 h-5 fill-white text-white" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white block leading-none">
                  NOBLE <span className="text-[#16A6A0]">HOSPITAL</span>
                </span>
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest block mt-0.5">
                  Multispeciality Healthcare
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Dedicated to clinical excellence, compassionate patient care, and modern healthcare facilities. Providing top-tier medical specialists across cardiology, orthopedics, pediatrics, and more.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-brand-teal-300 bg-brand-teal-950/60 border border-brand-teal-800/40 p-2.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 shrink-0 text-brand-teal-400" />
              <span>NABH & NABL standard compliant multispeciality facility</span>
            </div>
          </div>

          {/* Quick Links & Departments */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 tracking-wide">Key Departments</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => scrollTo('departments')} className="hover:text-brand-teal transition-colors flex items-center gap-1.5 text-slate-300">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-teal" /> Cardiology & Heart Care
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('departments')} className="hover:text-brand-teal transition-colors flex items-center gap-1.5 text-slate-300">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-teal" /> Orthopedics & Joint Replacement
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('departments')} className="hover:text-brand-teal transition-colors flex items-center gap-1.5 text-slate-300">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-teal" /> Pediatrics & Child Health
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('departments')} className="hover:text-brand-teal transition-colors flex items-center gap-1.5 text-slate-300">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-teal" /> Dermatology & Cosmetology
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('departments')} className="hover:text-brand-teal transition-colors flex items-center gap-1.5 text-slate-300">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-teal" /> Gynecology & Obstetrics
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('departments')} className="hover:text-brand-teal transition-colors flex items-center gap-1.5 text-slate-300">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-teal" /> General & Internal Medicine
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation & Patient Support */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 tracking-wide">Patient Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => scrollTo('neha-receptionist')} className="hover:text-brand-teal transition-colors flex items-center gap-1.5 text-slate-300">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-teal" /> Meet Neha (AI Receptionist)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('appointment-booking')} className="hover:text-brand-teal transition-colors flex items-center gap-1.5 text-slate-300">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-teal" /> Book Doctor Appointment
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('doctors')} className="hover:text-brand-teal transition-colors flex items-center gap-1.5 text-slate-300">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-teal" /> Find a Specialist Doctor
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('why-choose-us')} className="hover:text-brand-teal transition-colors flex items-center gap-1.5 text-slate-300">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-teal" /> Why Choose Noble Hospital
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('faqs')} className="hover:text-brand-teal transition-colors flex items-center gap-1.5 text-slate-300">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-teal" /> Patient FAQs & Guidelines
                </button>
              </li>
            </ul>
          </div>

          {/* Hospital Contact details */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-base mb-4 tracking-wide">Hospital Contact</h4>
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
              <span>153 Magarpatta Road, Hadapsar, Pune, Maharashtra 411028, India</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-brand-teal shrink-0" />
              <span>General: +91 (020) 2680-3000</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-red-400 shrink-0" />
              <span className="text-red-300 font-medium">Emergency: +91 (020) 2680-3999</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-brand-teal shrink-0" />
              <span>appointments@noblehospital.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-4 h-4 text-brand-teal shrink-0" />
              <span>OPD: 8:30 AM – 7:00 PM (Mon-Sat)</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Noble Hospital. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setModalType('privacy')}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setModalType('terms')}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Terms and Conditions
            </button>
            <a
              href="/admin"
              className="hover:text-brand-teal transition-colors"
            >
              Staff Portal
            </a>
          </div>
        </div>
      </div>

      {/* Privacy / Terms Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 text-slate-800 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-[#123B67] mb-4">
              {modalType === 'privacy' ? 'Noble Hospital - Privacy Policy' : 'Noble Hospital - Terms and Conditions'}
            </h3>
            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              {modalType === 'privacy' ? (
                <>
                  <p>At Noble Hospital, patient confidentiality and the security of medical information are of utmost priority. We adhere to applicable healthcare privacy standards and regulations.</p>
                  <p><strong>Data Collection:</strong> Patient name, contact telephone, email address, and appointment preferences are collected solely for facilitating consultations, clinic communications, and medical records management.</p>
                  <p><strong>Virtual Receptionist Interaction:</strong> Conversations with Neha, Noble Hospital's virtual assistant, are processed securely for appointment scheduling, routing patient inquiries to the relevant department, and improving service responsiveness.</p>
                  <p>We do not share, sell, or disclose your personal health information to unauthorized third-party commercial marketing entities.</p>
                </>
              ) : (
                <>
                  <p>Welcome to Noble Hospital. By using this online portal or interacting with our virtual services, you agree to these terms.</p>
                  <p><strong>Medical Consultations:</strong> Online appointment reservations are subject to specialist availability and emergency triage priorities. Official medical advice and diagnoses are delivered by licensed healthcare professionals during your in-person or telemedicine consultation.</p>
                  <p><strong>Emergency Notice:</strong> If you are experiencing a severe or life-threatening medical emergency (such as severe chest pain, loss of consciousness, or severe trauma), please dial +91 (020) 2680-3999 immediately or visit our 24/7 Emergency Department.</p>
                  <p><strong>Cancellations:</strong> Please provide at least 2 hours notice if you wish to reschedule or cancel a booked appointment.</p>
                </>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="px-5 py-2 text-sm font-semibold text-white bg-[#123B67] hover:bg-[#0C2847] rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

