import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicRichText, SliceZone, PrismicImage } from "@prismicio/react";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
	const { uid } = await params;
	const client = createClient();
	const page = await client.getByUID("article", uid).catch(() => notFound());

	return (
		<>
			<SliceZone slices={page.data.slices} components={components} />;
			<PrismicImage field={page.data.articleimage} />
			<PrismicRichText field={page.data.articletitle} />
			<PrismicRichText field={page.data.articledescription} />
		</>
	);
}

export async function generateMetadata({
	params,
}: {
	params: Promise<Params>;
}): Promise<Metadata> {
	const { uid } = await params;
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

export async function generateStaticParams() {
	const client = createClient();
	const pages = await client.getAllByType("article");

	return pages.map((page) => ({ uid: page.uid }));
}
