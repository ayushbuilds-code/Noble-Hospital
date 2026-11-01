import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Calendar, Menu, X, Shield, Mic, Heart } from 'lucide-react';

interface NavbarProps {
  onOpenBooking?: () => void;
  onOpenVoiceAgent?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenVoiceAgent }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top emergency and helpline strip */}
      <div className="bg-[#0C2847] text-slate-200 text-xs py-2 px-4 sm:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-brand-teal-300 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              24/7 Emergency: <a href="tel:02026803999" className="hover:underline font-bold text-white">+91 (020) 2680-3999</a>
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-brand-teal-400" />
              General Reception: <a href="tel:02026803000" className="hover:underline text-white font-medium">+91 (020) 2680-3000</a>
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <button
              onClick={() => {
                if (onOpenVoiceAgent) onOpenVoiceAgent();
                else scrollToSection('neha-receptionist');
              }}
              className="flex items-center gap-1.5 text-xs bg-brand-teal/20 text-brand-teal-200 hover:bg-brand-teal/30 px-2.5 py-1 rounded-full transition-colors border border-brand-teal/40"
            >
              <Mic className="w-3 h-3 text-brand-teal-300 animate-bounce" />
              <span>Talk to Neha (AI Receptionist)</span>
            </button>
            <Link
              to="/admin"
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
              title="Staff & Doctor Administration"
            >
              <Shield className="w-3.5 h-3.5 text-brand-teal-400" />
              <span className="hidden sm:inline">Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main sticky navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-slate-100 py-3'
            : 'bg-white border-b border-slate-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Noble Hospital Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#123B67] to-[#16A6A0] flex items-center justify-center text-white shadow-md shadow-brand-blue/20 group-hover:scale-105 transition-transform">
              <Heart className="w-6 h-6 fill-white text-white" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#123B67] block leading-none">
                NOBLE <span className="text-[#16A6A0]">HOSPITAL</span>
              </span>
              <span className="text-[10px] sm:text-xs font-medium text-slate-500 uppercase tracking-widest block mt-1">
                Multispeciality Care & Research
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-sm font-semibold text-slate-700 hover:text-[#16A6A0] transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm font-semibold text-slate-700 hover:text-[#16A6A0] transition-colors"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection('departments')}
              className="text-sm font-semibold text-slate-700 hover:text-[#16A6A0] transition-colors"
            >
              Departments
            </button>
            <button
              onClick={() => scrollToSection('doctors')}
              className="text-sm font-semibold text-slate-700 hover:text-[#16A6A0] transition-colors"
            >
              Doctors
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-sm font-semibold text-slate-700 hover:text-[#16A6A0] transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm font-semibold text-slate-700 hover:text-[#16A6A0] transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => {
                if (onOpenVoiceAgent) onOpenVoiceAgent();
                else scrollToSection('neha-receptionist');
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold text-[#123B67] bg-[#F0F5FA] hover:bg-[#E2EDF8] border border-brand-blue/15 transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Ask Neha</span>
            </button>

            <button
              onClick={() => {
                if (onOpenBooking) onOpenBooking();
                else scrollToSection('appointment-booking');
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#123B67] to-[#16A6A0] hover:opacity-95 shadow-md shadow-brand-blue/20 transition-all active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-4 pb-6 shadow-xl animate-fadeIn">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-left py-2 text-slate-700 font-medium hover:text-[#16A6A0] border-b border-slate-100"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-left py-2 text-slate-700 font-medium hover:text-[#16A6A0] border-b border-slate-100"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection('neha-receptionist')}
                className="text-left py-2 text-brand-teal font-medium border-b border-slate-100 flex items-center justify-between"
              >
                <span>Meet Neha (AI Receptionist)</span>
                <span className="px-2 py-0.5 text-xs bg-brand-teal-50 text-brand-teal rounded">Live Voice</span>
              </button>
              <button
                onClick={() => scrollToSection('departments')}
                className="text-left py-2 text-slate-700 font-medium hover:text-[#16A6A0] border-b border-slate-100"
              >
                Departments
              </button>
              <button
                onClick={() => scrollToSection('doctors')}
                className="text-left py-2 text-slate-700 font-medium hover:text-[#16A6A0] border-b border-slate-100"
              >
                Doctors
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-left py-2 text-slate-700 font-medium hover:text-[#16A6A0] border-b border-slate-100"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left py-2 text-slate-700 font-medium hover:text-[#16A6A0] border-b border-slate-100"
              >
                Contact
              </button>

              <div className="pt-3 flex flex-col gap-2">
                <button
                  onClick={() => {
                    scrollToSection('appointment-booking');
                    if (onOpenBooking) onOpenBooking();
                  }}
                  className="w-full py-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#123B67] to-[#16A6A0] text-center"
                >
                  Book Appointment
                </button>
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-lg text-sm font-medium text-slate-600 bg-slate-100 text-center"
                >
                  Admin Portal Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

