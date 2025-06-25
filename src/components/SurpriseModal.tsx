// components/SurpriseModal.tsx
import React from "react";

interface SurpriseModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const SurpriseModal: React.FC<SurpriseModalProps> = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div className="surprise-modal" onClick={handleBackdropClick}>
			<div className="surprise-modal-content">
				<h2>🎉 Easter Eggs Découverts ! 🎉</h2>
				<p>
					Des easter eggs sont disponibles sur la plateforme !
					Utilisez votre clavier pour les découvrir :
				</p>

				<div className="surprise-modal-keys">
					<div className="surprise-key">
						<span>Nyan Cats</span>
						<span className="surprise-key-button">N</span>
					</div>
					<div className="surprise-key">
						<span>Gif Surprise</span>
						<span className="surprise-key-button">G</span>
					</div>
					<div className="surprise-key">
						<span>Son Nokia</span>
						<span className="surprise-key-button">S</span>
					</div>
					<div className="surprise-key">
						<span>Comic Sans</span>
						<span className="surprise-key-button">C</span>
					</div>
				</div>

				<p style={{ fontSize: "0.9rem", fontStyle: "italic" }}>
					Appuyez sur les touches correspondantes pour activer les
					effets !
				</p>

				<button className="close-modal-btn" onClick={onClose}>
					Fermer
				</button>
			</div>
		</div>
	);
};

export default SurpriseModal;
