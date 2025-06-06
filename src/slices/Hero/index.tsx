import { FC } from "react";
import { Content } from "@prismicio/client";
import {
	PrismicRichText,
	SliceComponentProps,
	PrismicImage,
	PrismicLink,
} from "@prismicio/react";
import styles from "./Hero.module.css";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero: FC<HeroProps> = ({ slice }) => {
	return (
		<section
			className={styles.heroSection}
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<div className={styles.textContainer}>
				<h2 className={styles.title}>{slice.primary.title}</h2>
				<div className={styles.description}>
					<PrismicRichText field={slice.primary.description} />
				</div>

				{slice.primary.button && (
					<PrismicLink
						field={slice.primary.button}
						className={styles.button}
					>
						Voir plus
					</PrismicLink>
				)}
			</div>

			<div className={styles.imageContainer}>
				<PrismicImage
					field={slice.primary.visual}
					className={styles.image}
				/>
			</div>
		</section>
	);
};

export default Hero;
