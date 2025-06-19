"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [output, setOutput] = useState("");
  const frameRef = useRef(0);
  const iterationsRef = useRef(0);

  useEffect(() => {
    let frame = 0;
    const length = text.length;

    const scramble = () => {
      let displayed = "";
      for (let i = 0; i < length; i++) {
        if (i < iterationsRef.current) {
          displayed += text[i];
        } else {
          displayed += randomChar();
        }
      }

      setOutput(displayed);

      if (iterationsRef.current < length) {
        if (frame % 3 === 0) {
          iterationsRef.current += 1;
        }
        frameRef.current = requestAnimationFrame(scramble);
        frame++;
      } else {
        setOutput(text); // Fix final
      }
    };

    const timeout = setTimeout(() => {
      frameRef.current = requestAnimationFrame(scramble);
    }, delay * 1000);

    return () => {
      cancelAnimationFrame(frameRef.current);
      clearTimeout(timeout);
    };
  }, [text, delay]);

  return <span>{output}</span>;
}
