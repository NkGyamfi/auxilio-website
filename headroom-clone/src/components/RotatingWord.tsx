"use client";

import { useEffect, useState } from "react";
import { HERO_CAROUSEL_WORDS } from "@/types/headroom";

const DISPLAY_MS = 2200;

const LONGEST_WORD = HERO_CAROUSEL_WORDS.reduce((a, b) =>
  a.length >= b.length ? a : b,
);

export function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_CAROUSEL_WORDS.length);
    }, DISPLAY_MS);
    return () => clearInterval(id);
  }, []);

  const word = `${HERO_CAROUSEL_WORDS[index]}.`;

  return (
    <span className="relative z-20 inline-block h-[1.12em] origin-center overflow-visible whitespace-nowrap text-left align-baseline">
      <span className="invisible inline-block whitespace-nowrap">
        {LONGEST_WORD}.
      </span>
      <span
        key={index}
        className="animate-ai-blur-in absolute left-0 top-0 inline-block origin-bottom whitespace-nowrap motion-reduce:animate-none"
      >
        {word}
      </span>
      <span
        key={`glitch-${index}`}
        className="pointer-events-none absolute inset-0 motion-reduce:hidden"
      >
        <span
          aria-hidden
          className="animate-ai-glitch-top absolute inset-0 text-white"
          style={{
            clipPath: "inset(0px 0px 58%)",
            textShadow: "rgba(255, 255, 255, 0.32) 8px 0px 0px",
          }}
        >
          {word}
        </span>
        <span
          aria-hidden
          className="animate-ai-glitch-bottom absolute inset-0 text-white"
          style={{
            clipPath: "inset(48% 0px 0px)",
            textShadow: "rgba(255, 255, 255, 0.28) -7px 0px 0px",
          }}
        >
          {word}
        </span>
      </span>
    </span>
  );
}
