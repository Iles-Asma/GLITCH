import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero: FC<HeroProps> = ({ slice }) => {
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="es-bounded es-fullpage-hero"
		>
			<div className="es-fullpage-hero__content">
				<div className="es-fullpage-hero__image-container">
					{isFilled.image(slice.primary.image) && (
						<PrismicNextImage
							field={slice.primary.image}
							className="es-fullpage-hero__image"
						/>
					)}
				</div>

				<div className="es-fullpage-hero__content-right">
					<div className="es-fullpage-hero__content__intro">
						{isFilled.keyText(slice.primary.eyebrowHeadline) && (
							<p className="es-fullpage-hero__content__intro__eyebrow">
								{slice.primary.eyebrowHeadline}
							</p>
						)}
						{isFilled.richText(slice.primary.title) && (
							<div className="es-fullpage-hero__content__intro__headline">
								<PrismicRichText field={slice.primary.title} />
							</div>
						)}
						{isFilled.richText(slice.primary.description) && (
							<div className="es-fullpage-hero__content__intro__description">
								<PrismicRichText
									field={slice.primary.description}
								/>
							</div>
						)}
						{isFilled.link(slice.primary.callToActionLink) && (
							<PrismicNextLink
								className="es-call-to-action__link"
								field={slice.primary.callToActionLink}
							>
								{slice.primary.callToActionLabel || "Découvrir"}
							</PrismicNextLink>
						)}
					</div>
				</div>
			</div>

			<style>
				{`
          .es-bounded {
              margin: 0;
              padding: 2rem;
              position: relative;
              background-color: #fff;
              border-radius: 2rem 2rem 0 0;
              overflow: hidden;
          }

          .es-fullpage-hero {
              font-family: system-ui, sans-serif;
              color: #333;
          }

          .es-fullpage-hero__content {
              display: flex;
              flex-direction: column;
              gap: 2rem;
              align-items: center;
              text-align: center;
          }

          .es-fullpage-hero__image-container {
              width: 100%;
          }

          .es-fullpage-hero__image {
              width: 100%;
              height: auto;
           
          }

          .es-fullpage-hero__content-right {
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
          }

          .es-fullpage-hero__content__intro {
              display: flex;
              flex-direction: column;
              gap: 1rem;
              max-width: 600px;
          }

          .es-fullpage-hero__content__intro__eyebrow {
              color: #47C1AF;
              font-size: 1.2rem;
              font-weight: 500;
              margin: 0;
          }

          .es-fullpage-hero__content__intro__headline {
              font-size: 2rem;
              font-weight: 700;
              margin: 0;
          }

          .es-fullpage-hero__content__intro__description {
              font-size: 1.1rem;
              margin: 0;
          }

          .es-call-to-action__link {
              display: inline-block;
              margin-top: 1.5rem;
              padding: 1rem 2.5rem;
              background-color: #000; /* bouton noir */
              color: #fff;
              border-radius: 0.5rem;
              font-size: 1rem;
              text-decoration: none;
              font-weight: 500;
              transition: background-color 150ms ease-in-out;
          }

          .es-call-to-action__link:hover {
              background-color: #333; /* léger hover */
          }

          /* Desktop styles */
          @media (min-width: 1024px) {
              .es-fullpage-hero__content {
                  flex-direction: row-reverse;
                  justify-content: space-between;
                  text-align: left;
                  align-items: center;
              }

              .es-fullpage-hero__image-container, 
              .es-fullpage-hero__content-right {
                  width: 50%;
              }

              .es-fullpage-hero__content__intro {
                  align-items: flex-start;
              }
          }
        `}
			</style>
		</section>
	);
};

export default Hero;
