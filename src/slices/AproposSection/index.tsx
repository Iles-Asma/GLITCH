import { FC } from "react";
import { Content } from "@prismicio/client";
import {
	SliceComponentProps,
	PrismicRichText,
	PrismicImage,
} from "@prismicio/react";
import styles from "./apropos.module.css";

export type IntroTextVisualsProps =
	SliceComponentProps<Content.IntroTextVisualsSlice>;

const IntroTextVisuals: FC<IntroTextVisualsProps> = ({ slice }) => {
	return (
		<section
			className={styles.section}
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			{/* premier container */}
			<div>
				<div>
					<PrismicRichText field={slice.primary.title} />
					<PrismicRichText field={slice.primary.main_text} />
				</div>

				<div>
					{slice.primary.maintext.map((item) => (
						<>
							<PrismicRichText field={item.leftcolumntext} />
							<PrismicRichText field={item.rightcolumntext} />
						</>
						// Render the item
					))}
				</div>
			</div>

			{/* deuxieme contaniner */}
			<PrismicImage field={slice.primary.main_visual} />

			{/* troisieme container */}
			<div>
				{slice.primary.secondary_visuals.map((item) => (
					<>
						<PrismicImage field={item.secondary_image} />
						<div>
							<PrismicRichText field={item.secondary_text} />
						</div>
					</>
				))}
			</div>
		</section>
	);
};

export default IntroTextVisuals;
