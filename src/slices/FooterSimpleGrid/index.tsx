import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FooterSimpleGrid`.
 */
export type FooterSimpleGridProps =
	SliceComponentProps<Content.FooterSimpleGridSlice>;

/**
 * Component for "FooterSimpleGrid" Slices.
 */
const FooterSimpleGrid: FC<FooterSimpleGridProps> = ({ slice }) => {
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		></section>
	);
};

export default FooterSimpleGrid;
