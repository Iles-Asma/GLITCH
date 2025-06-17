import { createClient } from "@/prismicio";

export async function getNavigation() {
  const client = createClient();
  const navigation = await client.getSingle("navigation"); // UID du singleton dans Prismic
  return navigation;
}
