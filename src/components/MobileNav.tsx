"use client";

import { useState } from "react";
import { PrismicLink } from "@prismicio/react";

interface MobileNavProps {
	centerTitle: string;
	leftLinks: any[];
	rightLinks: any[];
}

export function MobileNav({
	centerTitle,
	leftLinks,
	rightLinks,
}: MobileNavProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<div className="mobile-nav">
			{/* Top section avec BUG | MENU */}
			<div className="mobile-nav-header">
				<div className="mobile-nav-title">{centerTitle}</div>
				<button className="mobile-nav-menu-btn" onClick={toggleMenu}>
					MENU
				</button>
			</div>

			{/* Sous-titre */}
			<div className="mobile-nav-subtitle">
				JOURNAL DES CULTURES NUMÉRIQUES
			</div>

			{/* Menu déroulant */}
			{isMenuOpen && (
				<div className="mobile-menu-dropdown">
					{leftLinks.map((item: any, index: number) => (
						<PrismicLink
							field={item.link}
							key={`left-${index}`}
							className="mobile-menu-item"
							onClick={() => setIsMenuOpen(false)}
						>
							{item.link?.text || "Lien"}
						</PrismicLink>
					))}
					{rightLinks.map((item: any, index: number) => (
						<PrismicLink
							field={item.link}
							key={`right-${index}`}
							className="mobile-menu-item"
							onClick={() => setIsMenuOpen(false)}
						>
							{item.link?.text || "Lien"}
						</PrismicLink>
					))}
				</div>
			)}
		</div>
	);
}
