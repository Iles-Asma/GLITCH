"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { VFX } from "@vfx-js/core";
import styles from "@/slices/Hero/hero.module.css"; // ✅ adapte selon ton chemin

export default function GlitchButton({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;
    const vfx = new VFX();

    const handleEnter = () => {
      vfx.add(buttonRef.current!, { shader: "rgbShift", overflow: 100 });
    };
    const handleLeave = () => {
      vfx.remove(buttonRef.current!);
    };

    const btn = buttonRef.current;
    btn.addEventListener("mouseenter", handleEnter);
    btn.addEventListener("mouseleave", handleLeave);

    return () => {
      btn.removeEventListener("mouseenter", handleEnter);
      btn.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <Link href={href} className={styles.button} ref={buttonRef}>
      {children}
    </Link>
  );
}
