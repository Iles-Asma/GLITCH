import { FC } from "react";
import { Content } from "@prismicio/client";
import {
	SliceComponentProps,
	PrismicImage,
	PrismicRichText,
} from "@prismicio/react";

/**
 * Props for `TwoColumnPoemLayout`.
 */
export type TwoColumnPoemLayoutProps =
	SliceComponentProps<Content.TwoColumnPoemLayoutSlice>;

/**
 * Component for "TwoColumnPoemLayout" Slices.
 */
const TwoColumnPoemLayout: FC<TwoColumnPoemLayoutProps> = ({ slice }) => {
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<PrismicImage field={slice.primary.articleimage} />
			<PrismicRichText field={slice.primary.right_column_content} />
			<PrismicRichText field={slice.primary.articlenumber} />
		</section>
	);
};

export default TwoColumnPoemLayout;
