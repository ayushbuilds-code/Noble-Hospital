import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { FAQ_DATA } from '../../data/initialData';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0].id);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#EBF3FA] text-[#123B67] text-xs font-bold uppercase tracking-wider">
            Patient Support & Knowledge Base
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123B67] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-600">
            Answers to common questions regarding doctor visits, appointments, timings, and interacting with Neha.
          </p>
        </div>

        {/* Interactive Accordion */}
        <div className="space-y-3.5">
          {FAQ_DATA.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? 'border-brand-teal shadow-md' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-800 text-sm sm:text-base"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className={`w-4 h-4 shrink-0 transition-colors ${isOpen ? 'text-brand-teal' : 'text-slate-400'}`} />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'transform rotate-180 text-brand-teal' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Help Desk Callout */}
        <div className="mt-10 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-teal-50 text-brand-teal flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#123B67]">Still have questions?</h4>
              <p className="text-xs text-slate-500">Speak directly with our virtual receptionist or call our helpline.</p>
            </div>
          </div>

          <a
            href="#neha-receptionist"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#123B67] bg-[#F0F5FA] hover:bg-[#123B67] hover:text-white border border-brand-blue/20 transition-all whitespace-nowrap"
          >
            Ask Neha Now &rarr;
          </a>
        </div>

      </div>
    </section>
  );
};

