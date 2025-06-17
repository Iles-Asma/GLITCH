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
			{/* <h1>
				<PrismicRichText field={slice.primary.} />
			</h1> */}

			<div className={styles.card}>
				{slice.primary.cardTitle && (
					<h2 className={styles.title}>
						<PrismicText field={slice.primary.cardTitle} />
					</h2>
				)}

				<div className={styles.items}>
					<PrismicRichText field={slice.primary.engamentsubtitle} />
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
