import React from 'react';
import { ShieldCheck, Heart, Users, Activity, Check } from 'lucide-react';

export const AboutUsSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-soft-lg border-4 border-slate-50">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
                alt="Noble Hospital state-of-the-art corridor"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#123B67]/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-widest text-brand-teal-300 font-bold block mb-1">
                  Our Mission
                </span>
                <p className="text-base font-semibold text-white leading-snug">
                  "To deliver clinical excellence with human compassion, providing accessible high-standard healthcare for every patient."
                </p>
              </div>
            </div>

            {/* Inset badge */}
            <div className="absolute -bottom-6 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-teal-50 flex items-center justify-center text-[#16A6A0]">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <span className="text-lg font-extrabold text-[#123B67] block leading-tight">250+ Beds</span>
                <span className="text-xs text-slate-500">Fully Equipped Facility</span>
              </div>
            </div>
          </div>

          {/* Right Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#EBF3FA] text-[#123B67] text-xs font-bold uppercase tracking-wider">
              About Noble Hospital
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123B67] tracking-tight">
              A Multispeciality Center Dedicated to Healing and Hope
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Established with the vision of offering dependable, comprehensive medical care, Noble Hospital brings together senior clinicians, modern medical equipment, and an empathetic nursing staff to serve the community.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/80">
                <div className="flex items-center gap-2 text-[#123B67] font-bold text-sm mb-1">
                  <Check className="w-4 h-4 text-brand-teal" />
                  Multidisciplinary Expertise
                </div>
                <p className="text-xs text-slate-500">
                  Collaborative care models ensuring cross-departmental reviews for complex clinical cases.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/80">
                <div className="flex items-center gap-2 text-[#123B67] font-bold text-sm mb-1">
                  <Check className="w-4 h-4 text-brand-teal" />
                  Transparent Healthcare
                </div>
                <p className="text-xs text-slate-500">
                  Ethical medical counseling, clearly defined consultation schedules, and no hidden charges.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/80">
                <div className="flex items-center gap-2 text-[#123B67] font-bold text-sm mb-1">
                  <Check className="w-4 h-4 text-brand-teal" />
                  24/7 Acute Services
                </div>
                <p className="text-xs text-slate-500">
                  Continuous casualty triage, fully stocked round-the-clock pharmacy, and rapid diagnostic laboratory.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/80">
                <div className="flex items-center gap-2 text-[#123B67] font-bold text-sm mb-1">
                  <Check className="w-4 h-4 text-brand-teal" />
                  Virtual Voice Reception
                </div>
                <p className="text-xs text-slate-500">
                  Meet Neha, our AI voice receptionist ready to guide you anytime in English, Hindi, and Hinglish.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <a
                href="#appointment-booking"
                className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-[#123B67] hover:bg-[#0C2847] transition-colors"
              >
                Schedule a Consultation
              </a>
              <a
                href="#doctors"
                className="px-6 py-3 rounded-xl font-bold text-xs text-[#123B67] bg-[#F0F5FA] hover:bg-[#E2EDF8] transition-colors"
              >
                View Specialists List
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

