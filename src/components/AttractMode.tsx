"use client";

import { useEffect, useState } from "react";
import { EMOJIS, pick, type Theme } from "@/lib/data";

export default function AttractMode({ active, theme }: { active: boolean; theme: Theme }) {
  const [phase, setPhase] = useState<"goat" | "dance" | "rest">("goat");
  const [dancingEmoji, setDancingEmoji] = useState<{ emoji: string } | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!active) return;
    setPhase("goat");
    let t = 0;
    const id = setInterval(() => {
      t++;
      setTick(t);
      if (t === 1) setPhase("goat");
      if (t === 4) {
        setPhase("dance");
        setDancingEmoji(pick(EMOJIS));
      }
      if (t === 9) setPhase("rest");
      if (t === 12) t = 0;
    }, 800);
    return () => clearInterval(id);
  }, [active]);

  if (!active) return null;

  return (
    <>
      {phase === "goat" && (
        <div style={{
          position: "fixed", right: -20, top: "50%",
          transform: `translateY(-50%) translateX(${Math.sin(tick) * -80 - 20}px)`,
          fontSize: 120, transition: "transform 600ms cubic-bezier(.6,1.4,.3,1)",
          filter: "drop-shadow(-8px 8px 20px rgba(0,0,0,0.25))",
          pointerEvents: "none", zIndex: 5,
        }}>
          🐐
          <div style={{
            position: "absolute", top: -30, left: -110,
            background: "#fff", color: "#333",
            padding: "10px 18px", borderRadius: 24,
            fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 26,
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          }}>Бэх!</div>
        </div>
      )}
      {phase === "dance" && dancingEmoji && (
        <div style={{
          position: "fixed", left: "50%", top: "50%",
          transform: `translate(-50%,-50%) rotate(${Math.sin(tick * 1.5) * 15}deg) scale(${1 + Math.sin(tick * 2) * 0.1})`,
          fontSize: "28vmin",
          color: theme.accent,
          pointerEvents: "none", zIndex: 5,
          transition: "transform 400ms ease",
        }}>{dancingEmoji.emoji}</div>
      )}
      <div style={{
        position: "fixed", bottom: 40, left: "50%", transform: "translateX(-50%)",
        fontFamily: "'Bricolage Grotesque', sans-serif",
        color: "rgba(255,255,255,0.85)", fontSize: 22, fontWeight: 600,
        background: "rgba(0,0,0,0.25)", padding: "10px 22px", borderRadius: 999,
        pointerEvents: "none", zIndex: 5,
        backdropFilter: "blur(8px)",
      }}>Дэлгэцэнд хүр! · Tap anywhere</div>
    </>
  );
}
