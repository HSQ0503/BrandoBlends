import ImageFallback from '@/helpers/ImageFallback';
import { getListPage } from '@/lib/contentParser';
import { markdownify } from '@/lib/utils/textConverter';
import { ClientsSection } from '@/types';

const Clients = () => {
  const { title, list } = getListPage('sections/clients.md').frontmatter as ClientsSection;

  return (
    <section className="section-md bg-dark text-white">
      <div className="container">
        <div className="row">
          <div className="col-12" data-aos="fade-up-sm">
            <p
              className="w-full font-semibold text-md text-center"
              dangerouslySetInnerHTML={markdownify(title)}
            />
          </div>
          <div className="col-12 pt-10" data-aos="fade-up-sm" data-aos-delay="200">
            <div className="relative flex gap-x-10 overflow-hidden before:pointer-events-none before:absolute before:left-0 before:z-[5] before:h-full before:w-20 before:bg-gradient-to-r before:from-dark before:to-transparent before:content-[''] after:pointer-events-none after:absolute after:right-0 after:h-full after:w-20 after:bg-gradient-to-r after:from-transparent after:to-dark after:z-[5] after:content-[''] md:gap-x-20 before:md:w-40 after:md:w-40">
              <div className="marquee flex shrink-0 items-center justify-center gap-x-10 gap-y-6 opacity-80 md:gap-x-20">
                {list?.map((logo, i: number) => (
                  <div className="h-12" key={i}>
                    <ImageFallback
                      width={175}
                      height={50}
                      src={logo}
                      alt="brand logo"
                      loading="lazy"
                      className="h-full object-contain"
                    />
                  </div>
                ))}
              </div>
              <div
                className="marquee flex shrink-0 items-center justify-center gap-x-10 gap-y-6 opacity-80 md:gap-x-20"
                aria-hidden="true">
                {list?.map((logo, i: number) => (
                  <div className="h-12" key={i}>
                    <ImageFallback
                      width={175}
                      height={50}
                      src={logo}
                      alt="brand logo"
                      loading="lazy"
                      className="h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Clients
