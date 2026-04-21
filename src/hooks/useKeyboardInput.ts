import { useEffect, useRef, useState, useCallback } from "react";
import letters, { LetterData } from "@/data/letters";
import animalsData, { AnimalData } from "@/data/animals";

type Stats = { totalKeys: number; startTime: number; lastKey: string; streak: number };

type TouchPoint = { x: number; y: number };

type State = {
  currentLetter: LetterData | null;
  stats: Stats;
  animal: AnimalData | null;
  touchPoint: TouchPoint | null;
};

const PASSTHROUGH_KEYS = new Set(["Escape", "F11"]);

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function useKeyboardInput() {
  const [state, setState] = useState<State>({
    currentLetter: null,
    stats: { totalKeys: 0, startTime: Date.now(), lastKey: "", streak: 0 },
    animal: null,
    touchPoint: null,
  });

  const lastEventTime = useRef(0);
  const totalKeysRef = useRef(0);

  const trigger = useCallback((key: string, point: TouchPoint | null = null) => {
    const now = Date.now();
    if (now - lastEventTime.current < 100) return;
    lastEventTime.current = now;

    totalKeysRef.current += 1;
    const total = totalKeysRef.current;
    const letter = randomFrom(letters);
    const animal = total % 5 === 0 ? randomFrom(animalsData) : null;

    setState((prev) => ({
      currentLetter: letter,
      animal,
      touchPoint: point,
      stats: {
        totalKeys: total,
        startTime: prev.stats.startTime,
        lastKey: key,
        streak: prev.stats.streak + 1,
      },
    }));
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (PASSTHROUGH_KEYS.has(e.key)) return;
      if ((e.metaKey && e.key === "q") || (e.ctrlKey && e.key === "w")) return;
      e.preventDefault();
      trigger(e.key, null);
    };

    const onMouse = (e: MouseEvent) => {
      e.preventDefault();
      trigger("pointer", { x: e.clientX, y: e.clientY });
    };

    const onTouch = (e: TouchEvent) => {
      e.preventDefault();
      Array.from(e.changedTouches).forEach((t) => {
        trigger("touch", { x: t.clientX, y: t.clientY });
      });
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onMouse);
    window.addEventListener("touchstart", onTouch, { passive: false });

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onMouse);
      window.removeEventListener("touchstart", onTouch);
    };
  }, [trigger]);

  return state;
}
