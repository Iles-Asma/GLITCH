import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicLink } from "@prismicio/react";
import styles from "./footer.module.css";
import Image from "next/image";

export type FooterSimpleGridProps =
	SliceComponentProps<Content.FooterSimpleGridSlice>;

const FooterSimpleGrid: FC<FooterSimpleGridProps> = ({ slice }) => {
	return (
		<footer className={styles.footer}>
			<div className={styles.topSection}>
				<div className={styles.leftBlock}>
					<h4>PLAN DU SITE</h4>
					<div className={styles.navLinks}>
						{slice.primary.links?.map((item, index) =>
							item.url && item.label ? (
								<PrismicLink field={item.url} key={index}>
									{item.label}
								</PrismicLink>
							) : null
						)}
						
					</div>
				</div>
				<div className={styles.centerBlock}>
					<h4>CONTACT</h4>
					<div className={styles.contactInfo}>
						{slice.primary.email && (
							<span>{slice.primary.email}</span>
						)}
						{slice.primary.phone && (
							<span>{slice.primary.phone}</span>
						)}
					</div>
				</div>
				<div className={styles.rightBlock}>
					<h4>RESEAUX SOCIAUX</h4>
					<div className={styles.socialIcons}>
						<a
							href="https://instagram.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Image
								src="/instagram.svg"
								alt="Instagram"
								width={48}
								height={48}
							/>
						</a>
						<a
							href="https://facebook.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Image
								src="/facebook.svg"
								width={48}
								height={48}
								alt="Facebook"
							/>
						</a>
						<a
							href="https://youtube.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Image
								src="/youtube.svg"
								width={48}
								height={48}
								alt="YouTube"
							/>
						</a>
					</div>
				</div>
			</div>
			<div className={styles.bottomSection}>
				<span className={styles.copyright}>
					{slice.primary.copyright || "©2025 BUG"}
				</span>
				{slice.primary.footer_links?.map((link, index) =>
					link.url && link.label ? (
						<PrismicLink
							field={link.url}
							key={index}
							className={
								index === 0
									? styles.centerLink
									: styles.rightLink
							}
						>
							{link.label}
						</PrismicLink>
					) : null
				)}
			</div>
		</footer>
	);
};

export default FooterSimpleGrid;
