import React, { useState } from 'react';
import { Navbar } from '../components/common/Navbar';
import { HeroSection } from '../components/sections/HeroSection';
import { AboutUsSection } from '../components/sections/AboutUsSection';
import { NehaAgentSection } from '../components/sections/NehaAgentSection';
import { DepartmentsSection } from '../components/sections/DepartmentsSection';
import { DoctorsSection } from '../components/sections/DoctorsSection';
import { ServicesSection } from '../components/sections/ServicesSection';
import { BookingSection } from '../components/sections/BookingSection';
import { WhyChooseUsSection } from '../components/sections/WhyChooseUsSection';
import { FaqSection } from '../components/sections/FaqSection';
import { ContactSection } from '../components/sections/ContactSection';
import { Footer } from '../components/common/Footer';
import { Doctor } from '../types';

export const HomePage: React.FC = () => {
  const [preselectedDoctor, setPreselectedDoctor] = useState<Doctor | null>(null);
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookWithDoctor = (doctor: Doctor) => {
    setPreselectedDoctor(doctor);
    scrollTo('appointment-booking');
  };

  const handleSelectDepartment = (deptName: string) => {
    setSelectedDeptFilter(deptName);
    scrollTo('doctors');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <Navbar
        onOpenBooking={() => scrollTo('appointment-booking')}
        onOpenVoiceAgent={() => scrollTo('neha-receptionist')}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onBookAppointment={() => scrollTo('appointment-booking')}
          onTalkToNeha={() => scrollTo('neha-receptionist')}
        />

        {/* 2. About Us Section */}
        <AboutUsSection />

        {/* 3. Meet Neha – Virtual Hospital Receptionist */}
        <NehaAgentSection />

        {/* 4. Departments */}
        <DepartmentsSection onSelectDepartment={handleSelectDepartment} />

        {/* 5. Our Doctors */}
        <DoctorsSection
          onBookWithDoctor={handleBookWithDoctor}
          selectedDepartmentFilter={selectedDeptFilter}
        />

        {/* 6. Clinical Services */}
        <ServicesSection />

        {/* 7. Appointment Booking */}
        <BookingSection
          preselectedDoctor={preselectedDoctor}
          onClearPreselectedDoctor={() => setPreselectedDoctor(null)}
        />

        {/* 8. Why Choose Noble Hospital */}
        <WhyChooseUsSection />

        {/* 9. FAQs */}
        <FaqSection />

        {/* 10. Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

