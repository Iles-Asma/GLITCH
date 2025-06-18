"use client";

import { usePathname } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";

export function LayoutWrapper({ footerSlices }: { footerSlices: any }) {
  const pathname = usePathname();
  const isArticle = pathname.startsWith("/article");

  return !isArticle ? (
    <SliceZone slices={footerSlices} components={components} />
  ) : null;
}
