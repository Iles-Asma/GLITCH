import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc, asLink } from "@prismicio/client";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import GlitchLink from "@/components/GlitchLink";
import { PrismicRichText, SliceZone, PrismicImage } from "@prismicio/react";
import styles from "./page.module.css";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
	const { uid } = await params; // Await the params Promise
	const client = createClient();

	const page = await client.getByUID("article", uid).catch(() => notFound());

	const pdfUrl = asLink(page.data.pdf);

	return (
		<div className={styles.articleWrapper}>
			{/* Slices */}
			<SliceZone slices={page.data.slices} components={components} />

			{/* Image */}
			<div className={styles.imageWrapper}>
				<PrismicImage field={page.data.articleimage} />
			</div>

			{/* Title + Description */}
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

			{/* PDF Link */}
			{pdfUrl && (
				<div className={styles.glitchLinkFixedWrapper}>
					<GlitchLink href={pdfUrl} className={styles.downloadBtn}>
						TÉLÉCHARGER
					</GlitchLink>
				</div>
			)}
		</div>
	);
}

// SEO
export async function generateMetadata({
	params,
}: {
	params: Promise<Params>; // Change to Promise<Params>
}): Promise<Metadata> {
	const { uid } = await params; // Await the params Promise
	const client = createClient();
	const page = await client.getByUID("article", uid).catch(() => notFound());

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
