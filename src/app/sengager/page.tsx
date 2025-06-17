import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone, PrismicRichText } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import styles from "./page.module.css";

export default async function Page() {
	const client = createClient();
	const page = await client.getSingle("sengager").catch(() => notFound());

	return (
		<main className={styles.container}>
			{page.data.sengagerTitle && (
				<div className={styles.title}>
					<PrismicRichText field={page.data.sengagerTitle} />
				</div>
			)}

			<div className={styles.cardContainer}>
				<SliceZone slices={page.data.slices} components={components} />
			</div>
		</main>
	);
}

export async function generateMetadata(): Promise<Metadata> {
	const client = createClient();
	const page = await client.getSingle("sengager").catch(() => notFound());

	return {
		title: page.data.meta_title,
		description: page.data.meta_description,
		openGraph: {
			images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
		},
	};
}
