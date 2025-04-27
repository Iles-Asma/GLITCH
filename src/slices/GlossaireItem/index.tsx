import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `GlossaireItem`.
 */
export type GlossaireItemProps =
  SliceComponentProps<Content.GlossaireItemSlice>;

/**
 * Component for "GlossaireItem" Slices.
 */
const GlossaireItem: FC<GlossaireItemProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for glossaire_item (variation: {slice.variation})
      Slices
    </section>
  );
};

export default GlossaireItem;
