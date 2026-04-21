"use client";

type EffectBase = { id: number; kind: string; createdAt: number; duration: number };
export type EmojiPopEffect = EffectBase & { kind: "emojiPop"; x: number; y: number; emoji: string; name: string; color: string; particles: { angle: number; dist: number; size: number; color: string }[] };
export type AnimalEffect = EffectBase & { kind: "animal"; emoji: string; fromLeft: boolean; y: number; size: number };
export type ColorFlashEffect = EffectBase & { kind: "colorFlash"; color: string };
export type ComboRingEffect = EffectBase & { kind: "comboRing"; x: number; y: number; color: string };

export type Effect = EmojiPopEffect | AnimalEffect | ColorFlashEffect | ComboRingEffect;

export function EmojiPop({ eff }: { eff: EmojiPopEffect }) {
  return (
    <div style={{ position: "absolute", left: eff.x, top: eff.y, transform: "translate(-50%,-50%)", pointerEvents: "none" }}>
      {/* Expanding ring */}
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        width: 180, height: 180, marginLeft: -90, marginTop: -90,
        borderRadius: "50%",
        border: `5px solid ${eff.color}`,
        animation: `eff-ring-expand ${eff.duration}ms ease-out forwards`,
      }} />
      {/* Emoji bubble */}
      <div style={{
        width: 180, height: 180, borderRadius: "50%",
        background: `radial-gradient(circle at 35% 30%, ${eff.color}cc, ${eff.color}88)`,
        boxShadow: `0 16px 40px ${eff.color}55`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 90, lineHeight: 1,
        animation: `eff-pop-bubble ${eff.duration}ms ease-out forwards`,
      }}>{eff.emoji}</div>
      {/* Particles */}
      {eff.particles.map((p, i) => (
        <div key={i} style={{
          position: "absolute", left: "50%", top: "50%",
          width: p.size, height: p.size, marginLeft: -p.size / 2, marginTop: -p.size / 2,
          borderRadius: "50%", background: p.color,
          animation: `eff-particle ${eff.duration * 0.8}ms ease-out forwards`,
          "--dx": `${Math.cos(p.angle) * p.dist}px`,
          "--dy": `${Math.sin(p.angle) * p.dist + 120}px`,
        } as React.CSSProperties} />
      ))}
    </div>
  );
}

export function FlyingAnimal({ eff }: { eff: AnimalEffect }) {
  return (
    <div style={{
      position: "fixed", top: eff.y,
      left: eff.fromLeft ? -150 : "auto",
      right: eff.fromLeft ? "auto" : -150,
      fontSize: eff.size,
      transform: `scaleX(${eff.fromLeft ? 1 : -1})`,
      pointerEvents: "none",
      filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.2))",
      animation: `${eff.fromLeft ? "eff-fly-right" : "eff-fly-left"} ${eff.duration}ms ease-in-out forwards`,
    }}>{eff.emoji}</div>
  );
}

export function ColorFlash({ eff }: { eff: ColorFlashEffect }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: eff.color,
      pointerEvents: "none", mixBlendMode: "screen",
      animation: `eff-flash ${eff.duration}ms ease-out forwards`,
    }} />
  );
}

export function ComboRing({ eff }: { eff: ComboRingEffect }) {
  return (
    <div style={{
      position: "absolute", left: eff.x, top: eff.y,
      width: 250, height: 250, marginLeft: -125, marginTop: -125,
      borderRadius: "50%",
      border: `6px solid ${eff.color}`,
      pointerEvents: "none",
      boxShadow: `0 0 40px ${eff.color}`,
      animation: `eff-ring-expand ${eff.duration}ms ease-out forwards`,
    }} />
  );
}
