"use client";

import { useEffect, useRef } from "react";

type Props = { x: number; y: number; id: number };

export default function TouchRipple({ x, y, id }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const timer = setTimeout(() => el.remove(), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={ref}
      key={id}
      style={{
        position: "fixed",
        left: x - 40,
        top: y - 40,
        width: 80,
        height: 80,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.5)",
        pointerEvents: "none",
        animation: "ripple 0.6s ease-out forwards",
      }}
    />
  );
}
