import ImageFallback from '@/helpers/ImageFallback';
import { getListPage } from '@/lib/contentParser';
import { markdownify } from '@/lib/utils/textConverter';
import { MediaAdvantagesSection } from '@/types';
import Script from 'next/script';

const MediaAdvantages = () => {
  const { title,
    image,
    bg_image,
    description,
    exclusive_open,
    exclusive_open_group,
    list } = getListPage('sections/media-advantages.md').frontmatter as MediaAdvantagesSection;

  return (
    <section className="section overflow-hidden bg-light relative">
      <div className="container">
        <div
          aria-hidden="true"
          className="blur-[100px] pointer-events-none absolute z-0 h-[911px] w-[61%] -translate-x-2/4 left-2/4 bottom-0">
          <ImageFallback
            className="w-full object-cover object-center h-full"
            loading="lazy"
            width={1920}
            height={911}
            src={bg_image}
            alt="banner gradient background"
          />
        </div>
        <div className="row">
          <div
            className="mx-auto text-center lg:col-10 xl:col-7"
            data-aos="fade-up-sm">
            {title && <h2 className="mb-6" dangerouslySetInnerHTML={markdownify(title)} />}
            {description && (
              <p
                className="text-lg/[inherit]"
                dangerouslySetInnerHTML={markdownify(description)}
              />
            )}
          </div>
          <div className="col-12 pt-20" data-aos="fade-up-sm" data-aos-delay={100}>
            <div className="row gx-4 gy-6 justify-center relative z-10">
              <div className="lg:col-6">
                <div className="bg-violet-200 overflow-hidden rounded-2xl p-10 lg:pe-0 pb-0">
                  <ImageFallback
                    className={
                      "md:h-[500px] h-[250px] rounded-tl-xl object-cover object-left-top pointer-events-none"
                    }
                    loading="lazy"
                    width={1920}
                    height={500}
                    src={image}
                    alt={title || "image"}
                  />
                </div>
              </div>
              <div className="lg:col-6">
                {list?.map((item, i: number) => (
                  <div
                    key={i}
                    data-exclusive-open={`${exclusive_open}`}
                    data-accordion-group={exclusive_open_group}
                    className={`bg-white last:mb-0 mb-6 rounded-xl group`}>
                    {item.title && (
                      <details
                        className="group peer media-advantage-item"
                        {...(item.active ? { open: true } : {})}>
                        <summary className="flex w-full cursor-pointer select-none gap-4 p-7 text-start text-xl group-[.active]:pb-0 font-semibold text-text-dark flex-row">
                          <ImageFallback className="w-7" height={28} width={28} src={item.icon} alt="icon" />
                          <span dangerouslySetInnerHTML={markdownify(item.title)} />
                        </summary>
                      </details>
                    )}
                    {item.description && (
                      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 peer-open:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                          <div
                            className="ps-[4.7rem] pe-8 pb-8"
                            dangerouslySetInnerHTML={markdownify(item.description)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Script id="media-advantages-script">
        {`
          document.addEventListener('click', function(e) {
            // Check if a summary element within media-advantages was clicked
            if (e.target.closest('.media-advantage-item summary')) {
              const clickedDetails = e.target.closest('details');

              // If this details is already open, let the normal toggle happen
              // Otherwise, close all other details elements
              if (!clickedDetails.open) {
                document.querySelectorAll('.media-advantage-item').forEach(details => {
                  if (details !== clickedDetails) {
                    details.open = false;
                  }
                });
              }
            }
          }, true);
        `}
      </Script>
    </section>
  )
}

export default MediaAdvantages
