import DynamicIcon from '@/helpers/DynamicIcon'
import ImageFallback from '@/helpers/ImageFallback'
import { plainify } from '@/lib/utils/textConverter'
import { CaseStudy } from '@/types'

const CaseStudyCard = ({ data }: { data: CaseStudy }) => {
  const { title, image } = data.frontmatter;

  return (
    <div className="bg-light rounded-lg flex sm:flex-row flex-col gap-6 p-5 group">
      {
        image && (
          <div className="rounded-lg w-full max-sm:h-72 sm:w-96 min-h-full overflow-hidden">
            <ImageFallback
              className={`object-cover h-full group-hover:scale-110 transition duration-500`}
              height={300}
              width={400}
              src={image}
              alt={title}
            />
          </div>
        )
      }
      <div className="flex flex-col justify-center">
        {
          title && (
            <h3 className="h6 mb-4">
              <a href={`/case-studies/${data.slug}`}>{title}</a>
            </h3>
          )
        }
        {
          data.content && (
            <p className="text-base-sm/snug" dangerouslySetInnerHTML={{ __html: plainify(data.content?.slice(0, 80)) }} />
          )
        }
        {
          data.slug && (
            <a
              href={`/case-studies/${data.slug}`}
              className="btn btn-text-primary mt-10 group/link hover:opacity-80">
              View Case Study
              <DynamicIcon
                className="inline-block ml-1 group-hover/link:ml-2 transition-all duration-300"
                icon="IoArrowForwardSharp"
              />
            </a>
          )
        }
      </div>
    </div>
  )
}

export default CaseStudyCard;
