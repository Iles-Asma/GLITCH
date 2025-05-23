import { FC } from "react";
import { Content } from "@prismicio/client";
import {
	SliceComponentProps,
	PrismicRichText,
	PrismicLink,
} from "@prismicio/react";

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
		>
			<PrismicRichText field={slice.primary.main_message} />
			{slice.primary.links.map((item, index) => (
				<>
					<PrismicLink field={item.url} key={index}>
						{item.label}
					</PrismicLink>
				</>
			))}
		</section>
	);
};

export default FooterSimpleGrid;
