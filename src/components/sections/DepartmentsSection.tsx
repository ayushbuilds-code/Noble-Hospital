import React, { useEffect, useState } from 'react';
import {
  Heart,
  Sparkles,
  Activity,
  Smile,
  Stethoscope,
  ShieldCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Department } from '../../types';
import { getDepartments } from '../../services/appointmentService';

interface DepartmentsSectionProps {
  onSelectDepartment: (deptName: string) => void;
}

export const DepartmentsSection: React.FC<DepartmentsSectionProps> = ({ onSelectDepartment }) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDepartments().then((data) => {
      setDepartments(data);
      setLoading(false);
    });
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart':
        return <Heart className="w-6 h-6 text-[#16A6A0]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#16A6A0]" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-[#16A6A0]" />;
      case 'Smile':
        return <Smile className="w-6 h-6 text-[#16A6A0]" />;
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6 text-[#16A6A0]" />;
      case 'ShieldCheck':
      default:
        return <ShieldCheck className="w-6 h-6 text-[#16A6A0]" />;
    }
  };

  return (
    <section id="departments" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#EBF3FA] text-[#123B67] text-xs font-bold uppercase tracking-wider">
            Centers of Clinical Excellence
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123B67] tracking-tight">
            Specialised Medical Departments
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Equipped with modern therapeutic technology and guided by experienced healthcare specialists across multiple medical disciplines.
          </p>
        </div>

        {/* Department Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="group bg-white rounded-2xl p-7 border border-slate-200/80 hover:border-brand-teal/50 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Subtle accent hover banner */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#123B67] to-[#16A6A0] opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div>
                {/* Department Icon */}
                <div className="w-14 h-14 rounded-xl bg-brand-teal-50 group-hover:bg-[#123B67] group-hover:text-white flex items-center justify-center transition-colors mb-5 shadow-sm">
                  {getIcon(dept.icon)}
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-[#123B67] mb-2.5 group-hover:text-brand-teal transition-colors">
                  {dept.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {dept.description}
                </p>
              </div>

              {/* Action Button & Lead Specialist Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                {dept.headOfDepartment ? (
                  <div className="text-[11px] text-slate-500">
                    <span className="block font-semibold text-slate-700">HOD:</span>
                    <span>{dept.headOfDepartment}</span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-400">Noble Care Unit</span>
                )}

                <button
                  onClick={() => onSelectDepartment(dept.name)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#123B67] hover:text-[#16A6A0] transition-colors group-hover:translate-x-1 duration-200"
                >
                  <span>Consult Specialists</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

