"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { EMOJIS, ANIMALS, PENTATONIC, THEMES, rand, pick, type Theme } from "@/lib/data";
import { AudioEngine } from "@/lib/audio";
import {
  EmojiPop, FlyingAnimal, ColorFlash, ComboRing,
  type Effect,
} from "@/components/Effects";
import AttractMode from "@/components/AttractMode";
import ParentPanel, { type Settings } from "@/components/ParentPanel";
import { GlowLayer, PaperLayer } from "@/components/BackgroundLayers";

const MAX_EFFECTS = 12;

const DEFAULT_SETTINGS: Settings = {
  theme: "tenger",
  style: "glow",
  chaosSpeed: 1.0,
  rareRate: 0.03,
  muted: false,
  volume: 0.55,
  shake: false,
  attract: true,
};

function makeParticles(n: number, color: string, theme: Theme) {
  const palette = [color, theme.bg1, theme.accent, theme.glow, "#ffffff"];
  return Array.from({ length: n }, () => ({
    angle: Math.random() * Math.PI * 2,
    dist: rand(100, 220),
    size: rand(6, 14),
    color: pick(palette),
  }));
}

function getBackground(theme: Theme, style: string): React.CSSProperties {
  if (style === "flat") return { background: theme.bg2 };
  if (style === "paper") {
    return {
      background: `radial-gradient(circle at 20% 20%, ${theme.bg1}55, transparent 50%),
        radial-gradient(circle at 80% 70%, ${theme.accent}33, transparent 55%), ${theme.bg3}`,
    };
  }
  return {
    background: `radial-gradient(ellipse at 30% 20%, ${theme.glow}40, transparent 55%),
      radial-gradient(ellipse at 70% 80%, ${theme.accent}35, transparent 50%),
      linear-gradient(135deg, ${theme.bg1}, ${theme.bg2})`,
  };
}

export default function Home() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [effects, setEffects] = useState<Effect[]>([]);
  const [parentOpen, setParentOpen] = useState(false);
  const [idleActive, setIdleActive] = useState(false);
  const [holdPct, setHoldPct] = useState(0);

  const tapCount = useRef(0);
  const effId = useRef(0);
  const lastTap = useRef(Date.now());
  const lastSmash = useRef(0);
  const idleTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const holdTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const holdProgress = useRef(0);
  const report = useRef({ total: 0, animals: 0, rares: 0 });

  const theme = THEMES[settings.theme] || THEMES.tenger;

  useEffect(() => { AudioEngine.setMuted(settings.muted); }, [settings.muted]);
  useEffect(() => { AudioEngine.setVolume(settings.volume); }, [settings.volume]);

  useEffect(() => {
    const check = () => {
      if (!settings.attract) { setIdleActive(false); return; }
      setIdleActive(Date.now() - lastTap.current > 6000);
    };
    idleTimer.current = setInterval(check, 1000);
    return () => { if (idleTimer.current) clearInterval(idleTimer.current); };
  }, [settings.attract]);

  const addEffects = useCallback((newEffects: Omit<Effect, "id" | "createdAt">[]) => {
    const now = performance.now();
    const created: Effect[] = newEffects.map((eff) => {
      effId.current += 1;
      return { ...eff, id: effId.current, createdAt: now } as Effect;
    });
    const ids = created.map((e) => e.id);
    const maxDur = Math.max(...newEffects.map((e) => e.duration));

    setEffects((es) => {
      const next = [...es, ...created];
      return next.length > MAX_EFFECTS ? next.slice(-MAX_EFFECTS) : next;
    });

    setTimeout(() => {
      setEffects((es) => es.filter((e) => !ids.includes(e.id)));
    }, maxDur + 100);
  }, []);

  const handleSmash = useCallback((x: number, y: number) => {
    if (parentOpen) return;
    const now = performance.now();
    if (now - lastSmash.current < 120) return;
    lastSmash.current = now;
    lastTap.current = Date.now();
    tapCount.current += 1;
    report.current.total += 1;

    const pan = Math.max(-0.85, Math.min(0.85, (x / window.innerWidth) * 2 - 1));

    AudioEngine.click(pan);
    const note = PENTATONIC[Math.floor(Math.random() * PENTATONIC.length)];
    AudioEngine.tone(note, pan, 0.6);

    const emojiObj = pick(EMOJIS);
    const batch: Omit<Effect, "id" | "createdAt">[] = [];

    if (tapCount.current % 8 === 0) {
      // Combo: flying animal + ring
      const a = pick(ANIMALS);
      report.current.animals += 1;
      AudioEngine.chord([392, 523.25, 659.25], pan);
      batch.push({
        kind: "animal", emoji: a.emoji, fromLeft: Math.random() < 0.5,
        y: rand(100, window.innerHeight - 150), size: 120, duration: 2200,
      } as Omit<Effect, "id" | "createdAt">);
      batch.push({
        kind: "comboRing", x, y, color: theme.accent, duration: 800,
      } as Omit<Effect, "id" | "createdAt">);
    } else if (tapCount.current % 5 === 0) {
      // Flying animal
      const a = pick(ANIMALS);
      report.current.animals += 1;
      AudioEngine.whoosh(pan, 0.4);
      batch.push({
        kind: "animal", emoji: a.emoji, fromLeft: Math.random() < 0.5,
        y: rand(100, window.innerHeight - 150), size: 120, duration: 2200,
      } as Omit<Effect, "id" | "createdAt">);
    } else if (Math.random() < 0.08) {
      // Color flash
      batch.push({ kind: "colorFlash", color: emojiObj.color, duration: 500 } as Omit<Effect, "id" | "createdAt">);
    }

    // Always show emoji pop (main visual)
    batch.push({
      kind: "emojiPop", x, y,
      emoji: emojiObj.emoji, name: emojiObj.name, color: emojiObj.color,
      particles: makeParticles(6, emojiObj.color, theme),
      duration: 1000,
    } as Omit<Effect, "id" | "createdAt">);

    addEffects(batch);
  }, [parentOpen, theme, addEffects]);

  // Keyboard
  useEffect(() => {
    const PASS = new Set(["Escape", "F11"]);
    const onKeyDown = (e: KeyboardEvent) => {
      if (PASS.has(e.key)) return;
      if ((e.metaKey && e.key === "q") || (e.ctrlKey && e.key === "w")) return;
      e.preventDefault();
      handleSmash(rand(window.innerWidth * 0.15, window.innerWidth * 0.85), rand(window.innerHeight * 0.15, window.innerHeight * 0.85));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleSmash]);

  // Hold top-left for parent panel
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (e.clientX < 80 && e.clientY < 80) {
        holdProgress.current = 0;
        holdTimer.current = setInterval(() => {
          holdProgress.current += 50;
          setHoldPct(Math.min(100, (holdProgress.current / 2000) * 100));
          if (holdProgress.current >= 2000) {
            if (holdTimer.current) clearInterval(holdTimer.current);
            holdTimer.current = null;
            setParentOpen(true);
            setHoldPct(0);
          }
        }, 50);
      }
    };
    const onUp = () => {
      if (holdTimer.current) { clearInterval(holdTimer.current); holdTimer.current = null; }
      setHoldPct(0);
      holdProgress.current = 0;
    };
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const onSurface = (e: React.PointerEvent) => {
    if (e.clientX < 80 && e.clientY < 80) return;
    handleSmash(e.clientX, e.clientY);
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, overflow: "hidden", touchAction: "none", userSelect: "none", cursor: "crosshair", ...getBackground(theme, settings.style) }}
      onPointerDown={onSurface}
    >
      {settings.style === "glow" && <GlowLayer theme={theme} />}
      {settings.style === "paper" && <PaperLayer theme={theme} />}

      <AttractMode active={idleActive && effects.length === 0 && !parentOpen} theme={theme} />

      {holdPct > 5 && (
        <div style={{ position: "fixed", top: 12, left: 12, width: 60, height: 60, zIndex: 50, pointerEvents: "none" }}>
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="26" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="4" />
            <circle cx="30" cy="30" r="26" fill="none" stroke="#fff" strokeWidth="4"
              strokeDasharray={`${(holdPct / 100) * 163} 163`} strokeLinecap="round"
              transform="rotate(-90 30 30)" />
          </svg>
        </div>
      )}

      {effects.map((e) => {
        switch (e.kind) {
          case "emojiPop": return <EmojiPop key={e.id} eff={e} />;
          case "animal": return <FlyingAnimal key={e.id} eff={e} />;
          case "colorFlash": return <ColorFlash key={e.id} eff={e} />;
          case "comboRing": return <ComboRing key={e.id} eff={e} />;
          default: return null;
        }
      })}

      <ParentPanel
        open={parentOpen} onClose={() => setParentOpen(false)}
        settings={settings} setSettings={setSettings}
        report={{ ...report.current, uniqueLetters: 0, chaos: 0 }}
        onReset={() => { report.current = { total: 0, animals: 0, rares: 0 }; }}
      />
    </div>
  );
}
