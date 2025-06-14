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
        <h2 className={styles.title}>
          <PrismicRichText field={article.data.articletitle} />
        </h2>
        <div className={styles.description}>
          <PrismicRichText field={article.data.articledescription} />
        </div>

        <Link href={`/article/${article.uid}`} className={styles.button}>
          Voir plus
        </Link>
      </div>

      <div className={styles.imageContainer}>
        <PrismicImage field={article.data.articleimage} className={styles.image} />
      </div>
    </section>
  );
};

export default Hero;
