import { getListPage } from '@/lib/contentParser';
import { markdownify } from '@/lib/utils/textConverter';
import CallToAction from '@/partials/CallToAction';
import SeoMeta from '@/partials/SeoMeta';
import { ChangelogSection } from '@/types';

const Changelog = () => {
  const indexPage = getListPage("changelog/_index.md");
  const { title, list } = getListPage("sections/changelog.md").frontmatter as ChangelogSection;

  return (
    <>
      <SeoMeta
        title={indexPage.frontmatter.title}
        meta_title={indexPage.frontmatter.meta_title}
        description={indexPage.frontmatter.description}
        image={indexPage.frontmatter.image}
      />
      <section className="section">
        <div className="container">
          <div className="row">
            <div
              className="xl:col-8 mx-auto text-center lg:col-8"
              data-aos="fade-up-sm">
              {title && (
                <h1 className="h2 md:h1 mb-4" dangerouslySetInnerHTML={markdownify(title)} />
              )}
            </div>
            <div
              className="lg:col-8 mx-auto pt-16 space-y-6"
              data-aos="fade-up-sm"
              data-aos-delay="200">
              {list?.map((item, i) => (
                <div className="bg-light rounded-lg p-6" key={i}>
                  <div className="row">
                    <div className="md:col-4">
                      <div className="w-52 mb-2.5 md:mb-0">
                        {item.date && (
                          <p
                            className="md:text-base md:font-semibold"
                            dangerouslySetInnerHTML={markdownify(item.date)}
                          />
                        )}
                      </div>
                    </div>
                    <div className="md:col-8">
                      {item.version && (
                        <h3
                          className="h6 mb-4"
                          dangerouslySetInnerHTML={markdownify(item.version)}
                        />
                      )}
                      {item.content && (
                        <div
                          className="content prose-p:text-lg/[inherit]"
                          dangerouslySetInnerHTML={markdownify(item.content, true)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CallToAction />
    </>
  )
}

export default Changelog;
