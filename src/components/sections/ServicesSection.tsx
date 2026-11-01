import React from 'react';
import { Activity, ShieldAlert, FlaskConical, Pill, Bed, HeartPulse, CheckCircle2 } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const hospitalServices = [
    {
      title: '24/7 Emergency & Trauma Care',
      description: 'Rapid-response casualty unit equipped with cardiac life-support ambulances, trauma resuscitation bays, and emergency surgical teams.',
      icon: <ShieldAlert className="w-6 h-6 text-[#16A6A0]" />
    },
    {
      title: 'Intensive Care Units (ICU & CCU)',
      description: 'Advanced physiological monitoring, ventilator support, and 1:1 dedicated nursing care for critically ill patients.',
      icon: <HeartPulse className="w-6 h-6 text-[#16A6A0]" />
    },
    {
      title: 'Diagnostic Imaging & Pathology',
      description: 'Fully automated biochemistry laboratory, digital X-Ray, high-resolution ultrasound, color Doppler, and comprehensive health panels.',
      icon: <FlaskConical className="w-6 h-6 text-[#16A6A0]" />
    },
    {
      title: 'Round-The-Clock In-Hospital Pharmacy',
      description: '24-hour dispensing of verified pharmaceutical products, surgical consumables, and chronic therapy medications.',
      icon: <Pill className="w-6 h-6 text-[#16A6A0]" />
    },
    {
      title: 'Modern Inpatient Suites',
      description: 'Comfortable private rooms, semi-private rooms, and general healthcare wards designed for infection control and patient rest.',
      icon: <Bed className="w-6 h-6 text-[#16A6A0]" />
    },
    {
      title: 'Preventive Health Checkups',
      description: 'Tailored cardiac wellness packages, senior citizen screenings, master health checks, and corporate health evaluations.',
      icon: <Activity className="w-6 h-6 text-[#16A6A0]" />
    }
  ];

  return (
    <section id="services" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#EBF3FA] text-[#123B67] text-xs font-bold uppercase tracking-wider">
            Hospital Facilities & Care
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123B67] tracking-tight">
            Comprehensive Clinical Services
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Dedicated infrastructure designed to support complete patient recovery from emergency admission to post-operative rehabilitation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hospitalServices.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl p-7 border border-slate-200/90 hover:border-brand-teal/50 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-teal-50 group-hover:bg-[#123B67] group-hover:text-white flex items-center justify-center transition-colors mb-5">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-[#123B67] mb-2 group-hover:text-brand-teal transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500 font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand-teal" />
                <span>Available On-Campus</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

