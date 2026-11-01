import React from 'react';
import { HeartHandshake, UserCheck, Stethoscope, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const pillars = [
    {
      title: 'Patient-Focused Care',
      description: 'We place your comfort, safety, and personal healing journey at the center of every clinical decision and care routine.',
      icon: <HeartHandshake className="w-7 h-7 text-[#16A6A0]" />
    },
    {
      title: 'Experienced Medical Professionals',
      description: 'Our senior consultants and surgeons bring decades of clinical practice across medical institutions in India and abroad.',
      icon: <UserCheck className="w-7 h-7 text-[#16A6A0]" />
    },
    {
      title: 'Multiple Specialities Under One Roof',
      description: 'From emergency cardiology and orthopedics to dermatology, pediatrics, and gynecology, avoid multiple clinic visits.',
      icon: <Stethoscope className="w-7 h-7 text-[#16A6A0]" />
    },
    {
      title: 'Convenient Appointment Assistance',
      description: 'Seamless online booking combined with Neha, our virtual voice receptionist available 24/7 in English and Hindi.',
      icon: <Clock className="w-7 h-7 text-[#16A6A0]" />
    },
    {
      title: 'Modern Healthcare Experience',
      description: 'Equipped with digital diagnostics, clean inpatient environments, and streamlined medical record keeping.',
      icon: <ShieldCheck className="w-7 h-7 text-[#16A6A0]" />
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#EBF3FA] text-[#123B67] text-xs font-bold uppercase tracking-wider">
            Our Healthcare Commitments
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123B67] tracking-tight">
            Why Choose Noble Hospital
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Dedicated to delivering ethical, accessible, and high-quality clinical healthcare for patients and families.
          </p>
        </div>

        {/* 5 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className={`p-8 rounded-2xl border border-slate-200/80 hover:border-brand-teal/50 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-brand-teal-50 flex items-center justify-center mb-6">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-bold text-[#123B67] mb-2.5">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs text-brand-teal font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Noble Hospital Standard</span>
              </div>
            </div>
          ))}

          {/* Hospital Emergency Contact Card */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#123B67] to-[#0C2847] text-white shadow-soft-lg flex flex-col justify-between">
            <div>
              <span className="px-2.5 py-1 rounded bg-red-500/80 text-white text-[10px] font-bold uppercase tracking-wider mb-4 inline-block">
                Immediate Assistance
              </span>
              <h3 className="text-xl font-bold text-white mb-2">
                Need Help Right Now?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Our emergency and casualty trauma unit is fully staffed and ready to respond 24 hours every day.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="tel:02026803999"
                className="w-full py-3 rounded-xl bg-white text-[#123B67] font-bold text-center block text-sm hover:bg-brand-teal hover:text-white transition-colors"
              >
                Emergency: +91 (020) 2680-3999
              </a>
              <p className="text-[11px] text-slate-400 text-center">
                Dedicated ambulance dispatch & ICU triage desk
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

