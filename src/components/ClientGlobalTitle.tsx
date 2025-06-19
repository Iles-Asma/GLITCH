"use client";

import ScrambleText from "@/components/ScrambleText";
import type { RichTextField } from "@prismicio/client";

type Block = {
  type: string;
  text: string;
};

export default function ClientGlobalTitle({ title }: { title: RichTextField }) {
  if (!title || title.length === 0) return null;

  return (
    <>
      {(title as Block[]).map((block, index) => {
        const delay = 1.2 + index * 0.2;

        if (block.type === "heading1") {
          return (
            <h1 key={index}>
              <ScrambleText text={block.text} delay={delay} />
            </h1>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p key={index}>
              <ScrambleText text={block.text} delay={delay} />
            </p>
          );
        }

        // fallback pour types non gérés
        return (
          <div key={index}>
            <ScrambleText text={block.text} delay={delay} />
          </div>
        );
      })}
    </>
  );
}
