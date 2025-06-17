import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone, PrismicRichText } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import styles from "./page.module.css";

export default async function Page() {
	const client = createClient();
	const page = await client
		.getSingle("Mentionlegale")
		.catch(() => notFound());

	return (
		<main>
			{page.data.title && (
				<div className={styles.title}>
					<PrismicRichText field={page.data.title} />
				</div>
			)}
			<SliceZone slices={page.data.slices} components={components} />
		</main>
	);
}

export async function generateMetadata(): Promise<Metadata> {
	const client = createClient();
	const page = await client
		.getSingle("Mentionlegale")
		.catch(() => notFound());

	return {
		title: page.data.meta_title,
		description: page.data.meta_description,
		openGraph: {
			images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
		},
	};
}
