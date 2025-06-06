import { FC } from "react";
import { Content } from "@prismicio/client";
import {
	SliceComponentProps,
	PrismicRichText,
	PrismicLink,
} from "@prismicio/react";
import styles from "./footer.module.css"; // Import CSS module

export type FooterSimpleGridProps =
	SliceComponentProps<Content.FooterSimpleGridSlice>;

const FooterSimpleGrid: FC<FooterSimpleGridProps> = ({ slice }) => {
	return (
		<footer className={styles.footer}>
			<div className={styles["footer-left"]}>
				<PrismicRichText field={slice.primary.main_message} />
			</div>
			<div className={styles["footer-center"]}>
				{slice.primary.links.map((item, index) => (
					<PrismicLink field={item.url} key={index}>
						{item.label}
					</PrismicLink>
				))}
			</div>
			<div className={styles["footer-right"]}>
				<img src="/icons/instagram.svg" alt="Instagram" />
				<img src="/icons/facebook.svg" alt="Facebook" />
				<img src="/icons/youtube.svg" alt="YouTube" />
			</div>
		</footer>
	);
};

export default FooterSimpleGrid;
