import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import styles from "./page.module.css";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
	const client = createClient();
	const page = await client
		.getSingle("homepage", {
			fetchLinks: ["ArticleTitle", "articleDescription"],
		})
		.catch(() => notFound());

	// console.log(page.data.articleitem[0]?.articles.id);

	const ids = page.data.articleitem.map((item: any) => item.articles.id);
	const tests = await Promise.all(
		ids.map((id: string) => client.getByID(id))
	);

	// const test = await client.getByID(id);
	// const test = await client.getByUIDs("article", ["article-test"]);

	console.log("Page data:", tests);

	return (
		<>
			<div className={styles.pageTitle}>
				<PrismicRichText field={page.data.title} />
			</div>
			<SliceZone slices={page.data.slices} components={components} />
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
