"use client";

import { THEMES } from "@/lib/data";

export type Settings = {
  theme: string;
  style: string;
  chaosSpeed: number;
  rareRate: number;
  muted: boolean;
  volume: number;
  shake: boolean;
  attract: boolean;
};

export type Report = {
  total: number;
  uniqueLetters: number;
  animals: number;
  rares: number;
  chaos: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  settings: Settings;
  setSettings: (s: Settings) => void;
  report: Report;
  onReset: () => void;
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ fontSize: 12, letterSpacing: 1.8, color: "#999", fontWeight: 700, marginBottom: 10 }}>
        {title.toUpperCase()}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{children}</div>
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "#F8F9FB", borderRadius: 12, cursor: "pointer" }}>
      <span style={{ fontSize: 15, fontWeight: 500, color: "#333" }}>{label}</span>
      <span style={{
        width: 48, height: 28, borderRadius: 999,
        background: checked ? "#2D8C3C" : "#D0D2D8", position: "relative",
        transition: "background 150ms ease",
      }}>
        <span style={{
          position: "absolute", top: 3, left: checked ? 23 : 3,
          width: 22, height: 22, borderRadius: "50%", background: "#fff",
          transition: "left 150ms ease", boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
        }} />
      </span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} style={{ display: "none" }} />
    </label>
  );
}

function Slider({ label, min, max, step, value, onChange }: { label: string; min: number; max: number; step: number; value: number; onChange: (v: number) => void }) {
  return (
    <div style={{ padding: "10px 14px", background: "#F8F9FB", borderRadius: 12 }}>
      <div style={{ fontSize: 14, color: "#333", fontWeight: 500, marginBottom: 6 }}>{label}</div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ width: "100%", accentColor: "#2D8C3C" }} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ background: "#F8F9FB", padding: "14px 16px", borderRadius: 12 }}>
      <div style={{ fontSize: 12, color: "#999", fontWeight: 600, letterSpacing: 0.5 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color: "#1a1a1a", marginTop: 2 }}>{value}</div>
    </div>
  );
}

export default function ParentPanel({ open, onClose, settings, setSettings, report, onReset }: Props) {
  if (!open) return null;

  const s = settings;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(10,15,35,0.55)", backdropFilter: "blur(16px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Bricolage Grotesque', sans-serif",
    }}
      onClick={onClose}
    >
      <div style={{
        background: "#fff", borderRadius: 28, width: "min(560px, 92vw)",
        maxHeight: "90vh", overflow: "auto",
        padding: "32px 34px", boxShadow: "0 40px 120px rgba(0,0,0,0.4)",
      }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: 2, color: "#999", fontWeight: 700 }}>PARENT PANEL</div>
            <div style={{ fontSize: 30, fontWeight: 800, color: "#1a1a1a", marginTop: 4 }}>Бяцхан Гар</div>
          </div>
          <button onClick={onClose} style={{
            border: "none", background: "#F2F3F5", width: 44, height: 44,
            borderRadius: "50%", fontSize: 22, cursor: "pointer", fontWeight: 700,
          }}>✕</button>
        </div>

        <Section title="Theme · Сэдэв">
          <div style={{ display: "flex", gap: 10 }}>
            {Object.entries(THEMES).map(([k, t]) => (
              <button key={k} onClick={() => setSettings({ ...s, theme: k })}
                style={{
                  flex: 1, border: s.theme === k ? "3px solid #1a1a1a" : "3px solid transparent",
                  background: `linear-gradient(135deg, ${t.bg1}, ${t.bg2})`,
                  borderRadius: 14, padding: "18px 10px", cursor: "pointer",
                  color: "#fff", fontWeight: 700, fontSize: 16,
                }}>
                <div style={{ fontSize: 22 }}>{t.name}</div>
                <div style={{ opacity: 0.75, fontSize: 13, marginTop: 2 }}>{t.en}</div>
              </button>
            ))}
          </div>
        </Section>

        <Section title="Sound · Дуу">
          <Toggle label="Sound on" checked={!s.muted} onChange={(v) => setSettings({ ...s, muted: !v })} />
          <Slider label={`Volume · ${Math.round(s.volume * 100)}%`} min={0} max={1} step={0.05}
            value={s.volume} onChange={(v) => setSettings({ ...s, volume: v })} />
        </Section>

        <Section title="Motion · Хөдөлгөөн">
          <Toggle label="Screen shake" checked={s.shake} onChange={(v) => setSettings({ ...s, shake: v })} />
          <Toggle label="Attract mode (idle animations)" checked={s.attract} onChange={(v) => setSettings({ ...s, attract: v })} />
          <Slider label={`Chaos speed · ${s.chaosSpeed.toFixed(1)}×`} min={0.5} max={2} step={0.1}
            value={s.chaosSpeed} onChange={(v) => setSettings({ ...s, chaosSpeed: v })} />
          <Slider label={`Rare event rate · ${Math.round(s.rareRate * 100)}%`} min={0} max={0.15} step={0.01}
            value={s.rareRate} onChange={(v) => setSettings({ ...s, rareRate: v })} />
        </Section>

        <Section title="Smash Report · Тайлан">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Stat label="Total smashes" value={report.total} />
            <Stat label="Unique letters" value={report.uniqueLetters} />
            <Stat label="Animals seen" value={report.animals} />
            <Stat label="Magic moments" value={report.rares} />
          </div>
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: 13, color: "#666", marginBottom: 6 }}>Chaos level</div>
            <div style={{ height: 12, background: "#F0F1F4", borderRadius: 999, overflow: "hidden" }}>
              <div style={{
                width: `${Math.min(100, report.chaos * 100)}%`, height: "100%",
                background: "linear-gradient(90deg, #2D8C3C, #F2A900, #D32F2F)",
                transition: "width 200ms ease",
              }} />
            </div>
          </div>
          <button onClick={onReset} style={{
            marginTop: 14, border: "none", background: "#F0F1F4", padding: "10px 18px",
            borderRadius: 999, fontWeight: 600, fontSize: 14, cursor: "pointer", color: "#333",
          }}>Reset report</button>
        </Section>

        <Section title="Display">
          <button onClick={() => {
            if (document.fullscreenElement) document.exitFullscreen();
            else document.documentElement.requestFullscreen().catch(() => {});
          }} style={{
            width: "100%", border: "none", background: "#1a1a1a", color: "#fff",
            padding: "14px", borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: "pointer",
          }}>Toggle fullscreen</button>
        </Section>

        <div style={{ fontSize: 12, color: "#aaa", textAlign: "center", marginTop: 18 }}>
          Hold top-left corner 2s to return
        </div>
      </div>
    </div>
  );
}
