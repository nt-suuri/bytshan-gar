"use client";

import { useCallback, useState } from "react";
import {
  playRandomNote,
  playPop,
  setVolume as audioSetVolume,
  setMuted as audioSetMuted,
} from "@/lib/audio";

export default function useAudio() {
  const [isMuted, setIsMutedState] = useState(false);

  const playSmash = useCallback(() => {
    playRandomNote();
    playPop();
  }, []);

  const setVolume = useCallback((v: number) => {
    audioSetVolume(v);
  }, []);

  const setMuted = useCallback((m: boolean) => {
    audioSetMuted(m);
    setIsMutedState(m);
  }, []);

  return { playSmash, setVolume, setMuted, isMuted };
}
