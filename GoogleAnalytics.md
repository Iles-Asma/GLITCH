# 📊 Intégration de Google Analytics 4 (GA4)

## ✅ Étape 1 — Créer un compte Google Analytics

1. Allez [https://analytics.google.com/](https://analytics.google.com/)
2. Connectez-vous avec un compte Google (ou crée-en un si nécessaire)
3. Crée un **compte Google Analytics**
    - Donnez-lui un nom (ex : "buglejournal")
    - Acceptez les conditions
4. Crée ensuite une **propriété GA4**
    - Choisissez le nom de ton site
    - Configurez la zone géographique et le fuseau horaire
5. Cliquze sur "Web" comme flux de données
6. Récupèrez l’**ID de mesure** (format : `G-XXXXXXXXXX`)

## 🔐 Étape 2 — Ajouter l’ID dans les variables d’environnement

Dans le fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Étape 3 — Le composant GoogleAnalytics.tsx

```js
import Script from "next/script";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
	if (!GA_MEASUREMENT_ID) {
		console.warn(
			"❌ Google Analytics: NEXT_PUBLIC_GA_MEASUREMENT_ID non défini"
		);
		return null;
	}

	return (
		<>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
				strategy="afterInteractive"
			/>
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
```

## Étape 4 — Injection dans le layout principal

```js
import Head from "next/head";
import GoogleAnalytics from "@/components/GoogleAnalytics";

<head>
	<GoogleAnalytics />
</head>;
```
