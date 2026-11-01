import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#EBF3FA] text-[#123B67] text-xs font-bold uppercase tracking-wider">
            Location & Assistance
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123B67] tracking-tight">
            Contact Noble Hospital
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Reach out for appointment queries, general hospital information, or visit our multispeciality campus.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Hospital Details & Interactive Map Placeholder */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Info Cards */}
            <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200/90 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#16A6A0] shrink-0 border border-slate-100">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#123B67]">Hospital Address</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Noble Hospital, 153 Magarpatta Road, Hadapsar, Pune, Maharashtra 411028, India
                  </p>
                  <span className="text-[11px] text-slate-400 mt-1 block">Opposite Magarpatta City South Gate</span>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-3 border-t border-slate-200/60">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#16A6A0] shrink-0 border border-slate-100">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#123B67]">Helpline & Emergency</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    General Reception: <a href="tel:02026803000" className="hover:underline font-semibold text-slate-800">+91 (020) 2680-3000</a>
                  </p>
                  <p className="text-xs text-red-600 font-semibold mt-0.5">
                    24/7 Emergency: <a href="tel:02026803999" className="hover:underline">+91 (020) 2680-3999</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-3 border-t border-slate-200/60">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#16A6A0] shrink-0 border border-slate-100">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#123B67]">Email Inquiries</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    General: contact@noblehospital.com
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Appointments: appointments@noblehospital.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-3 border-t border-slate-200/60">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#16A6A0] shrink-0 border border-slate-100">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#123B67]">Operating Hours</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    OPD Consultations: 08:30 AM – 07:00 PM (Mon-Sat)
                  </p>
                  <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                    Emergency, Trauma & ICU: Open 24 Hours / 7 Days
                  </p>
                </div>
              </div>
            </div>

            {/* Hospital Map Canvas / Embed */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative h-56 bg-slate-100">
              <iframe
                title="Noble Hospital Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.336440268758!2d73.92620707598822!3d18.51368996938507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1995a947517%3A0xe54d6fc4bb548f02!2sNoble%20Hospital%2C%20Hadapsar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-[#F8FAFC] rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-soft">
            <h3 className="text-xl font-bold text-[#123B67] mb-2">
              Send an Online Inquiry
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Fill out this form and our hospital administration desk will get back to you within 24 hours.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-white border border-emerald-200 text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#123B67]">Inquiry Received</h4>
                <p className="text-xs text-slate-600">
                  Thank you for contacting Noble Hospital. Our team has received your message and will respond shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anjali Nair"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Contact Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-slate-400">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="anjali@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Inquiry Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Cardiology OPD inquiry"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Message / Question <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can Noble Hospital assist you? Write your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  ></textarea>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-teal" />
                    Strict patient confidentiality maintained
                  </span>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#123B67] to-[#16A6A0] hover:opacity-95 shadow-md shadow-brand-blue/20 transition-all flex items-center gap-2 text-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

