"use client";

import { useEffect, useState } from "react";
import { AnimalData } from "@/data/animals";

type Edge = "left" | "right" | "top" | "bottom";

function randomEdge(): Edge {
  return (["left", "right", "top", "bottom"] as Edge[])[Math.floor(Math.random() * 4)];
}

function edgeStyle(edge: Edge): React.CSSProperties {
  switch (edge) {
    case "left":   return { left: "-20vw", top: "40vh" };
    case "right":  return { right: "-20vw", top: "40vh" };
    case "top":    return { top: "-20vw", left: "40vw" };
    case "bottom": return { bottom: "-20vw", left: "40vw" };
  }
}

function animationName(edge: Edge): string {
  switch (edge) {
    case "left":   return "fly-left-to-right";
    case "right":  return "fly-right-to-left";
    case "top":    return "fly-top-to-bottom";
    case "bottom": return "fly-bottom-to-top";
  }
}

export default function AnimalSprite({ animal }: { animal: AnimalData }) {
  const [visible, setVisible] = useState(true);
  const edge = useState<Edge>(() => randomEdge())[0];

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 3100);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed pointer-events-none"
      style={{
        ...edgeStyle(edge),
        fontSize: "20vw",
        animation: `${animationName(edge)} 3s ease-in-out forwards`,
        zIndex: 50,
      }}
    >
      {animal.emoji}
    </div>
  );
}
