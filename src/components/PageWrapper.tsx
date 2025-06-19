"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current, {
        opacity: 1,
        duration: 2,
        delay: .7,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <div ref={ref} className="fade-wrapper">
      {children}
    </div>
  );
}
