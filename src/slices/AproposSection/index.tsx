import { FC } from "react";
import { Content } from "@prismicio/client";
import {
	SliceComponentProps,
	PrismicRichText,
	PrismicImage,
} from "@prismicio/react";
import styles from "./introTextVisuals.module.css";

export type IntroTextVisualsProps =
	SliceComponentProps<Content.IntroTextVisualsSlice>;

const IntroTextVisuals: FC<IntroTextVisualsProps> = ({ slice }) => {
	return (
		<section
			className={styles.section}
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<header className={styles.header}>
				<PrismicRichText field={slice.primary.title} />
			</header>

			<div className={styles.mainContent}>
				<div className={styles.text}>
					<PrismicRichText field={slice.primary.main_text} />
				</div>
				<div className={styles.image}>
					<PrismicImage field={slice.primary.main_visual} />
				</div>
			</div>

			{slice.primary.secondary_visuals?.length > 0 && (
				<div className={styles.secondaryGrid}>
					{slice.primary.secondary_visuals.map((item, index) => (
						<div key={index} className={styles.secondaryItem}>
							<PrismicImage field={item.secondary_image} />
							<PrismicRichText field={item.secondary_text} />
						</div>
					))}
				</div>
			)}
		</section>
	);
};

export default IntroTextVisuals;
