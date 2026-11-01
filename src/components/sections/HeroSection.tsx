import React from 'react';
import { Calendar, PhoneCall, ShieldCheck, Award, Users, Clock, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onBookAppointment: () => void;
  onTalkToNeha: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBookAppointment,
  onTalkToNeha
}) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-[#F0F5FA] via-[#F8FAFC] to-white pt-8 pb-16 lg:py-20">
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-teal-100/40 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-blue-100/50 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill announcement badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-teal/30 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand-teal animate-ping"></span>
              <span className="text-xs font-semibold text-[#123B67] tracking-wide flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
                Multispeciality Hospital & Research Center
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#123B67] tracking-tight leading-[1.12]">
              Your Health. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#123B67] via-[#16A6A0] to-[#16A6A0]">
                Our Priority.
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Compassionate care, experienced specialists and modern healthcare services, all under one roof.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onBookAppointment}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#123B67] to-[#16A6A0] hover:shadow-lg hover:shadow-brand-teal/25 hover:opacity-95 transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-[0.98]"
              >
                <Calendar className="w-5 h-5" />
                <span>Book an Appointment</span>
              </button>

              <button
                onClick={onTalkToNeha}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-[#123B67] bg-white border-2 border-[#123B67]/20 hover:border-[#16A6A0] hover:bg-[#F0FAF9] transition-all duration-200 flex items-center justify-center gap-2.5 shadow-sm active:scale-[0.98]"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <PhoneCall className="w-5 h-5 text-brand-teal" />
                <span>Talk to Neha</span>
              </button>
            </div>

            {/* Virtual Receptionist Quick Hint */}
            <p className="text-xs text-slate-500 flex items-center justify-center lg:justify-start gap-1.5">
              <span>Need quick assistance? Neha speaks Hindi, English & Hinglish to help you instantly.</span>
            </p>

            {/* Trust Metrics Bar */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 text-brand-teal mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-xs font-semibold text-slate-500">Patients</span>
                </div>
                <div className="text-xl font-bold text-[#123B67]">150,000+</div>
                <div className="text-[11px] text-slate-500">Treated with Care</div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 text-brand-teal mb-1">
                  <Award className="w-4 h-4" />
                  <span className="text-xs font-semibold text-slate-500">Specialists</span>
                </div>
                <div className="text-xl font-bold text-[#123B67]">45+</div>
                <div className="text-[11px] text-slate-500">Senior Doctors</div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 text-brand-teal mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-semibold text-slate-500">Emergency</span>
                </div>
                <div className="text-xl font-bold text-[#123B67]">24 / 7</div>
                <div className="text-[11px] text-slate-500">Immediate Trauma Care</div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 text-brand-teal mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-semibold text-slate-500">Accredited</span>
                </div>
                <div className="text-xl font-bold text-[#123B67]">NABH</div>
                <div className="text-[11px] text-slate-500">Quality Assured</div>
              </div>
            </div>
          </div>

          {/* Right Image & Floating Badge Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Hospital Doctor Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-soft-lg border-4 border-white bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
                  alt="Doctor at Noble Hospital examining patient chart"
                  className="w-full h-[450px] lg:h-[500px] object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#123B67]/70 via-transparent to-transparent"></div>
                
                {/* Overlay Text */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="inline-block px-2.5 py-1 rounded bg-[#16A6A0] text-xs font-bold uppercase tracking-wider mb-2">
                    Noble Hospital Campus
                  </span>
                  <p className="text-sm font-medium text-slate-100">
                    Modern diagnostic suites, state-of-the-art modular operation theaters, and ICU monitoring.
                  </p>
                </div>
              </div>

              {/* Floating Doctor Availability Card */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white p-3.5 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3 animate-pulse duration-1000">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#123B67]">OPD Slots Open Today</div>
                  <div className="text-[11px] text-emerald-600 font-semibold">Walk-in & Online Booking</div>
                </div>
              </div>

              {/* Floating Neha AI Receptionist Quick Card */}
              <div 
                onClick={onTalkToNeha}
                className="cursor-pointer absolute -bottom-5 -right-4 sm:-right-6 bg-white p-4 rounded-2xl shadow-xl border border-brand-teal/30 hover:border-brand-teal transition-all flex items-center gap-3.5 max-w-xs group"
              >
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                    alt="Neha virtual receptionist"
                    className="w-12 h-12 rounded-full object-cover border-2 border-brand-teal"
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white"></span>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#123B67] group-hover:text-brand-teal transition-colors">
                    Neha (Virtual Receptionist)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Voice Assistance in Hindi & English
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

