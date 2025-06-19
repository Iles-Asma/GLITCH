"use client";

import { useEffect, useRef } from "react";
import { VFX } from "@vfx-js/core";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function GlitchLink({ href, children, className }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const vfx = new VFX();
    const el = ref.current;

    const onEnter = () => {
      vfx.add(el, {
        shader: "rgbShift",
        overflow: 100,
        uniforms: {
          amount: 0.025,
        },
      });
    };

    const onLeave = () => {
      vfx.remove(el);
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      vfx.remove(el);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
