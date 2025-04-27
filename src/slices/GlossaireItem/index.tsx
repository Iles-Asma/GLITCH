"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";

/**
 * Props pour `GlossaireItem`.
 */
export type GlossaireItemProps =
	SliceComponentProps<Content.GlossaireItemSlice>;

/**
 * Composant pour les Slices "GlossaireItem" avec styles intégrés.
 */
const GlossaireItem: FC<GlossaireItemProps> = ({ slice }) => {
	// Hypothèse : Vos champs s'appellent 'term' et 'description' dans la section 'primary' du Slice.
	// Adaptez si nécessaire selon votre modèle Prismic.
	const title = slice.primary.glossairetitle;
	const description = slice.primary.glossaire_description;

	return (
		<>
			{" "}
			{/* Fragment React nécessaire pour encapsuler le composant et le style */}
			<section
				data-slice-type={slice.slice_type}
				data-slice-variation={slice.variation}
				className="glossary-item" // Classe CSS simple utilisée ci-dessous
			>
				{/* Conteneur pour le terme (colonne de gauche) */}
				{title && ( // Ne rendre que si le champ 'term' a du contenu
					<div className="term-container">
						{/* Utilisation de PrismicText pour le Key Text */}
						{/* Note : wrapper="h2" génère une balise h2, stylisée ci-dessous */}
						<h2>{title}</h2>
					</div>
				)}

				{/* Conteneur pour la définition (colonne de droite) */}
				{description && ( // Ne rendre que si le champ 'description' a du contenu
					<div className="description-container">
						{/* Utilisation de PrismicRichText pour le Rich Text */}
						<PrismicRichText
							field={slice.primary.glossaire_description}
						/>
					</div>
				)}
			</section>
			{/* Styles JSX - CSS intégré et scopé à ce composant */}
			<style jsx>{`
				.glossary-item {
					display: flex;
					align-items: stretch;
					background-color: #4a4a4a; /* Fond global (peut être omis si la page parente gère le fond) */
					margin-bottom: 1rem;
					box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
					overflow: hidden;
				}

				.term-container {
					background-color: #2a2a2a;
					color: #ffffff;
					padding: 2rem;
					display: flex;
					align-items: center;
					justify-content: center;
					flex: 1;
					min-width: 200px;
					/* Important: Pour cibler le h2 généré par PrismicText */
					/* Il faut le faire de manière globale ou utiliser :global() si nécessaire, */
					/* mais souvent le ciblage direct fonctionne si le h2 est le seul enfant. */
					/* Ici, on cible directement h2 à l'intérieur de .term-container */
				}

				.term-container :global(h2) {
					/* Utilisation de :global pour cibler l'élément h2 généré */
					font-size: 3rem;
					font-weight: bold;
					margin: 0;
					text-align: center;
					line-height: 1.1;
				}

				.description-container {
					background-color: #ffffff;
					color: #333333;
					padding: 2rem;
					flex: 3;
					font-family: monospace;
					font-size: 0.9rem;
					line-height: 1.6;
				}

				/* Cibler les paragraphes générés par PrismicRichText */
				.description-container :global(p) {
					margin-bottom: 1em;
				}
				.description-container :global(p:last-child) {
					margin-bottom: 0;
				}

				/* Responsive */
				@media (max-width: 768px) {
					.glossary-item {
						flex-direction: column;
					}

					.term-container {
						min-width: auto;
						justify-content: flex-start;
						text-align: left;
						padding: 1rem;
					}

					.term-container :global(h2) {
						/* Cible globale nécessaire ici aussi */
						font-size: 2rem;
						text-align: left;
					}

					.description-container {
						padding: 1rem;
					}
				}
			`}</style>
		</>
	);
};

export default GlossaireItem;
