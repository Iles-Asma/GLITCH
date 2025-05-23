import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";

/**
 * Props for `HeroWithSplitColumns`.
 */
export type HeroWithSplitColumnsProps =
	SliceComponentProps<Content.HeroWithSplitColumnsSlice>;

/**
 * Component for "HeroWithSplitColumns" Slices.
 */
const HeroWithSplitColumns: FC<HeroWithSplitColumnsProps> = ({ slice }) => {
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<PrismicRichText field={slice.primary.headline} />

			{slice.primary.columns.map((item) => (
				<>
					<PrismicRichText field={item.content} />
				</>
			))}
		</section>
	);
};

export default HeroWithSplitColumns;
