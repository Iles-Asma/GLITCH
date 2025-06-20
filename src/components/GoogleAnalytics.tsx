// components/GoogleAnalytics.tsx
import Script from "next/script";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
	// Ne pas charger GA en développement (optionnel)
	if (process.env.NODE_ENV === "development") {
		console.log("⚠️ Google Analytics désactivé en développement");
		return null;
	}

	if (!GA_MEASUREMENT_ID) {
		console.warn(
			"❌ Google Analytics: NEXT_PUBLIC_GA_MEASUREMENT_ID non défini"
		);
		return null;
	}

	return (
		<>
			{/* Script Google Tag Manager */}
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
				strategy="afterInteractive"
			/>

			{/* Script de configuration */}
			<Script id="google-analytics-config" strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${GA_MEASUREMENT_ID}', {
						page_title: document.title,
						page_location: window.location.href,
						anonymize_ip: true
					});
				`}
			</Script>
		</>
	);
}
