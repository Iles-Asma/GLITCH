import { FC } from "react";
import {
	PrismicRichText,
	SliceComponentProps,
	PrismicImage,
} from "@prismicio/react";
import Link from "next/link";
import { Content } from "@prismicio/client";
import styles from "./hero.module.css";

type HeroProps = SliceComponentProps<Content.HeroSlice, { featured: any }>;

const Hero: FC<HeroProps> = ({ slice, context }) => {
	const article = context?.featured;

	if (!article) return null;

	return (
		<section
			className={styles.heroSection}
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<div className={styles.textContainer}>
				<div className={styles.title}>
					<PrismicRichText field={article.data.articletitle} />
				</div>
				<div className={styles.abstract}>
					<PrismicRichText field={article.data.abstract} />
				</div>

				<Link
					href={`/article/${article.uid}`}
					className={styles.button}
				>
					découvrir
				</Link>
			</div>

			<div className={styles.imageContainer}>
				<PrismicImage
					field={article.data.articleimage}
					className={styles.image}
				/>
			</div>
		</section>
	);
};

export default Hero;
