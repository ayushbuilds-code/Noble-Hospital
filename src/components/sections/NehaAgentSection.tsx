import React, { useState, useEffect, useRef } from 'react';
import {
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Sparkles,
  Activity,
  Languages,
  AlertCircle
} from 'lucide-react';
import { NehaVoiceClient } from '../../services/bolnaService';
import { CallState } from '@bolna/web-call';

export const NehaAgentSection: React.FC = () => {
  const [callState, setCallState] = useState<CallState>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const clientRef = useRef<NehaVoiceClient | null>(null);

  useEffect(() => {
    clientRef.current = new NehaVoiceClient({
      onStateChange: (state) => {
        setCallState(state);
        if (state === 'ended' || state === 'idle') {
          setVolumeLevel(0);
        }
      },
      onVolumeChange: (vol) => {
        setVolumeLevel(vol);
      },
      onError: (err) => {
        setErrorMessage(err.message);
        setCallState('ended');
      },
      onCallEnd: (reason) => {
        console.log('Bolna call ended:', reason);
        setCallState('ended');
        setVolumeLevel(0);
      }
    });

    return () => {
      if (clientRef.current) {
        clientRef.current.stopCall();
      }
    };
  }, []);

  const handleStartCall = async () => {
    setErrorMessage(null);
    setCallState('connecting');

    try {
      if (clientRef.current) {
        await clientRef.current.startCall();
      }
    } catch (err: any) {
      console.warn('Bolna startCall failed:', err);
      // Fallback: also try triggering any floating widget if present
      try {
        const host = document.querySelector('div[aria-label="Voice assistant"]');
        if (host && host.shadowRoot) {
          const btn = host.shadowRoot.querySelector<HTMLButtonElement>('button');
          if (btn) btn.click();
        }
      } catch (e) {
        // ignore
      }
    }
  };

  const handleStopCall = async () => {
    if (clientRef.current) {
      await clientRef.current.stopCall();
    }
    setCallState('idle');
    setVolumeLevel(0);
  };

  const handleToggleMute = () => {
    if (clientRef.current && callState === 'active') {
      const next = !isMuted;
      clientRef.current.toggleMute(next);
      setIsMuted(next);
    }
  };

  const getStatusBadge = () => {
    switch (callState) {
      case 'connecting':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
            Connecting to Neha...
          </span>
        );
      case 'ringing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-[#123B67] border border-blue-300">
            <span className="w-2 h-2 rounded-full bg-brand-teal animate-bounce"></span>
            Ringing...
          </span>
        );
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Call Active & Listening
          </span>
        );
      case 'ended':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-300">
            Call Completed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-teal-50 text-brand-teal-800 border border-brand-teal-200">
            <span className="w-2 h-2 rounded-full bg-brand-teal"></span>
            Ready to Connect
          </span>
        );
    }
  };

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
          
          {/* Top status indicator */}
          <div className="flex items-center justify-center pb-6 border-b border-slate-100">
            <div className="flex items-center gap-2">
              {getStatusBadge()}
            </div>
          </div>

          {/* Avatar and Visualizer Section */}
          <div className="py-8 flex flex-col items-center justify-center text-center">
            
            {/* Female Avatar with Audio Pulse Ring */}
            <div className="relative mb-6">
              {callState === 'active' && (
                <div 
                  className="absolute inset-0 rounded-full bg-brand-teal/20 animate-ping"
                  style={{ animationDuration: '2s' }}
                ></div>
              )}
              
              <div 
                className={`relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 transition-all duration-300 ${
                  callState === 'active'
                    ? 'bg-gradient-to-tr from-brand-teal to-[#123B67] glow-teal shadow-xl'
                    : 'bg-gradient-to-tr from-[#123B67]/20 to-brand-teal/20 shadow-md'
                }`}
              >
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                  alt="Neha - Noble Hospital Virtual Receptionist"
                  className="w-full h-full rounded-full object-cover border-4 border-white"
                />

                {/* Online indicator */}
                <span className="absolute bottom-2 right-3 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                </span>
              </div>
            </div>

            {/* Receptionist Name & Title */}
            <h3 className="text-2xl font-bold text-[#123B67] tracking-tight">
              Neha
            </h3>
            <p className="text-sm text-[#16A6A0] font-semibold mt-0.5">
              Virtual AI Receptionist • Noble Hospital
            </p>

            {/* Active Voice Waveform Visualizer */}
            <div className="h-10 flex items-center justify-center gap-1.5 mt-4">
              {callState === 'active' ? (
                <>
                  <div className="w-1.5 bg-brand-teal rounded-full animate-wave-1 h-6"></div>
                  <div className="w-1.5 bg-[#123B67] rounded-full animate-wave-2 h-8"></div>
                  <div className="w-1.5 bg-brand-teal rounded-full animate-wave-3 h-10"></div>
                  <div className="w-1.5 bg-[#123B67] rounded-full animate-wave-4 h-7"></div>
                  <div className="w-1.5 bg-brand-teal rounded-full animate-wave-5 h-5"></div>
                  <div className="w-1.5 bg-[#123B67] rounded-full animate-wave-2 h-9"></div>
                  <div className="w-1.5 bg-brand-teal rounded-full animate-wave-3 h-6"></div>
                </>
              ) : (
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Activity className="w-4 h-4 text-slate-300" />
                  <span>Microphone & voice stream will activate upon call initiation</span>
                </div>
              )}
            </div>

            {/* Volume level progress indicator */}
            {callState === 'active' && volumeLevel > 0 && (
              <div className="w-48 bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-brand-teal h-full transition-all duration-100"
                  style={{ width: `${Math.min(100, volumeLevel * 100)}%` }}
                ></div>
              </div>
            )}
          </div>

          {/* Interactive Controls Bar */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-4">
            {callState === 'idle' || callState === 'ended' ? (
              <button
                type="button"
                onClick={handleStartCall}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-[#123B67] via-[#16A6A0] to-[#123B67] hover:shadow-lg hover:shadow-brand-teal/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 text-base shadow-md active:scale-[0.98] cursor-pointer"
              >
                <PhoneCall className="w-5 h-5 text-white" />
                <span>Start Voice Call with Neha</span>
              </button>
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
                {/* Mute button */}
                <button
                  type="button"
                  onClick={handleToggleMute}
                  disabled={callState !== 'active'}
                  className={`p-3.5 rounded-xl border transition-all flex items-center gap-2 text-sm font-semibold cursor-pointer ${
                    isMuted
                      ? 'bg-amber-50 border-amber-300 text-amber-700'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                  title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
                >
                  {isMuted ? <MicOff className="w-5 h-5 text-amber-600" /> : <Mic className="w-5 h-5 text-[#123B67]" />}
                  <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                </button>

                {/* End Call button */}
                <button
                  type="button"
                  onClick={handleStopCall}
                  className="px-6 py-3.5 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-500/20 transition-all flex items-center gap-2.5 text-sm active:scale-[0.98] cursor-pointer"
                >
                  <PhoneOff className="w-5 h-5" />
                  <span>End Call</span>
                </button>
              </div>
            )}
          </div>

          {/* Error Notice if any */}
          {errorMessage && (
            <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-red-900">Voice Assistant Notice</p>
                <p className="text-red-700 text-xs">{errorMessage}</p>
              </div>
            </div>
          )}

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

      </div>
    </section>
  );
};
