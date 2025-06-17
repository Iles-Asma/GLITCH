import { createClient } from "@/prismicio";

export async function getPageTitle() {
  const client = createClient();
  return await client.getSingle("page_title");
}
