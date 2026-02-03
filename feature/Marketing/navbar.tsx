import { getFeaturedPosts } from "@/lib/blog";
import { featuredPostSlugs } from "@/config/featured-posts";
import { NavbarClient } from "./navbar-client";

export async function Navbar() {
  const featuredPosts = await getFeaturedPosts(featuredPostSlugs);

  return (
    <NavbarClient featuredPosts={featuredPosts} />
  );
}
