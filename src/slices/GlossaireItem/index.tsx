import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";

/**
 * Props for `SplitTitleDescription`.
 */
export type SplitTitleDescriptionProps =
	SliceComponentProps<Content.SplitTitleDescriptionSlice>;

/**
 * Component for "SplitTitleDescription" Slices.
 */
const SplitTitleDescription: FC<SplitTitleDescriptionProps> = ({ slice }) => {
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<PrismicRichText field={slice.primary.GlossaireItemTitle} />
			<PrismicRichText field={slice.primary.GlossaireItemDescription} />
		</section>
	);
};

export default SplitTitleDescription;
