import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import styles from "./page.module.css"; // ou votre fichier de styles

export default async function Page() {
	const client = createClient();
	const page = await client.getSingle("surprise").catch(() => notFound());

	return (
		<main className={styles.container}>
			{page.data.surprisetitle && (
				<div className={styles.title}>
					<PrismicRichText field={page.data.surprisetitle} />
				</div>
			)}
			<SliceZone slices={page.data.slices} components={components} />
		</main>
	);
}

export async function generateMetadata(): Promise<Metadata> {
	const client = createClient();
	const page = await client.getSingle("surprise").catch(() => notFound());

	return {
		title: page.data.meta_title,
		description: page.data.meta_description,
		openGraph: {
			images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
		},
	};
}
