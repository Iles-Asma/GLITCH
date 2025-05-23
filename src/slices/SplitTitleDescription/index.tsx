import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

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
      Placeholder component for split_title_description (variation:{" "}
      {slice.variation}) Slices
    </section>
  );
};

export default SplitTitleDescription;
