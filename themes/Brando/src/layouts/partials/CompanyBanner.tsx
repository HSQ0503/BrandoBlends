import ImageFallback from '@/helpers/ImageFallback';
import { getListPage } from '@/lib/contentParser';
import { markdownify } from '@/lib/utils/textConverter';
import { CompanyBannerSection } from '@/types';

const CompanyBanner = () => {
  const { title, description, image, bg_image, button, about, stats } = getListPage("sections/company-banner.md").frontmatter as CompanyBannerSection;

  return (
    <section className="section relative">
      <div className="container">
        <div
          aria-hidden="true"
          className="blur-[100px] h-[1004px] left-1/2 -translate-x-1/2 opacity-90 absolute w-full z-0 top-[20%]">
          <ImageFallback
            className="w-full object-cover object-center h-full"
            width={1300}
            height={700}
            src={bg_image}
            alt="gradient background"
          />
        </div>
        <div className="row">
          <div
            className="mx-auto text-center lg:col-8 xl:col-10"
            data-aos="fade-up-sm">
            {title && (
              <h1
                className="mb-6 has-highlight-text"
                dangerouslySetInnerHTML={markdownify(title)}
              />
            )}
            {description && (
              <p
                className="text-lg/[inherit]"
                dangerouslySetInnerHTML={markdownify(description)}
              />
            )}
            {button && (
              <a
                className="btn btn-lg btn-primary hover-text-dark mt-6"
                href={button.link}
                target="_blank"
                rel="noopener">
                {button.label}
              </a>
            )}
          </div>
          {image && (
            <div className="text-center lg:col-12 pt-24" data-aos="fade-up-sm">
              <ImageFallback
                className="w-full rounded-lg"
                width={1300}
                height={700}
                src={image}
                alt={`image related to ${title}`}
              />
            </div>
          )}
          {about && about.enable && (
            <div className="lg:col-12 pt-24" data-aos="fade-up-sm">
              <div className="row gy-4">
                {about.title && (
                  <div className="lg:col-6">
                    <h2 dangerouslySetInnerHTML={markdownify(about.title)} />
                  </div>
                )}
                {about.description && (
                  <div className="lg:col-6 lg:pl-20">
                    <div
                      className="content"
                      dangerouslySetInnerHTML={markdownify(about.description, true)}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          {stats && (
            <div
              className="lg:col-12 pt-24"
              data-aos="fade-up-sm"
              data-aos-delay="200">
              <div className="row g-4 justify-center">
                {stats?.map(
                  (
                    { value, label }: { value: string; label: string },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="md:col-6 lg:col-4"
                      data-aos="fade-up-sm"
                      data-aos-delay={(stats.length - index) * 100}>
                      <div
                        className={`rounded-md min-h-full py-9 px-12 ${index % 2 === 0 ? "bg-violet-200" : "bg-lime-100"}`}>
                        {value && (
                          <h3
                            className="text-h2 mb-4"
                            dangerouslySetInnerHTML={markdownify(value)}
                          />
                        )}
                        {label && (
                          <p
                            className="mb-3 lg:text-xl font-medium text-text-dark"
                            dangerouslySetInnerHTML={markdownify(label)}
                          />
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default CompanyBanner;
