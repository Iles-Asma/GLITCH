import { FC } from "react";
import { Content } from "@prismicio/client";
import {
	SliceComponentProps,
	PrismicRichText,
	PrismicText,
} from "@prismicio/react";
import styles from "./sengager.module.css";

/**
 * Props for `InfoColumns`.
 */
export type InfoColumnsProps = SliceComponentProps<Content.InfoColumnsSlice>;

/**
 * Component for "InfoColumns" Slices.
 */
const InfoColumns: FC<InfoColumnsProps> = ({ slice }) => {
	return (
		<section
			className={styles.section}
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<h1>
				<PrismicRichText field={data.title} />
			</h1>

			<div className={styles.card}>
				{slice.primary.title && (
					<h2 className={styles.title}>
						<PrismicText field={slice.primary.title} />
					</h2>
				)}

				<div className={styles.items}>
					{slice.primary.engagementgroup?.map((item, index) => (
						<div key={index} className={styles.item}>
							{item.engagementcontent && (
								<PrismicRichText
									field={item.engagementcontent}
								/>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default InfoColumns;
