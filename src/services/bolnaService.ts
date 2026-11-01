import { BolnaWebCall, CallState, CallError } from '@bolna/web-call';

const BOLNA_AGENT_ID_KEY = 'nh_bolna_agent_id';
const BOLNA_API_KEY_KEY = 'nh_bolna_api_key';

export const getBolnaAgentId = (): string => {
  return localStorage.getItem(BOLNA_AGENT_ID_KEY) || import.meta.env.VITE_BOLNA_AGENT_ID || '';
};

export const getBolnaApiKey = (): string => {
  return localStorage.getItem(BOLNA_API_KEY_KEY) || import.meta.env.VITE_BOLNA_API_KEY || '';
};

export const saveBolnaConfig = (agentId: string, apiKey: string) => {
  if (agentId) localStorage.setItem(BOLNA_AGENT_ID_KEY, agentId.trim());
  else localStorage.removeItem(BOLNA_AGENT_ID_KEY);

  if (apiKey) localStorage.setItem(BOLNA_API_KEY_KEY, apiKey.trim());
  else localStorage.removeItem(BOLNA_API_KEY_KEY);
};

export const isBolnaConfigured = (): boolean => {
  const agentId = getBolnaAgentId();
  const apiKey = getBolnaApiKey();
  return Boolean(agentId && agentId.trim() !== '' && apiKey && apiKey.trim() !== '');
};

export class NehaVoiceClient {
  private callInstance: BolnaWebCall | null = null;
  private onStateChangeCb?: (state: CallState) => void;
  private onVolumeChangeCb?: (volume: number) => void;
  private onErrorCb?: (error: { code: string; message: string }) => void;
  private onCallEndCb?: (reason: string) => void;

  constructor(callbacks: {
    onStateChange?: (state: CallState) => void;
    onVolumeChange?: (volume: number) => void;
    onError?: (error: { code: string; message: string }) => void;
    onCallEnd?: (reason: string) => void;
  }) {
    this.onStateChangeCb = callbacks.onStateChange;
    this.onVolumeChangeCb = callbacks.onVolumeChange;
    this.onErrorCb = callbacks.onError;
    this.onCallEndCb = callbacks.onCallEnd;
  }

  public async startCall(): Promise<void> {
    if (!isBolnaConfigured()) {
      const err = {
        code: 'NOT_CONFIGURED',
        message: 'Bolna Voice Agent credentials not found. Please provide Bolna Agent ID & API Key in the settings.'
      };
      if (this.onErrorCb) this.onErrorCb(err);
      throw new Error(err.message);
    }

    try {
      // Create session fetcher for ephemeral credential minting
      const getSession = async () => {
        const agentId = getBolnaAgentId();
        const apiKey = getBolnaApiKey();

        const response = await fetch('/api/bolna-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            agentId,
            apiKey,
            user_data: {
              hospital: 'Noble Hospital',
              receptionist: 'Neha',
              capabilities: 'Appointments, Departments, Timings, Doctors'
            }
          })
        });

        if (!response.ok) {
          const resJson = await response.json().catch(() => ({}));
          throw new Error(resJson.message || `Failed to mint Bolna session (Status ${response.status})`);
        }

        return await response.json();
      };

      this.callInstance = new BolnaWebCall({
        getSession,
        debug: true
      });

      this.callInstance.on('state-change', (state: CallState) => {
        if (this.onStateChangeCb) this.onStateChangeCb(state);
      });

      this.callInstance.on('volume-level', (vol: number) => {
        if (this.onVolumeChangeCb) this.onVolumeChangeCb(vol);
      });

      this.callInstance.on('call-end', ({ reason }) => {
        if (this.onCallEndCb) this.onCallEndCb(reason);
      });

      this.callInstance.on('error', (err: CallError) => {
        let msg = err.message || 'Call error';
        if (err.code === 'microphone_denied') {
          msg = 'Microphone permission was denied. Please allow microphone access in your browser settings to speak with Neha.';
        } else if (err.code === 'at_capacity') {
          msg = 'All voice lines are currently busy. Please try again in a few moments.';
        } else if (err.code === 'connect_failed') {
          msg = 'Failed to connect to Bolna voice servers. Please check your network connection.';
        }
        if (this.onErrorCb) this.onErrorCb({ code: err.code, message: msg });
      });

      await this.callInstance.start();
    } catch (err: any) {
      const formatted = {
        code: 'START_FAILED',
        message: err?.message || 'Could not initiate voice call.'
      };
      if (this.onErrorCb) this.onErrorCb(formatted);
      throw err;
    }
  }

  public async stopCall(): Promise<void> {
    if (this.callInstance) {
      await this.callInstance.stop();
      this.callInstance = null;
    }
  }

  public toggleMute(muted: boolean) {
    if (this.callInstance) {
      this.callInstance.setMuted(muted);
    }
  }

  public isMuted(): boolean {
    return this.callInstance ? this.callInstance.isMuted() : false;
  }

  public getState(): CallState {
    return this.callInstance ? this.callInstance.getState() : 'idle';
  }
}

