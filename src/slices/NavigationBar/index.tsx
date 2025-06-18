import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicLink } from "@prismicio/react";
import styles from "./page.module.css";

/**
 * Props for `NavigationBar`.
 */
export type NavigationBarProps =
	SliceComponentProps<Content.NavigationBarSlice>;

/**
 * Component for "NavigationBar" Slices.
 */
const NavigationBar: FC<NavigationBarProps> = ({ slice }) => {
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<nav className={styles.nav}>
				<div className={styles.left}>
					{slice.primary.left_links.map((item, index) => (
						<PrismicLink field={item.link} key={index}>
							{item.link.text}
						</PrismicLink>
					))}
				</div>

				<div>
					<PrismicLink field={slice.primary.center_title} />
				</div>

				<div className={styles.right}>
					{slice.primary.right_links.map((item, index) => (
						<PrismicLink field={item.link} key={index}>
							{item.link.text}
						</PrismicLink>
					))}
				</div>
			</nav>
		</section>
	);
};

export default NavigationBar;
