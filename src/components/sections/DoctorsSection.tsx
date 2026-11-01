import React, { useState, useEffect } from 'react';
import { Doctor } from '../../types';
import { getDoctors } from '../../services/appointmentService';
import { Calendar, Clock, Star, Award, IndianRupee, Search, Filter } from 'lucide-react';

interface DoctorsSectionProps {
  onBookWithDoctor: (doctor: Doctor) => void;
  selectedDepartmentFilter?: string | null;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({
  onBookWithDoctor,
  selectedDepartmentFilter
}) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoctors().then((data) => {
      setDoctors(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedDepartmentFilter) {
      setActiveFilter(selectedDepartmentFilter);
    }
  }, [selectedDepartmentFilter]);

  const departmentsList = ['All', 'Cardiology', 'Dermatology', 'Orthopedics', 'Pediatrics', 'General Medicine', 'Gynecology & Obstetrics'];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesDept = activeFilter === 'All' || doc.departmentName.toLowerCase().includes(activeFilter.toLowerCase());
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialisation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.qualification.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <section id="doctors" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#EBF3FA] text-[#123B67] text-xs font-bold uppercase tracking-wider">
            Distinguished Medical Faculty
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123B67] tracking-tight">
            Our Senior Doctors & Specialists
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Meet our multidisciplinary team of experienced consultants dedicated to personalized, evidence-based medical care.
          </p>
          <div className="inline-block px-3 py-1 bg-amber-50 border border-amber-200/80 rounded-md text-[11px] text-amber-800">
            Notice: Doctor profiles currently reflect certified demo data for representation.
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-100">
          
          {/* Department Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {departmentsList.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveFilter(dept)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeFilter === dept
                    ? 'bg-[#123B67] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search doctor or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
            />
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Doctor Photo with Department Badge */}
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={doc.imageUrl}
                    alt={doc.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>

                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#123B67]/90 text-white backdrop-blur-sm text-[11px] font-semibold tracking-wide">
                    {doc.departmentName}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="flex items-center gap-1 text-xs font-semibold bg-white/20 backdrop-blur-md px-2 py-0.5 rounded">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {doc.rating} ({doc.reviewsCount} reviews)
                    </span>
                    <span className="text-xs bg-emerald-500/90 px-2 py-0.5 rounded font-medium">
                      {doc.experienceYears}+ Yrs Exp
                    </span>
                  </div>
                </div>

                {/* Doctor Bio & Details */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#123B67] group-hover:text-brand-teal transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-xs font-semibold text-brand-teal-600 mt-0.5">
                    {doc.specialisation}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {doc.qualification}
                  </p>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {doc.bio}
                  </p>

                  {/* Timing & Consultation Fee Info */}
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                      <span className="font-medium">{doc.availableTimings}</span>
                      <span className="text-slate-400">({doc.availableDays})</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-700 pt-1">
                      <span className="text-slate-500">Consultation Fee:</span>
                      <span className="font-bold text-[#123B67] text-sm">
                        ₹{doc.consultationFee}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Book Appointment CTA Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onBookWithDoctor(doc)}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-[#123B67] bg-[#F0F5FA] hover:bg-[#123B67] hover:text-white border border-brand-blue/20 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Calendar className="w-4 h-4 text-brand-teal" />
                  <span>Book Appointment with {doc.name.split(' ')[1] || doc.name}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">No doctors found matching "{searchQuery}" in {activeFilter}.</p>
            <button
              onClick={() => { setActiveFilter('All'); setSearchQuery(''); }}
              className="mt-3 text-xs font-bold text-brand-teal hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

