import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import BlogSection from "@/partials/BlogSection";
import CallToAction from "@/partials/CallToAction";
import SeoMeta from "@/partials/SeoMeta";
import { Blog } from "@/types";
const { blog_folder } = config.settings;

// for all regular pages
const Posts = () => {
  const postIndex: Blog = getListPage(`${blog_folder}/_index.md`);

  return (
    <>
      <SeoMeta
        title={postIndex.frontmatter.title}
        meta_title={postIndex.frontmatter.meta_title}
        description={postIndex.frontmatter.description}
        image={postIndex.frontmatter.image}
      />
      <BlogSection hero={postIndex.frontmatter.hero} isBlogPage={true} />
      <CallToAction />
    </>
  );
};

export default Posts;
