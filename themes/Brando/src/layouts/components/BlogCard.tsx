import config from "@/config/config.json";
import ImageFallback from "@/helpers/ImageFallback";
import dateFormat from "@/lib/utils/dateFormat";
import { Blog } from "@/types";

const BlogCard = ({ data }: { data: Blog }) => {
  const { blog_folder } = config.settings;
  const { title, image, date } = data.frontmatter;

  return (
    <div className="bg-body">
      {
        image && (
          <div className="rounded-lg relative h-[300px] mb-6 group flex overflow-hidden items-center justify-center">
            <ImageFallback
              className={`object-cover h-full group-hover:scale-110 transition duration-700`}
              height={350}
              width={500}
              src={image}
              alt={title}
            />
            <a
              href={`/${blog_folder}/${data.slug}`}
              className="absolute w-full h-full"
              title={"Read more about " + title}
            />
          </div>
        )
      }
      {
        date && (
          <div className="mb-3 flex items-center gap-x-2">
            <p className="inline-block font-medium text-primary">
              {dateFormat(date, "iiii, MMM dd, yyyy")}
            </p>
          </div>
        )
      }
      {
        title && (
          <h3 className="h6">
            <a
              className="hover:text-primary duration-300 relative after:stretched-link"
              href={`/${blog_folder}/${data.slug}`}>
              {title}
            </a>
          </h3>
        )
      }
    </div>
  );
};

export default BlogCard;
