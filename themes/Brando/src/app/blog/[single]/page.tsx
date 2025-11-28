import config from "@/config/config.json";
import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import { getSinglePage } from "@/lib/contentParser";
import dateFormat from "@/lib/utils/dateFormat";
import { markdownify } from "@/lib/utils/textConverter";
import BlogSection from "@/partials/BlogSection";
import CallToAction from "@/partials/CallToAction";
import SeoMeta from "@/partials/SeoMeta";
import { Blog } from "@/types";

const { blog_folder } = config.settings;

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams: () => { single: string }[] = () => {
  const posts: Blog[] = getSinglePage(blog_folder);

  const paths = posts.map((post) => ({
    single: post.slug!,
  }));

  return paths;
};

const PostSingle = async (props: { params: Promise<{ single: string }> }) => {
  const params = await props.params;
  const posts: Blog[] = getSinglePage(blog_folder);
  const post = posts.filter((page) => page.slug === params.single)[0];

  const {
    title,
    meta_title,
    description,
    image,
    date
  } = post.frontmatter;

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />

      <section className="section pb-0">
        <div className="container">
          <div className="row justify-center">
            <div className="col-8" data-aos="fade-up-sm" data-aos-delay="200">
              {
                image && (
                  <div className="mb-10">
                    <ImageFallback
                      src={image}
                      height={500}
                      width={1200}
                      alt={title}
                      className="h-auto w-full rounded-lg object-cover md:h-[320px]"
                    />
                  </div>
                )
              }
            </div>
            <div className="lg:col-8" data-aos="fade-up-sm">
              {
                date && (
                  <p className="mb-4" dangerouslySetInnerHTML={{ __html: dateFormat(date, "MMMM dd, yyyy") }} />
                )
              }
              {title && <h1 dangerouslySetInnerHTML={markdownify(title)} className="h2" />}
            </div>
            <article className="lg:col-8 pt-12" data-aos="fade-up-sm">
              <div className="content">
                <MDXContent content={post.content} />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Related posts  */}
      <BlogSection isBlogSinglePage visiblePosts={3} />
      <CallToAction />
    </>
  );
};

export default PostSingle;
