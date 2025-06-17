import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import {
  PrismicRichText,
  SliceZone,
  PrismicImage,
} from "@prismicio/react";
import Link from "next/link";
import styles from "./page.module.css";
import { createClient } from "@/prismicio";
import { components } from "@/slices";



export default async function Page() {
  const client = createClient();

  const page = await client
    .getSingle("homepage", {
      fetchLinks: ["ArticleTitle", "articledescription"],
    })
    .catch(() => notFound());

  const allArticles = await client.getAllByType("article");

  const sortedArticles = allArticles
    .filter((article) => article.data.date)
    .sort((a, b) => {
      const dateA = a.data.date ?? "";
      const dateB = b.data.date ?? "";
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });

  // ➕ Ajout d'une slice factice pour afficher dynamiquement les articles
  const slicesWithArticles = page.data.slices.map((slice) => {
    if (slice.slice_type === "articles_inject") {
      return {
        ...slice,
        component: () => (
          <section className={styles.articleList}>
            {sortedArticles.map((article) => (
              <Link
                key={article.id}
                href={`/article/${article.uid}`}
                className={styles.articleCard}
              >
                <PrismicImage field={article.data.articleimage} />
                <div className={styles.title}>
                  <PrismicRichText field={article.data.articletitle} />
                </div>
			</Link>
            ))}
          </section>
        ),
      };
    }
    return slice;
  });

  return (
    <>
      <div className={styles.pageTitle}>
        <PrismicRichText field={page.data.title} />
      </div>

      <SliceZone
        slices={slicesWithArticles}
        components={{
          ...components,
          articles_inject: ({ slice }) => slice.component?.(),
        }}
        context={{ featured: sortedArticles[0] }}
      />
    </>
  );
}

// SEO
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
