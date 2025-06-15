import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicRichText, SliceZone, PrismicImage } from "@prismicio/react";
import styles from "./page.module.css";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const { uid } = params;
  const client = createClient();
  const page = await client.getByUID("article", uid).catch(() => notFound());

  return (
    <div className={styles.articleWrapper}>
      {/* Optional: display slices */}
      <SliceZone slices={page.data.slices} components={components} />

      {/* Image */}
      <div className={styles.imageWrapper}>
        <PrismicImage field={page.data.articleimage} />
      </div>

      {/* Title and description */}
      <div className={styles.textBlock}>
        <PrismicRichText
          field={page.data.articletitle}
          components={{
            heading1: ({ children }) => (
              <h1 className={styles.title}>{children}</h1>
            ),
          }}
        />

        <div className={styles.description}>
          <PrismicRichText field={page.data.articledescription} />
        </div>
      </div>

      {/* PDF Link (if exists) */}
      {page.data.pdf && "url" in page.data.pdf && page.data.pdf.url && (
        <a
          href={page.data.pdf.url}
          className={styles.downloadBtn}
          target="_blank"
          rel="noopener noreferrer"
        >
          TÉLÉCHARGER
        </a>
      )}
    </div>
  );
}

// Metadata
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client.getByUID("article", params.uid).catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

// Static paths
export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("article");
  return pages.map((page) => ({ uid: page.uid }));
}
