import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import styles from "./mentionLegale.module.css";

/**
 * Props for `LegalInformation`.
 */
export type LegalInformationProps =
	SliceComponentProps<Content.LegalInformationSlice>;

/**
 * Component for "LegalInformation" Slices.
 */
const LegalInformation: FC<LegalInformationProps> = ({ slice }) => {
	return (
		<section
			className={styles.section}
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<div className={styles.container}>
				<div className={styles.heading}>
					<PrismicRichText field={slice.primary.heading} />
				</div>

				<div className={styles.items}>
					{slice.primary.info_items?.map((item, index) => (
						<div key={index} className={styles.item}>
							{item.value && (
								<div className={styles.value}>
									<PrismicRichText field={item.value} />
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default LegalInformation;
