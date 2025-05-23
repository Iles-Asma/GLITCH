import { FC } from "react";
import { Content } from "@prismicio/client";
import {
	SliceComponentProps,
	PrismicRichText,
	PrismicLink,
} from "@prismicio/react";

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
			{slice.primary.left_links.map((item, index) => (
				<>
					<PrismicLink field={item.link} key={index} />
				</>
				// Render the item
			))}
			<PrismicRichText field={slice.primary.center_title} />
			{slice.primary.right_links.map((item, index) => (
				<>
					<PrismicLink field={item.link} key={index} />
				</>
				// Render the item
			))}
		</section>
	);
};

export default NavigationBar;
