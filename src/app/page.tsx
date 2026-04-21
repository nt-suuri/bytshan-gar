"use client";

import { useEffect, useRef, useState } from "react";
import useKeyboardInput from "@/hooks/useKeyboardInput";
import useAudio from "@/hooks/useAudio";
import LetterDisplay from "@/components/LetterDisplay";
import AnimalSprite from "@/components/AnimalSprite";
import ParticleSystem from "@/components/ParticleSystem";
import ParentPanel from "@/components/ParentPanel";
import TouchRipple from "@/components/TouchRipple";
import themes, { Theme } from "@/data/themes";

export default function Home() {
  const { currentLetter, stats, animal, touchPoint } = useKeyboardInput();
  const audio = useAudio();
  const prevTotal = useRef(0);

  const [theme, setTheme] = useState<Theme>(themes[0]);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Play sound on each key
  useEffect(() => {
    if (stats.totalKeys > prevTotal.current) {
      prevTotal.current = stats.totalKeys;
      audio.playSmash();
    }
  }, [stats.totalKeys, audio.playSmash]);

  // Apply/remove reduce-motion class on body
  useEffect(() => {
    document.body.classList.toggle("reduce-motion", reduceMotion);
  }, [reduceMotion]);

  // Safety: prevent context menu
  useEffect(() => {
    const prevent = (e: Event) => e.preventDefault();
    document.addEventListener("contextmenu", prevent);
    return () => document.removeEventListener("contextmenu", prevent);
  }, []);

  // Safety: warn before close
  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, []);

  // Flash color overlay when letter changes — blend letter color on top of theme gradient
  const flashStyle = currentLetter
    ? { background: `linear-gradient(rgba(0,0,0,0) 0%, ${currentLetter.color}99 100%), ${theme.background}` }
    : { background: theme.background };

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center select-none relative"
      style={{ ...flashStyle, transition: "background 0.3s ease" }}
    >
      {currentLetter ? (
        <LetterDisplay key={stats.totalKeys} letter={currentLetter} />
      ) : (
        <h1 className="text-white font-bold text-center px-8" style={{ fontSize: "8vw" }}>
          Бяцхан Гар
        </h1>
      )}

      {animal && <AnimalSprite key={`animal-${stats.totalKeys}`} animal={animal} />}

      <ParticleSystem trigger={stats.totalKeys} />

      {touchPoint && (
        <TouchRipple key={stats.totalKeys} x={touchPoint.x} y={touchPoint.y} id={stats.totalKeys} />
      )}

      <div className="absolute bottom-4 text-white opacity-50 text-sm">
        {stats.totalKeys} товч
      </div>

      <ParentPanel
        stats={stats}
        audio={{ setVolume: audio.setVolume, setMuted: audio.setMuted, isMuted: audio.isMuted }}
        theme={theme}
        setTheme={setTheme}
        reduceMotion={reduceMotion}
        setReduceMotion={setReduceMotion}
      />
    </div>
  );
}
