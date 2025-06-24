/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import PageWrapper from "@/components/PageWrapper";
import ClientGlobalTitle from "@/components/ClientGlobalTitle";
import GoogleAnalytics from "@/components/GoogleAnalytics";

import { Geist, Geist_Mono } from "next/font/google";
import { getNavigation } from "@/lib/getNavigation";
import { getPageTitle } from "@/lib/getPageTitle";
import { getFooter } from "@/lib/getFooter";

import { PrismicLink } from "@prismicio/react";
import "./globals.css";

// Client wrapper to handle footer display
import { LayoutWrapper } from "@/components/LayoutWrapper";
import { MobileNav } from "@/components/MobileNav";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "bug",
	description: "bug magazine des cultures numériques",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const navigation = await getNavigation();
	const pageTitle = await getPageTitle();
	const footer = await getFooter();
	const slice = navigation.data.slices?.[0];

	return (
		<html lang="fr" data-arp="">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<head>
					<GoogleAnalytics />
				</head>

				<div className="layout-wrapper">
					{/* Page Title */}
					<div className="global-page-title">
						<ClientGlobalTitle title={pageTitle.data.title} />
					</div>

					{/* Navigation */}
					<header className="custom-nav">
						{/* Desktop Navigation */}
						<div className="custom-nav-left">
							{slice?.primary.left_links?.map(
								(item: any, index: number) => (
									<PrismicLink field={item.link} key={index}>
										{item.link?.text || "Lien"}
									</PrismicLink>
								)
							)}
						</div>

						<div className="custom-nav-center">
							<PrismicLink field={slice?.primary.center_title}>
								{slice?.primary.center_title?.text || "Accueil"}
							</PrismicLink>
						</div>

						<div className="custom-nav-right">
							{slice?.primary.right_links?.map(
								(item: any, index: number) => (
									<PrismicLink field={item.link} key={index}>
										{item.link?.text || "Lien"}
									</PrismicLink>
								)
							)}
						</div>

						{/* Mobile Navigation */}
						<MobileNav
							centerTitle={
								slice?.primary.center_title?.text || "BUG"
							}
							centerTitleLink={slice?.primary.center_title}
							leftLinks={slice?.primary.left_links || []}
							rightLinks={slice?.primary.right_links || []}
						/>
					</header>

					{/* Page content */}
					<main className="page-main">
						<PageWrapper>{children}</PageWrapper>
					</main>
					{/* Footer (not shown on /article/*) */}
					<LayoutWrapper footerSlices={footer.data.slices} />
				</div>
			</body>
		</html>
	);
}
