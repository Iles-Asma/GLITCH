import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import styles from "./glossaire-item.module.css"; // import du CSS

export type SplitTitleDescriptionProps =
	SliceComponentProps<Content.SplitTitleDescriptionSlice>;

const SplitTitleDescription: FC<SplitTitleDescriptionProps> = ({ slice }) => {
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className={styles.split}
		>
			<div className={styles["split-left"]}>
				<PrismicRichText field={slice.primary.GlossaireItemTitle} />
			</div>
			<div className={styles["split-right"]}>
				<PrismicRichText
					field={slice.primary.GlossaireItemDescription}
				/>
			</div>
		</section>
	);
};

export default SplitTitleDescription;
