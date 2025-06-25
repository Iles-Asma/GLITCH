// app/surprise/SurpriseClient.tsx
"use client";

import React, { useState, useEffect } from "react";
import SurpriseModal from "../../components/SurpriseModal";
import { useEasterEggs } from "../../lib/hooks/useEasterEggs";

const SurpriseClient: React.FC = () => {
	const [showModal, setShowModal] = useState(false);

	// Initialise les easter eggs sur cette page
	useEasterEggs();

	useEffect(() => {
		// Affiche automatiquement la modal quand on arrive sur la page
		const timer = setTimeout(() => {
			setShowModal(true);
		}, 1000); // Délai de 1 seconde pour laisser la page se charger

		return () => clearTimeout(timer);
	}, []);

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleShowModal = () => {
		setShowModal(true);
	};

	return (
		<>
			{/* Bouton flottant pour ré-ouvrir la modal */}
			<button
				onClick={handleShowModal}
				className="floating-easter-btn"
				title="Easter Eggs"
			>
				🥚
			</button>

			<SurpriseModal isOpen={showModal} onClose={handleCloseModal} />
		</>
	);
};

export default SurpriseClient;
