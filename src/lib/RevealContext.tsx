"use client";

import { createContext, useContext, useState } from "react";

const RevealContext = createContext<{
  revealDone: boolean;
  setRevealDone: (v: boolean) => void;
}>({
  revealDone: false,
  setRevealDone: () => {},
});

export const RevealProvider = ({ children }: { children: React.ReactNode }) => {
  const [revealDone, setRevealDone] = useState(false);
  return (
    <RevealContext.Provider value={{ revealDone, setRevealDone }}>
      {children}
    </RevealContext.Provider>
  );
};

export const useReveal = () => useContext(RevealContext);
