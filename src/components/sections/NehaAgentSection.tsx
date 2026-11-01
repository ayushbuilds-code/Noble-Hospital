import React, { useState, useEffect } from 'react';
import {
  PhoneCall,
  PhoneOff,
  Sparkles,
  Activity,
  Languages,
  X,
  Volume2,
  Maximize2
} from 'lucide-react';

export const NehaAgentSection: React.FC = () => {
  const [callActive, setCallActive] = useState(false);
  const [transcriptText, setTranscriptText] = useState<string>('');
  const [transcriptRole, setTranscriptRole] = useState<'agent' | 'user'>('agent');

  useEffect(() => {
    // Listen for live Zensia/Echo call events from the widget or iframe
    const handleCallStart = () => {
      setCallActive(true);
      setTranscriptText('Connected. Speaking with Neha...');
    };

    const handleCallEnd = () => {
      setCallActive(false);
      setTranscriptText('');
    };

    const handleTranscript = (e: any) => {
      if (e.detail?.text) {
        setTranscriptText(e.detail.text);
        if (e.detail.role) {
          setTranscriptRole(e.detail.role);
        }
      }
    };

    window.addEventListener('zencia:call-start', handleCallStart);
    window.addEventListener('zencia:call-end', handleCallEnd);
    window.addEventListener('zencia:transcript', handleTranscript);

    return () => {
      window.removeEventListener('zencia:call-start', handleCallStart);
      window.removeEventListener('zencia:call-end', handleCallEnd);
      window.removeEventListener('zencia:transcript', handleTranscript);
    };
  }, []);

  const handleStartCall = () => {
    setCallActive(true);
    setTranscriptText('Connecting to Neha...');

    // Also trigger floating widget if available
    try {
      const host = document.querySelector('div[aria-label="Voice assistant"]');
      if (host && host.shadowRoot) {
        const btn = host.shadowRoot.querySelector<HTMLButtonElement>('button.zen-orb-btn, button.zen-btn, button');
        if (btn) btn.click();
      }
    } catch (e) {
      // ignore
    }
  };

  const handleEndCall = () => {
    setCallActive(false);
    setTranscriptText('');

    // Close floating panel if open
    try {
      const host = document.querySelector('div[aria-label="Voice assistant"]');
      if (host && host.shadowRoot) {
        const closeBtn = host.shadowRoot.querySelector<HTMLButtonElement>('button[aria-label="Close call panel"], button.zen-btn');
        if (closeBtn) closeBtn.click();
      }
    } catch (e) {
      // ignore
    }
  };

  const hostOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const embedUrl = `https://app.zensia.si/embed/wgt_L5Std82er8Jj-VlHfk6GoKy1wFSaNnxM?host_origin=${encodeURIComponent(hostOrigin)}`;

  return (
    <section id="neha-receptionist" className="py-20 bg-white relative overflow-hidden border-b border-slate-200">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-brand-teal-50/70 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-10 right-0 w-80 h-80 bg-[#F0F5FA] rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FAF9] border border-brand-teal/30 text-brand-teal-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
            Noble Hospital Virtual Receptionist
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123B67] tracking-tight">
            Meet Neha – Virtual Hospital Receptionist
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Your virtual hospital assistant is here to help. Ask questions, explore departments, find doctors and book appointments through a natural voice conversation.
          </p>

          {/* Languages supported */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
              <Languages className="w-3.5 h-3.5 text-brand-teal" />
              <span>English</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
              <Languages className="w-3.5 h-3.5 text-brand-teal" />
              <span>हिंदी (Hindi)</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
              <Languages className="w-3.5 h-3.5 text-brand-teal" />
              <span>Hinglish (Conversational)</span>
            </div>
          </div>
        </div>

        {/* Central Assistant Interface Card */}
        <div className="max-w-3xl mx-auto bg-gradient-to-b from-[#F8FAFC] to-white rounded-3xl border border-slate-200/90 shadow-soft-lg p-6 sm:p-10 relative">
          
          {callActive ? (
            /* ACTIVE LIVE VOICE CALL PANEL */
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                      alt="Neha avatar"
                      className="w-10 h-10 rounded-full object-cover border-2 border-brand-teal"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#123B67]">Neha (Virtual Receptionist)</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Live Call Active
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 block">Noble Hospital • Speaking & Listening</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleEndCall}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all cursor-pointer"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>End Call</span>
                </button>
              </div>

              {/* Embedded Live Interactive Voice Agent Frame */}
              <div className="w-full h-[520px] rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-white relative">
                <iframe
                  src={embedUrl}
                  allow="microphone; autoplay"
                  className="w-full h-full border-0"
                  title="Live Voice Call with Neha"
                />
              </div>

              {/* Live transcript or guidance caption */}
              <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-brand-teal animate-pulse" />
                  <span>{transcriptText || 'Microphone active — speak naturally to Neha.'}</span>
                </div>
                <button
                  onClick={handleEndCall}
                  className="text-red-600 font-semibold hover:underline cursor-pointer"
                >
                  Disconnect Call
                </button>
              </div>
            </div>
          ) : (
            /* INITIAL STATE: AVATAR & CALL BUTTON */
            <div>
              {/* Top status indicator */}
              <div className="flex items-center justify-center pb-6 border-b border-slate-100">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-teal-50 text-brand-teal-800 border border-brand-teal-200">
                  <span className="w-2 h-2 rounded-full bg-brand-teal"></span>
                  Ready to Connect
                </span>
              </div>

              {/* Avatar and Visualizer Section */}
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <div className="relative mb-6">
                  <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-tr from-[#123B67]/20 to-brand-teal/20 shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                      alt="Neha - Noble Hospital Virtual Receptionist"
                      className="w-full h-full rounded-full object-cover border-4 border-white"
                    />
                    <span className="absolute bottom-2 right-3 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[#123B67] tracking-tight">
                  Neha
                </h3>
                <p className="text-sm text-[#16A6A0] font-semibold mt-0.5">
                  Virtual AI Receptionist • Noble Hospital
                </p>

                <div className="h-10 flex items-center justify-center gap-1.5 mt-4 text-xs text-slate-400">
                  <Activity className="w-4 h-4 text-slate-300" />
                  <span>Microphone & voice stream will activate upon call initiation</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleStartCall}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-[#123B67] via-[#16A6A0] to-[#123B67] hover:shadow-lg hover:shadow-brand-teal/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 text-base shadow-md active:scale-[0.98] cursor-pointer"
                >
                  <PhoneCall className="w-5 h-5 text-white" />
                  <span>Start Voice Call with Neha</span>
                </button>
              </div>

              {/* Sample Prompts / Conversation Helpers */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 text-center sm:text-left">
                  Try asking Neha:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div 
                    onClick={handleStartCall}
                    className="p-3 bg-white rounded-xl border border-slate-100 text-xs text-slate-600 hover:border-brand-teal/40 transition-colors cursor-pointer"
                  >
                    <span className="font-medium text-[#123B67] block">"Which cardiologists are available today?"</span>
                    <span className="text-[11px] text-slate-400">Cardiology OPD timings & doctor fees</span>
                  </div>
                  <div 
                    onClick={handleStartCall}
                    className="p-3 bg-white rounded-xl border border-slate-100 text-xs text-slate-600 hover:border-brand-teal/40 transition-colors cursor-pointer"
                  >
                    <span className="font-medium text-[#123B67] block">"I want to book an appointment with Dr. Rajesh."</span>
                    <span className="text-[11px] text-slate-400">Natural voice scheduling assistance</span>
                  </div>
                  <div 
                    onClick={handleStartCall}
                    className="p-3 bg-white rounded-xl border border-slate-100 text-xs text-slate-600 hover:border-brand-teal/40 transition-colors cursor-pointer"
                  >
                    <span className="font-medium text-[#123B67] block">"Noble Hospital ka OPD timings kya hai?"</span>
                    <span className="text-[11px] text-slate-400">Hindi & Hinglish conversational support</span>
                  </div>
                  <div 
                    onClick={handleStartCall}
                    className="p-3 bg-white rounded-xl border border-slate-100 text-xs text-slate-600 hover:border-brand-teal/40 transition-colors cursor-pointer"
                  >
                    <span className="font-medium text-[#123B67] block">"Where is the emergency department located?"</span>
                    <span className="text-[11px] text-slate-400">Campus directions & 24/7 hotline</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
