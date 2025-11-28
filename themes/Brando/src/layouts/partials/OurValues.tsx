import ImageFallback from '@/helpers/ImageFallback'
import { getListPage } from '@/lib/contentParser'
import { markdownify } from '@/lib/utils/textConverter'
import { OurValuesSection } from '@/types'

const OurValues = () => {
  const { title, description, list } = getListPage("sections/our-values.md").frontmatter as OurValuesSection;

  return (
    <section className="section bg-dark">
      <div className="container">
        <div className="row">
          <div className="mx-auto text-center lg:col-10" data-aos="fade-up-sm">
            {title && (
              <h2 className="mb-6 text-white" dangerouslySetInnerHTML={markdownify(title)} />
            )}
            {description && (
              <p
                className="text-lg/[inherit]"
                dangerouslySetInnerHTML={markdownify(description)}
              />
            )}
          </div>
          <div className="col-12 pt-20">
            <div className="row g-4 justify-center">
              {list?.map((item, index) => (
                <div
                  key={index}
                  className="md:col-6 lg:col-4"
                  data-aos="fade-up-sm"
                  data-aos-delay={200 + index * 50}>
                  <div className="min-h-full rounded-xl bg-white/5 px-6 py-12">
                    {item.icon && (
                      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-dark">
                        <ImageFallback
                          className="h-6 w-6 object-cover"
                          width={24}
                          height={24}
                          src={item.icon}
                          alt={`icon related to ${item.title}`}
                        />
                      </div>
                    )}
                    {item.title && (
                      <h3
                        className="text-white h5 mb-2"
                        dangerouslySetInnerHTML={markdownify(item.title)}
                      />
                    )}
                    {item.description && (
                      <p
                        className="text-text-light/70"
                        dangerouslySetInnerHTML={markdownify(item.description)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurValues
