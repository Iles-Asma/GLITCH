"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { PrismicImage, PrismicImageProps } from "@prismicio/react";
import styles from "./GlitchedImage.module.css";

type GlitchedImageProps = PrismicImageProps;

export default function GlitchedImage(props: GlitchedImageProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Détection de la largeur
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    if (!mobile) return; // ❌ pas d’animation ni overlay sur desktop

    const img = wrapperRef.current?.querySelector("img");
    const overlay = overlayRef.current;
    if (!img || !overlay) return;

    // 🎥 Bande noire : animation
    gsap.to(overlay, {
      y: "100%",
      duration: 2.5,
      ease: "steps(15)",
      delay: 0.3,
      onComplete: () => {
        overlay.style.display = "none";
      },
    });

    // ⚡ Glitch
    const timeline = gsap.timeline({
      repeat: -1,
      repeatDelay: gsap.utils.random(0.1, 0.25),
    });

    timeline
      .to(img, {
        duration: 0.04,
        x: gsap.utils.random(-5, 5),
        y: gsap.utils.random(-5, 5),
        ease: "steps(1)",
      })
      .to(img, {
        duration: 0.04,
        x: 0,
        y: 0,
        ease: "steps(1)",
      })
      .to(img, {
        duration: 0.04,
        filter:
          "drop-shadow(-2px 0 red) drop-shadow(2px 0 cyan) drop-shadow(0 2px lime) brightness(1.3) contrast(1.2)",
        ease: "steps(1)",
      })
      .to(img, {
        duration: 0.04,
        filter: "none",
        ease: "steps(1)",
      });

    const timeout = setTimeout(() => {
      timeline.pause(0);
      gsap.set(img, { x: 0, y: 0, filter: "none" });
    }, 3000);

    return () => {
      clearTimeout(timeout);
      timeline.kill();
    };
  }, []);

  return (
    <div className={styles.glitchWrapper} ref={wrapperRef}>
      {/* ✅ Overlay affiché uniquement si mobile */}
      {isMobile && <div className={styles.glitchOverlay} ref={overlayRef} />}
      <PrismicImage {...props} className={styles.image} />
    </div>
  );
}
