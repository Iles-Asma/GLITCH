import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

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
      Placeholder component for two_column_poem_layout (variation:{" "}
      {slice.variation}) Slices
    </section>
  );
};

export default TwoColumnPoemLayout;
