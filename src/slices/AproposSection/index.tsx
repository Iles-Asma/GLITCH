import { FC } from "react";
import { Content } from "@prismicio/client";
import {
	SliceComponentProps,
	PrismicRichText,
	PrismicImage,
} from "@prismicio/react";
import styles from "./apropos.module.css";

export type IntroTextVisualsProps =
	SliceComponentProps<Content.IntroTextVisualsSlice>;

const IntroTextVisuals: FC<IntroTextVisualsProps> = ({ slice }) => {
	return (
		<section
			className={styles.section}
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			{/* Premier container : titre + main_text + deux colonnes de texte */}
			<div className={styles.containerTextColumns}>
				<div className={styles.titleAndMainText}>
					<PrismicRichText field={slice.primary.title} />
					<PrismicRichText field={slice.primary.main_text} />
				</div>

				{slice.primary.maintext &&
					Array.isArray(slice.primary.maintext) && (
						<div className={styles.columns}>
							{slice.primary.maintext.map((item, index) => (
								<div key={index} className={styles.columnPair}>
									<div className={styles.leftColumn}>
										<PrismicRichText
											field={item.leftcolumntext}
										/>
									</div>
									<div className={styles.rightColumn}>
										<PrismicRichText
											field={item.rightcolumntext}
										/>
									</div>
								</div>
							))}
						</div>
					)}
			</div>

			{/* Deuxième container : image principale pleine largeur */}
			{slice.primary.main_visual && (
				<div className={styles.containerMainImage}>
					<PrismicImage field={slice.primary.main_visual} />
				</div>
			)}

			{/* Troisième container : images secondaires à gauche + texte à droite */}
			{slice.primary.secondary_visuals &&
				Array.isArray(slice.primary.secondary_visuals) &&
				slice.primary.secondary_visuals.length > 0 && (
					<div className={styles.containerSecondaryVisuals}>
						{slice.primary.secondary_visuals.map((item, index) => (
							<div key={index} className={styles.secondaryItem}>
								<div className={styles.imageLeft}>
									<PrismicImage
										field={item.secondary_image}
									/>
								</div>
								<div className={styles.textRight}>
									<PrismicRichText
										field={item.secondary_text}
									/>
								</div>
							</div>
						))}
					</div>
				)}
		</section>
	);
};

export default IntroTextVisuals;
