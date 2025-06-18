// lib/getFooter.ts
import { createClient } from "@/prismicio";

export async function getFooter() {
  const client = createClient();
  const footer = await client.getSingle("footer");
  return footer;
}
