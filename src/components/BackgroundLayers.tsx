"use client";

import type { Theme } from "@/lib/data";

export function GlowLayer({ theme }: { theme: Theme }) {
  const lefts = [10, 70, 30, 85];
  const tops = [15, 60, 80, 25];
  const sizes = [280, 360, 220, 320];
  const colors = [theme.glow, theme.accent, theme.bg1, theme.glow];

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${lefts[i]}%`, top: `${tops[i]}%`,
          width: sizes[i], height: sizes[i],
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors[i]}55, transparent 65%)`,
          filter: "blur(20px)",
          animation: `glow-float${i} ${8 + i * 2}s ease-in-out infinite alternate`,
        }} />
      ))}
    </div>
  );
}

export function PaperLayer({ theme }: { theme: Theme }) {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.6 }}>
        <defs>
          <filter id="rough">
            <feTurbulence baseFrequency="0.9" numOctaves={2} />
            <feDisplacementMap in="SourceGraphic" scale={2} />
          </filter>
        </defs>
        <circle cx="12%" cy="18%" r={80} fill={theme.accent} opacity="0.35" filter="url(#rough)" />
        <circle cx="85%" cy="75%" r={110} fill={theme.bg1} opacity="0.4" filter="url(#rough)" />
        <ellipse cx="70%" cy="20%" rx={140} ry={50} fill="#fff" opacity="0.35" filter="url(#rough)" />
        <ellipse cx="20%" cy="80%" rx={180} ry={55} fill="#fff" opacity="0.3" filter="url(#rough)" />
      </svg>
    </div>
  );
}
