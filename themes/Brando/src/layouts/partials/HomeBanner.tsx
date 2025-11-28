import ImageFallback from '@/helpers/ImageFallback';
import { getListPage } from '@/lib/contentParser';
import { markdownify } from '@/lib/utils/textConverter';
import { HomeBannerSection } from '@/types';
import { FaCrown } from 'react-icons/fa';

const HomeBanner = () => {
  const { title,
    animating_images,
    subtitle,
    description,
    buttons,
    images, } = getListPage('sections/home-banner.md').frontmatter as HomeBannerSection;

  return (
    <section className="pb-0 pt-24 overflow-hidden relative">
      <div className="container relative">
        <div className="row justify-center">
          <div className="mb-8 text-center md:col-9 lg:col-8 xl:col-8">
            {subtitle && (
              <div
                className="mb-4 w-fit mx-auto px-3 py-1.5 rounded-full text-center border border-border/50"
                data-aos="fade-up-sm">
                <p dangerouslySetInnerHTML={markdownify(subtitle)} className="text-sm" />
              </div>
            )}
            {title && (
              <h1
                dangerouslySetInnerHTML={markdownify(title)}
                data-aos="fade-up-sm"
                className="mb-7 text-h2 lg:text-h1"
              />
            )}
            {description && (
              <p
                dangerouslySetInnerHTML={markdownify(description)}
                data-aos="fade-up-sm"
                className="mb-8 text-lg/[inherit]"
              />
            )}
            {buttons && (
              <ul className="flex flex-wrap justify-center gap-4">
                {buttons.map(({ label, link }, index) => (
                  <li 
                    key={index} 
                    data-aos="fade-up-sm" 
                    data-aos-delay={100 + index * 50}
                    className={`${index === 1 ? "hidden md:block" : "w-full md:w-auto"}`}>
                    {index === 0 ? (
                      <div className="group relative w-full md:w-fit transition-transform duration-300 active:scale-95">
                        <a
                          href={link}
                          target={link.startsWith("http") ? "_blank" : "_self"}
                          rel="noopener"
                          className="relative z-10 rounded-full bg-linear-to-br from-blue-400 to-blue-600 p-0.5 duration-300 group-hover:scale-110 block">
                          <span className="flex items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-4 md:px-6 md:py-3 font-bold text-slate-100 duration-300 group-hover:bg-slate-900/50 group-hover:text-white group-active:bg-slate-900/80 text-base uppercase tracking-wide">
                            <FaCrown className="text-lg" />
                            {label}
                          </span>
                        </a>
                        <span className="pointer-events-none absolute -inset-4 z-0 transform-gpu rounded-3xl bg-linear-to-br from-blue-400 to-blue-600 opacity-30 blur-xl transition-all duration-300 group-hover:opacity-90 group-active:opacity-50" />
                      </div>
                    ) : (
                      <a
                        className="btn btn-outline-text-dark"
                        href={link}
                        target={link.startsWith("http") ? "_blank" : "_self"}
                        rel="noopener">
                        {label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {/* Animation Images */}
            {animating_images &&
              animating_images.map((animating_images, index) => (
                <div
                  key={index}
                  className={`${index === 0 ? "left-5 lg:top-8 h-[400px]" : "right-5 lg:top-8 h-[500px]"} absolute w-auto hidden lg:block`}
                  data-aos="fade-in"
                  data-aos-duration="400"
                  data-aos-delay="200">
                  <ImageFallback
                    className={`h-auto ${index === 0 ? "w-[calc(4vw+12rem)]" : "w-[calc(6vw+16rem)] rounded-2xl"} object-contain drop-shadow-2xl pop-in-out ${index === 0 ? "pop-in-out" : "pop-in-out reverse-animation"}`}
                    height={index === 0 ? 400 : 500}
                    width={index === 0 ? 400 : 500}
                    src={animating_images}
                    alt="social achivements"
                    loading="eager"
                  />
                </div>
              ))}
          </div>
          {images && (
            <div className="col-12 pt-20 lg:pt-28">
              <div className="relative">
                {images.map(({ src, alt }, index) => (
                  <div
                    key={index}
                    className={`${index === 0 ? "-mb-10 md:mb-0 md:h-[335px] lg:h-[480px] lg:object-top" : index === 1 ? "absolute left-5 bottom-14 sm:bottom-16 md:bottom-5 xl:left-10 xl:top-1/2 xl:-translate-y-1/2" : index === 2 ? "absolute lg:right-16 right-0 -top-10 md:-top-16" : ""}`}>
                    <ImageFallback
                      data-aos="zoom-in-up-sm"
                      className={`${index === 0 ? "lg:w-[1054px] block mx-auto" : index === 1 ? "w-[40%] lg:w-[400px]" : index === 2 ? "w-[35%] md:w-[35%] block ml-auto mr-5 lg:w-[310px]" : ""} rounded-md md:rounded-xl shadow overflow-hidden`}
                      height={index === 0 ? 480 : index === 1 ? 400 : 310}
                      width={index === 0 ? 1054 : index === 1 ? 400 : 310}
                      data-aos-offset={200}
                      data-aos-delay={index * 200}
                      src={src}
                      alt={alt}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default HomeBanner
