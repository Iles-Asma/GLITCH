import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ArticleReference`.
 */
export type ArticleReferenceProps =
  SliceComponentProps<Content.ArticleReferenceSlice>;

/**
 * Component for "ArticleReference" Slices.
 */
const ArticleReference: FC<ArticleReferenceProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for article_reference (variation: {slice.variation})
      Slices
    </section>
  );
};

export default ArticleReference;
