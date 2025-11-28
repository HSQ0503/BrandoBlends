import config from "@/config/config.json";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import BlogSection from "@/partials/BlogSection";
import CallToAction from "@/partials/CallToAction";
import SeoMeta from "@/partials/SeoMeta";
import { Blog } from "@/types";

const { blog_folder, pagination } = config.settings;

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams = () => {
  const allPost: Blog[] = getSinglePage(blog_folder);
  const allSlug: string[] = allPost.map((item) => item.slug!);
  const totalPages = Math.ceil(allSlug.length / pagination);
  let paths: { page: string }[] = [];

  for (let i = 1; i < totalPages; i++) {
    paths.push({
      page: (i + 1).toString(),
    });
  }

  return paths;
};

// for all regular pages
const Posts = async (props: { params: Promise<{ page: number }> }) => {
  const params = await props.params;
  const postIndex: Blog = getListPage(`${blog_folder}/_index.md`);
  const { title, meta_title, description, image } = postIndex.frontmatter;

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />

      <BlogSection slug={params.page} hero={postIndex.frontmatter.hero} isBlogPage />
      <CallToAction />
    </>
  );
};

export default Posts;
