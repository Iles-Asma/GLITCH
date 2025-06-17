import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getNavigation } from "@/lib/getNavigation";
import { getPageTitle } from "@/lib/getPageTitle";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
	title: "bug",
	description: "bug magazine des cultures numériques",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const navigation = await getNavigation();
	const pageTitle = await getPageTitle();
	const slice = navigation.data.slices?.[0];

	return (
		<html lang="fr">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<div className="global-page-title">
					<PrismicRichText field={pageTitle.data.title} />
				</div>

				<header className="custom-nav">
					<div className="custom-nav-left">
						{slice?.primary.left_links?.map((item: any, index: number) => (
							<PrismicLink field={item.link} key={index}>
								{item.link?.text || "Lien"}
							</PrismicLink>
						))}
					</div>

					<div className="custom-nav-center">
						<PrismicRichText field={slice?.primary.center_title} />
					</div>

					<div className="custom-nav-right">
						{slice?.primary.right_links?.map((item: any, index: number) => (
							<PrismicLink field={item.link} key={index}>
								{item.link?.text || "Lien"}
							</PrismicLink>
						))}
					</div>
				</header>

				{children}
			</body>
		</html>
	);
}
