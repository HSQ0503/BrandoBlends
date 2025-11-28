import ImageFallback from '@/helpers/ImageFallback'
import MDXContent from '@/helpers/MDXContent'
import { markdownify } from '@/lib/utils/textConverter'
import { CaseStudy } from '@/types'

const CaseStudySingle = ({ data }: { data: CaseStudy }) => {
  const { title, image } = data.frontmatter;

  return (
    <section className="section">
      <div className="container">
        <div className="row">
          <div className="lg:col-11" data-aos="fade-up-sm">
            {title && <h1 dangerouslySetInnerHTML={markdownify(title)} className="mb-4" />}
          </div>
          <div className="col-12 pt-12" data-aos="fade-up-sm" data-aos-delay="200">
            {
              image && (
                <div className="mb-10">
                  <ImageFallback
                    src={image}
                    height={500}
                    width={1200}
                    alt={title}
                    className="h-auto w-full rounded-lg object-cover md:h-[700px]"
                  />
                </div>
              )
            }
          </div>
          <article className="pb-10 lg:col-10 mx-auto" data-aos="fade-up-sm">
            <div className="content">
              <MDXContent content={data.content} />
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default CaseStudySingle;
