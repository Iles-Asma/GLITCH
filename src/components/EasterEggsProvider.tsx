// components/EasterEggsProvider.tsx
"use client";

import React from "react";
import { useEasterEggs } from "../lib/hooks/useEasterEggs";

interface EasterEggsProviderProps {
	children: React.ReactNode;
}

const EasterEggsProvider: React.FC<EasterEggsProviderProps> = ({
	children,
}) => {
	// Active les easter eggs globalement
	useEasterEggs();

	return <>{children}</>;
};

export default EasterEggsProvider;
