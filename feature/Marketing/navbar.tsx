import { getLocale } from "next-intl/server";
import { getFeaturedPosts } from "@/lib/blog";
import { featuredPostSlugs } from "@/config/featured-posts";
import { NavbarClient } from "./navbar-client";

export async function Navbar() {
  const locale = await getLocale();
  const featuredPosts = await getFeaturedPosts(featuredPostSlugs, locale);

  return (
    <NavbarClient featuredPosts={featuredPosts} />
  );
}
