"use client";

import { useEffect, useRef, useState } from "react";
import themes, { Theme } from "@/data/themes";
import useFullscreen from "@/hooks/useFullscreen";

type Stats = { totalKeys: number; startTime: number; lastKey: string; streak: number };

type Props = {
  stats: Stats;
  audio: { setVolume: (v: number) => void; setMuted: (m: boolean) => void; isMuted: boolean };
  theme: Theme;
  setTheme: (t: Theme) => void;
  reduceMotion: boolean;
  setReduceMotion: (v: boolean) => void;
};

function formatDuration(ms: number) {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}мин ${sec}сек`;
}

function chaosLevel(keysPerMin: number) {
  if (keysPerMin < 30) return { icon: "🟢", label: "Тайван" };
  if (keysPerMin <= 60) return { icon: "🟡", label: "Идэвхтэй" };
  return { icon: "🔴", label: "Галзуу" };
}

export default function ParentPanel({ stats, audio, theme, setTheme, reduceMotion, setReduceMotion }: Props) {
  const [open, setOpen] = useState(false);
  const [volume, setVolumeLocal] = useState(80);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const keyBuffer = useRef<string[]>([]);
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  const onCornerPointerDown = () => {
    holdTimer.current = setTimeout(() => setOpen(true), 2000);
  };
  const onCornerPointerUp = () => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
  };

  // Sequential "parent" key detection — capture phase so it runs before the game blocks keys
  useEffect(() => {
    const TARGET = "parent";
    const onKey = (e: KeyboardEvent) => {
      if (open) return;
      keyBuffer.current.push(e.key.toLowerCase());
      if (keyBuffer.current.length > TARGET.length) keyBuffer.current.shift();
      if (keyBuffer.current.join("") === TARGET) {
        setOpen(true);
        keyBuffer.current = [];
      }
    };
    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, { capture: true });
  }, [open]);

  const durationMs = Date.now() - stats.startTime;
  const keysPerMin = durationMs > 0 ? stats.totalKeys / (durationMs / 60000) : 0;
  const chaos = chaosLevel(keysPerMin);

  const handleVolume = (v: number) => {
    setVolumeLocal(v);
    audio.setVolume(v / 100);
  };

  if (!open) {
    return (
      <div
        className="absolute top-0 left-0 w-10 h-10 z-50"
        style={{ pointerEvents: "all" }}
        onPointerDown={onCornerPointerDown}
        onPointerUp={onCornerPointerUp}
        onPointerLeave={onCornerPointerUp}
      />
    );
  }

  return (
    <>
      <div
        className="absolute inset-0 z-40"
        style={{ pointerEvents: "all" }}
        onClick={() => setOpen(false)}
      />
      <div
        className="absolute top-0 left-0 h-full z-50 flex flex-col gap-4 overflow-y-auto"
        style={{
          width: "min(340px, 90vw)",
          background: "rgba(10,10,30,0.92)",
          color: "#fff",
          padding: "1.5rem 1.25rem",
          pointerEvents: "all",
          backdropFilter: "blur(8px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>Эцэг эхийн самбар</span>
          <button
            onClick={() => setOpen(false)}
            style={{ background: "none", border: "none", color: "#fff", fontSize: "1.4rem", cursor: "pointer", lineHeight: 1 }}
          >
            ✕
          </button>
        </div>

        <hr style={{ borderColor: "rgba(255,255,255,0.15)" }} />

        <div className="flex flex-col gap-2">
          <label className="flex items-center justify-between" style={{ fontSize: "0.9rem" }}>
            <span>Дуу</span>
            <input
              type="checkbox"
              checked={!audio.isMuted}
              onChange={(e) => audio.setMuted(!e.target.checked)}
              style={{ width: 18, height: 18, cursor: "pointer" }}
            />
          </label>
          <label className="flex items-center gap-3" style={{ fontSize: "0.9rem" }}>
            <span style={{ whiteSpace: "nowrap" }}>Дуу хэмжээ</span>
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => handleVolume(Number(e.target.value))}
              style={{ flex: 1 }}
            />
            <span style={{ minWidth: 28, textAlign: "right" }}>{volume}</span>
          </label>
        </div>

        <hr style={{ borderColor: "rgba(255,255,255,0.15)" }} />

        <label className="flex items-center justify-between" style={{ fontSize: "0.9rem" }}>
          <span>Хөдөлгөөн багасгах</span>
          <input
            type="checkbox"
            checked={reduceMotion}
            onChange={(e) => setReduceMotion(e.target.checked)}
            style={{ width: 18, height: 18, cursor: "pointer" }}
          />
        </label>

        <hr style={{ borderColor: "rgba(255,255,255,0.15)" }} />

        <div className="flex flex-col gap-2">
          <span style={{ fontSize: "0.9rem" }}>Загвар</span>
          <div className="flex gap-2 flex-wrap">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t)}
                style={{
                  flex: 1,
                  minWidth: 80,
                  padding: "0.5rem 0.25rem",
                  borderRadius: 8,
                  border: t.id === theme.id ? "2px solid #F2A900" : "2px solid rgba(255,255,255,0.2)",
                  background: t.background,
                  color: "#fff",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  fontWeight: t.id === theme.id ? 700 : 400,
                  textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                }}
              >
                <div>{t.name}</div>
                <div style={{ opacity: 0.75, fontSize: "0.7rem" }}>{t.description}</div>
              </button>
            ))}
          </div>
        </div>

        <hr style={{ borderColor: "rgba(255,255,255,0.15)" }} />

        <button
          onClick={toggleFullscreen}
          style={{
            padding: "0.5rem",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.3)",
            background: "rgba(255,255,255,0.1)",
            color: "#fff",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
        >
          {isFullscreen ? "⛶ Жижигрүүлэх" : "⛶ Дэлгэц дүүргэх"}
        </button>

        <hr style={{ borderColor: "rgba(255,255,255,0.15)" }} />

        <div className="flex flex-col gap-1" style={{ fontSize: "0.85rem" }}>
          <span style={{ fontWeight: 600, marginBottom: 4 }}>Тайлан</span>
          <div className="flex justify-between">
            <span style={{ opacity: 0.7 }}>Нийт товч</span>
            <span>{stats.totalKeys}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ opacity: 0.7 }}>Хугацаа</span>
            <span>{formatDuration(durationMs)}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ opacity: 0.7 }}>Сүүлчийн товч</span>
            <span>{stats.lastKey || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ opacity: 0.7 }}>Хурд</span>
            <span>{chaos.icon} {chaos.label}</span>
          </div>
        </div>
      </div>
    </>
  );
}
