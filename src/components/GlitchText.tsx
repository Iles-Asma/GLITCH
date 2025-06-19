"use client";

import { useEffect, useRef, type RefObject } from "react";
import { VFX } from "@vfx-js/core";

type GlitchTextProps = {
  children: React.ReactNode;
  className?: string;
  triggerRef?: RefObject<HTMLElement | null>; // ✅ typage assoupli pour éviter l'erreur TS
};

export default function GlitchText({
  children,
  className = "",
  triggerRef,
}: GlitchTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = textRef.current;
    const trigger = triggerRef?.current ?? el;

    if (!el || !trigger) return;

    const vfx = new VFX();

    const handleEnter = () => {
      vfx.add(el, { shader: "rgbShift", overflow: 100 });
    };

    const handleLeave = () => {
      vfx.remove(el);
    };

    trigger.addEventListener("mouseenter", handleEnter);
    trigger.addEventListener("mouseleave", handleLeave);

    return () => {
      trigger.removeEventListener("mouseenter", handleEnter);
      trigger.removeEventListener("mouseleave", handleLeave);
      vfx.remove(el);
    };
  }, [triggerRef]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
}
