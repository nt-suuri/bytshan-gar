"use client";

import { useEffect, useRef, useState } from "react";

const MN_COLORS = ["#0066B3", "#F2A900", "#2D8C3C", "#D32F2F", "#FAFAFA"];

type Particle = {
  id: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
};

let pid = 0;

function spawnBurst(): Particle[] {
  const count = 15 + Math.floor(Math.random() * 6);
  return Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 40 + Math.random() * 60;
    return {
      id: pid++,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color: MN_COLORS[Math.floor(Math.random() * MN_COLORS.length)],
      size: 8 + Math.random() * 12,
    };
  });
}

export default function ParticleSystem({ trigger }: { trigger: number }) {
  const [bursts, setBursts] = useState<{ id: number; particles: Particle[] }[]>([]);
  const prevTrigger = useRef(-1);

  useEffect(() => {
    if (trigger === prevTrigger.current || trigger === 0) return;
    prevTrigger.current = trigger;

    const burstId = Date.now();
    setBursts((b) => [...b, { id: burstId, particles: spawnBurst() }]);

    const t = setTimeout(() => {
      setBursts((b) => b.filter((x) => x.id !== burstId));
    }, 1200);

    return () => clearTimeout(t);
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 40 }}>
      {bursts.map((burst) =>
        burst.particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: "50%",
              top: "50%",
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              marginLeft: -p.size / 2,
              marginTop: -p.size / 2,
              animation: "particle-burst 1s ease-out forwards",
              "--vx": `${p.vx}px`,
              "--vy": `${p.vy}px`,
            } as React.CSSProperties}
          />
        ))
      )}
    </div>
  );
}
