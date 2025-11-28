import ImageFallback from '@/helpers/ImageFallback'
import { getListPage } from '@/lib/contentParser'
import { markdownify } from '@/lib/utils/textConverter'
import { OurTeamSection } from '@/types'

const OurTeam = () => {
  const { title, list } = getListPage("sections/our-team.md").frontmatter as OurTeamSection;
  return (
    <section className="section">
      <div className="container">
        <div className="row">
          <div className="col-12" data-aos="fade-up-sm">
            {title && <h2 dangerouslySetInnerHTML={markdownify(title)} />}
          </div>
          <div className="col-12 pt-12" data-aos="fade-up-sm" data-aos-delay="200">
            <div className="row g-4 justify-center">
              {list?.map((item, i) => (
                <div className="col-6 lg:col-3" key={i}>
                  {item.image && (
                    <div className="mb-4 overflow-hidden rounded-lg bg-light text-center">
                      <ImageFallback
                        className="w-full h-72 object-cover object-top"
                        width={400}
                        height={400}
                        src={item.image}
                        alt={`photo of ${item.name}`}
                      />
                    </div>
                  )}
                  {item.name && (
                    <h3 className="h6 mb-1" dangerouslySetInnerHTML={markdownify(item.name)} />
                  )}
                  {item.company && (
                    <p
                      className="text-sm font-text-light"
                      dangerouslySetInnerHTML={markdownify(item.company)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurTeam;
