import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

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
      Placeholder component for hero_with_split_columns (variation:{" "}
      {slice.variation}) Slices
    </section>
  );
};

export default HeroWithSplitColumns;
