"use client";

import { LetterData } from "@/data/letters";

export default function LetterDisplay({ letter }: { letter: LetterData }) {
  return (
    <div className="flex flex-col items-center" style={{ animation: "letter-fade 2s forwards" }}>
      <div
        className="text-white font-bold leading-none"
        style={{ fontSize: "40vw", animation: "letter-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
      >
        {letter.letter}
      </div>
      <div className="text-white font-semibold mt-4" style={{ fontSize: "8vw" }}>
        {letter.word}
      </div>
    </div>
  );
}
