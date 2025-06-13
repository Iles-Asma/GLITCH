import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { PrismicRichText, SliceZone, PrismicImage } from "@prismicio/react";
import Link from "next/link";
import styles from "./page.module.css";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
  const client = createClient();

  // Get homepage content
  const page = await client
    .getSingle("homepage", {
      fetchLinks: ["ArticleTitle", "articledescription"],
    })
    .catch(() => notFound());

  // Fetch all articles
  const allArticles = await client.getAllByType("article");

  // Sort by custom date field (oldest first), safely handle nulls
  const sortedArticles = allArticles
    .filter((article) => article.data.date)
    .sort((a, b) => {
      const dateA = a.data.date ?? "";
      const dateB = b.data.date ?? "";
      return new Date(dateB).getTime() -new Date(dateA).getTime();
	  
    });

  return (
    <>
      <div className={styles.pageTitle}>
        <PrismicRichText field={page.data.title} />
      </div>

      {/* Hero section — articles affichés directement après le titre */}
      <section className={styles.articleList}>
        {sortedArticles.map((article) => (
          <Link
            key={article.id}
            href={`/article/${article.uid}`}
            className={styles.articleCard}
          >
            <PrismicImage field={article.data.articleimage} />
            <PrismicRichText field={article.data.articletitle} />
          </Link>
        ))}
      </section>

<SliceZone
  slices={page.data.slices}
  components={components}
  context={{ featured: sortedArticles[0] }}
/>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("homepage").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}
