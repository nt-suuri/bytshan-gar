let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let muted = false;
let volume = 0.4;

const PENTATONIC = [262, 294, 330, 392, 440];

function getCtx(): AudioContext {
  if (!ctx) {
    ctx = new AudioContext();
    masterGain = ctx.createGain();
    masterGain.gain.value = muted ? 0 : volume;
    masterGain.connect(ctx.destination);
  }
  return ctx;
}

function getMaster(): GainNode {
  getCtx();
  return masterGain!;
}

export function playNote(frequency: number, duration = 0.5): void {
  const c = getCtx();
  const osc = c.createOscillator();
  const gain = c.createGain();

  osc.type = "sine";
  osc.frequency.value = frequency;

  const now = c.currentTime;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.6, now + 0.02);
  gain.gain.linearRampToValueAtTime(0.6 * 0.3, now + 0.12);
  gain.gain.linearRampToValueAtTime(0, now + duration);

  osc.connect(gain);
  gain.connect(getMaster());
  osc.start(now);
  osc.stop(now + duration + 0.05);
}

export function playRandomNote(): void {
  const base = PENTATONIC[Math.floor(Math.random() * PENTATONIC.length)];
  const detune = (Math.random() - 0.5) * 10;
  playNote(base + detune);
}

export function playPop(): void {
  const c = getCtx();
  const bufSize = c.sampleRate * 0.05;
  const buffer = c.createBuffer(1, bufSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufSize);
  }

  const source = c.createBufferSource();
  source.buffer = buffer;

  const gain = c.createGain();
  gain.gain.value = 0.2;

  source.connect(gain);
  gain.connect(getMaster());
  source.start();
}

export function setVolume(v: number): void {
  volume = v;
  if (masterGain && !muted) masterGain.gain.value = v;
}

export function setMuted(m: boolean): void {
  muted = m;
  if (masterGain) masterGain.gain.value = m ? 0 : volume;
}

export function isMutedState(): boolean {
  return muted;
}
