import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import CallToAction from "@/partials/CallToAction";
import SeoMeta from "@/partials/SeoMeta";
import Testimonials from "@/partials/Testimonials";
import { IntegrationSection } from "@/types";

const IntegrationPage = () => {
  const indexPage = getListPage("integration/_index.md");
  const { title, bg_gradient_image, description, list } = getListPage("sections/integration.md").frontmatter as IntegrationSection;

  return (
    <>
      <SeoMeta
        title={indexPage.frontmatter.title}
        description={indexPage.frontmatter.description}
        meta_title={indexPage.frontmatter.meta_title}
        image={indexPage.frontmatter.image}
      />

      <section className="section relative">
        <div className="container">
          <div
            aria-hidden="true"
            className="blur-[100px] h-[1004px] left-1/2 -translate-x-1/2 absolute w-full z-0 bottom-0">
            <ImageFallback
              className="w-full object-cover object-center h-full"
              width={1300}
              height={700}
              src={bg_gradient_image}
              alt="gradient background"
            />
          </div>
          <div className="row">
            <div
              className="mx-auto text-center lg:col-8 xl:col-7"
              data-aos="fade-up-sm">
              {title && (
                <h1
                  className="mb-6 [&>strong]:text-primary"
                  dangerouslySetInnerHTML={markdownify(title)}
                />
              )}
              {description && (
                <p
                  className="text-lg/[inherit]"
                  dangerouslySetInnerHTML={markdownify(description)}
                />
              )}
            </div>
            <div className="col-12 pt-20" data-aos="fade-up-sm" data-aos-delay={200}>
              <div className="row g-5 justify-center">
                {list?.map((item, i) => (
                  <div className="md:col-6 lg:col-4" key={i}>
                    <div className="group relative min-h-full rounded-lg bg-white px-10 py-12 transition duration-300 hover:-translate-y-1 shadow">
                      {item.image && (
                        <ImageFallback
                          className="mb-10 h-14 object-contain"
                          width={100}
                          height={100}
                          src={item.image}
                          alt={`${item.name}`}
                        />
                      )}
                      {item.name && (
                        <h3 className="h5 mb-2" dangerouslySetInnerHTML={markdownify(item.name)} />
                      )}
                      {item.description && (
                        <p
                          className="opacity-70"
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

      <Testimonials
        className="pt-0"
        visibleTestimonial={3}
        lightColorScheme={true}
      />
      <CallToAction />
    </>
  )
}

export default IntegrationPage;
