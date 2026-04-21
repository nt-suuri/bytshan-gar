let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let muted = false;
let volume = 0.55;

function init() {
  if (ctx) return ctx;
  ctx = new AudioContext();
  master = ctx.createGain();
  master.gain.value = volume;
  master.connect(ctx.destination);
  return ctx;
}

function resume() {
  if (ctx && ctx.state === "suspended") ctx.resume();
}

function setMuted(v: boolean) {
  muted = !!v;
  if (master) master.gain.value = muted ? 0 : volume;
}

function setVolume(v: number) {
  volume = v;
  if (master && !muted) master.gain.value = volume;
}

function click(pan = 0) {
  if (muted) return;
  init(); resume();
  const buf = ctx!.createBuffer(1, 512, ctx!.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
  const src = ctx!.createBufferSource(); src.buffer = buf;
  const hp = ctx!.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 1800;
  const g = ctx!.createGain(); g.gain.value = 0.25;
  const p = ctx!.createStereoPanner(); p.pan.value = pan;
  src.connect(hp).connect(g).connect(p).connect(master!);
  src.start();
}

function tone(freq: number, pan = 0, dur = 0.8, type: OscillatorType = "sine") {
  if (muted) return;
  init(); resume();
  const t = ctx!.currentTime;
  const osc = ctx!.createOscillator(); osc.type = type;
  osc.frequency.value = freq * (1 + (Math.random() - 0.5) * 0.004);
  const osc2 = ctx!.createOscillator(); osc2.type = "triangle";
  osc2.frequency.value = freq * 2;
  const g = ctx!.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.35, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  const g2 = ctx!.createGain(); g2.gain.value = 0.08;
  const p = ctx!.createStereoPanner(); p.pan.value = pan;
  osc.connect(g); osc2.connect(g2); g2.connect(g); g.connect(p).connect(master!);
  osc.start(t); osc2.start(t);
  osc.stop(t + dur + 0.05); osc2.stop(t + dur + 0.05);
}

function whoosh(pan = 0, dur = 0.28) {
  if (muted) return;
  init(); resume();
  const t = ctx!.currentTime;
  const buf = ctx!.createBuffer(1, ctx!.sampleRate * dur, ctx!.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
  const src = ctx!.createBufferSource(); src.buffer = buf;
  const bp = ctx!.createBiquadFilter(); bp.type = "bandpass";
  bp.frequency.setValueAtTime(400, t);
  bp.frequency.exponentialRampToValueAtTime(2200, t + dur);
  bp.Q.value = 4;
  const g = ctx!.createGain(); g.gain.value = 0.09;
  const p = ctx!.createStereoPanner(); p.pan.value = pan;
  src.connect(bp).connect(g).connect(p).connect(master!);
  src.start();
}

function chord(freqs: number[], pan = 0) {
  freqs.forEach((f, i) => setTimeout(() => tone(f, pan, 1.2, "sine"), i * 35));
}

function boing(pan = 0) {
  if (muted) return;
  init(); resume();
  const t = ctx!.currentTime;
  const osc = ctx!.createOscillator(); osc.type = "sine";
  osc.frequency.setValueAtTime(120, t);
  osc.frequency.exponentialRampToValueAtTime(800, t + 0.08);
  osc.frequency.exponentialRampToValueAtTime(180, t + 0.35);
  const g = ctx!.createGain();
  g.gain.setValueAtTime(0.001, t);
  g.gain.exponentialRampToValueAtTime(0.4, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
  const p = ctx!.createStereoPanner(); p.pan.value = pan;
  osc.connect(g).connect(p).connect(master!);
  osc.start(t); osc.stop(t + 0.55);
}

function giggle(pan = 0) {
  if (muted) return;
  [600, 900, 700, 1100].forEach((f, i) =>
    setTimeout(() => tone(f, pan, 0.18, "triangle"), i * 60)
  );
}

function clack(pan = 0) {
  if (muted) return;
  init(); resume();
  const t = ctx!.currentTime;
  const buf = ctx!.createBuffer(1, 1024, ctx!.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / 80);
  const src = ctx!.createBufferSource(); src.buffer = buf;
  const bp = ctx!.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 2400; bp.Q.value = 8;
  const g = ctx!.createGain(); g.gain.value = 0.35;
  const p = ctx!.createStereoPanner(); p.pan.value = pan;
  src.connect(bp).connect(g).connect(p).connect(master!);
  src.start();
}

export const AudioEngine = { init, resume, click, tone, whoosh, chord, boing, giggle, clack, setMuted, setVolume };
