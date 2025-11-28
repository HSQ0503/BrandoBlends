import BlogCard from '@/components/BlogCard';
import Pagination from '@/components/Pagination';
import config from "@/config/config.json";
import { getListPage, getSinglePage } from '@/lib/contentParser';
import { sortByDate } from '@/lib/utils/sortFunctions';
import { markdownify } from '@/lib/utils/textConverter';

const BlogSection = ({ hero, isBlogPage, isBlogSinglePage, slug, visiblePosts, posts }: {
  hero?: { title: string, description: string },
  isBlogPage?: boolean,
  isBlogSinglePage?: boolean,
  slug?: number,
  visiblePosts?: number,
  posts?: any
}) => {

  // Get default blog data from the "sections" content collection
  let { title, description, button } = getListPage("blog/_index.md").frontmatter;

  // Override default blog data (Title & Description) with props if provided
  if (hero) {
    ({ title, description } = hero);
  }

  // Constant for blog folder path
  const BLOG_FOLDER = "blog";

  // Get all blog posts from the specified folder if no posts are passed as props
  posts = posts ? posts : getSinglePage(BLOG_FOLDER);

  // Sort blog posts by date in descending order
  let sortedPosts = sortByDate(posts);

  // Limit the number of posts to display if specified
  visiblePosts && (sortedPosts = sortedPosts.slice(0, visiblePosts));

  const totalPages = Math.ceil(posts.length / config.settings.pagination);
  const currentPage = slug && !isNaN(Number(slug)) ? Number(slug) : 1;
  const indexOfLastPost = currentPage * config.settings.pagination;
  const indexOfFirstPost = indexOfLastPost - config.settings.pagination;

  // Show posts based on pagination
  sortedPosts =
    currentPage === 1
      ? sortedPosts.slice(0, config.settings.pagination)
      : sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <section className="section overflow-hidden">
      <div className="container">
        <div className="row">
          {!isBlogSinglePage && (
            <div
              className={`col-12 pb-20 ${isBlogPage ? "xl:col-6 mx-auto text-center" : "col-12"}`}
              data-aos="fade-up-sm">
              <div
                className={`flex gap-5 flex-wrap items-center ${isBlogPage ? "justify-center" : "justify-between"}`}>
                {title &&
                  (isBlogPage ? (
                    <h1
                      className="text-h2 md:text-h1"
                      dangerouslySetInnerHTML={markdownify(title)}
                    />
                  ) : (
                    <h2 dangerouslySetInnerHTML={markdownify(title)} />
                  ))}

                {description && (
                  <p
                    className="text-lg/[inherit]"
                    dangerouslySetInnerHTML={markdownify(description)}
                  />
                )}
                {!isBlogPage && button && button.enable && (
                  <a
                    className="btn btn-outline-text-dark"
                    href={button.link}
                    target={button.link.startsWith("http") ? "_blank" : "_self"}
                    dangerouslySetInnerHTML={markdownify(button.label)}
                  />
                )}
              </div>
            </div>
          )}
          <div className="col-12" data-aos="fade-up-sm" data-aos-delay="200">
            <div className="row gx-4 gy-5 justify-center md:gx-5">
              {sortedPosts?.map((blog, i: number) => (
                <div className={`md:col-6 lg:col-4`} key={i}>
                  {blog && <BlogCard data={blog} />}
                </div>
              ))}
            </div>
          </div>
          {isBlogPage && (
            <div className="col-12">
              <Pagination
                section={BLOG_FOLDER}
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default BlogSection
