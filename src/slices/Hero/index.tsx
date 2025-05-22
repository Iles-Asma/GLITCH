import { FC } from "react";
import { Content } from "@prismicio/client";
import {
	PrismicRichText,
	SliceComponentProps,
	PrismicLink,
	PrismicImage,
} from "@prismicio/react";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			{slice.primary.title}
			<PrismicRichText field={slice.primary.description} />
			<PrismicLink field={slice.primary.button} />
			<PrismicImage field={slice.primary.visual} />
		</section>
	);
};

export default Hero;
