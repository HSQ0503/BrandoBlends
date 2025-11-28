import DynamicIcon from "@/helpers/DynamicIcon";
import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import { TestimonialSection } from "@/types";
import { FaCrown } from 'react-icons/fa';
import "swiper/css";


const Testimonials = ({ content,
  visibleTestimonial,
  largeHeading,
  className,
  hideCtaButton,
  lightColorScheme,
  contentSource,
  blackBackground,
  noStacking,
  hideFirstButton }: { content?: { title: string, description: string }, visibleTestimonial?: number, largeHeading?: boolean, className?: string, hideCtaButton?: boolean, lightColorScheme?: boolean, contentSource?: string, blackBackground?: boolean, noStacking?: boolean, hideFirstButton?: boolean }) => {

  const contentEntry = getListPage(contentSource || "sections/testimonial.md");
  let { title, description, list, button } = contentEntry.frontmatter as TestimonialSection;

  // Override default blog data (Title, Description) with props if provided
  if (content) {
    ({ title, description } = content);
  }

  if (visibleTestimonial) {
    list = list?.slice(0, visibleTestimonial);
  }

  return (
    <section
      className={`section ${className || ""} ${blackBackground ? "bg-black" : !lightColorScheme ? "bg-dark" : ""}`}>
      <div className="container">
        <div className="row">
          <div
            className="mx-auto text-center lg:col-10 xl:col-8"
            data-aos="fade-up-sm">
            {title &&
              (largeHeading ? (
                <h1
                  className={`mb-6 md:text-h1 text-h2 ${!lightColorScheme ? "text-white" : "text-text-dark"}`}
                  dangerouslySetInnerHTML={markdownify(title)}
                />
              ) : (
                <h2
                  className={`mb-6 text-h2 ${!lightColorScheme ? "text-white" : "text-text-dark"}`}
                  dangerouslySetInnerHTML={markdownify(title)}
                />
              ))}
            {description && (
              <p
                className={`text-lg/[inherit] ${!lightColorScheme ? "text-white" : "text-text-dark"}`}
                dangerouslySetInnerHTML={markdownify(description)}
              />
            )}
          </div>
          <div className="col-12 pt-20" data-aos="fade-up-sm" data-aos-delay="200">
            <div className="flex flex-wrap gap-3 justify-center">
              {noStacking ? (
                /* No stacking - display all images normally */
                list?.map((item, i: number) => (
                  <div className="w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.5rem)] md:w-[calc(25%-0.5625rem)] lg:w-[calc(20%-0.6rem)]" key={i} data-aos="fade-up-sm" data-aos-delay={i * 50}>
                    <div
                      className={
                        "group relative overflow-hidden rounded-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full" +
                        ` ${!lightColorScheme ? "border-blue-500/30 hover:border-blue-400" : "border-border/60"}`
                      }>
                      <ImageFallback
                        className="w-full h-auto object-contain"
                        width={300}
                        height={400}
                        src={item.image}
                        alt={item.alt || "Student win"}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                ))
              ) : (
                <>
                  {/* Images 1-6: Display normally */}
                  {list?.slice(0, 6).map((item, i: number) => (
                    <div className="w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.5rem)] md:w-[calc(25%-0.5625rem)] lg:w-[calc(20%-0.6rem)]" key={i} data-aos="fade-up-sm" data-aos-delay={i * 50}>
                      <div
                        className={
                          "group relative overflow-hidden rounded-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full" +
                          ` ${!lightColorScheme ? "border-blue-500/30 hover:border-blue-400" : "border-border/60"}`
                        }>
                        <ImageFallback
                          className="w-full h-auto object-contain"
                          width={300}
                          height={400}
                          src={item.image}
                          alt={item.alt || "Student win"}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  ))}
                  
                  {/* Images 7-17: Stack in groups of 3 */}
                  {list && list.length > 6 && Array.from({ length: Math.ceil(Math.min(11, list.length - 6) / 3) }).map((_, groupIndex) => {
                    const startIdx = 6 + groupIndex * 3;
                    const groupItems = list.slice(startIdx, Math.min(startIdx + 3, 17));
                    return (
                      <div 
                        className="w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.5rem)] md:w-[calc(25%-0.5625rem)] lg:w-[calc(20%-0.6rem)]" 
                        key={`group-${groupIndex}`}
                        data-aos="fade-up-sm" 
                        data-aos-delay={(6 + groupIndex) * 50}>
                        <div className="flex flex-col gap-3">
                          {groupItems.map((item, itemIndex) => (
                            <div
                              key={startIdx + itemIndex}
                              className={
                                "group relative overflow-hidden rounded-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full" +
                                ` ${!lightColorScheme ? "border-blue-500/30 hover:border-blue-400" : "border-border/60"}`
                              }>
                              <ImageFallback
                                className="w-full h-auto object-contain"
                                width={300}
                                height={200}
                                src={item.image}
                                alt={item.alt || "Student win"}
                              />
                              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {/* Images 18+: Display normally */}
                  {list && list.length > 17 && list.slice(17).map((item, i: number) => (
                    <div className="w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.5rem)] md:w-[calc(25%-0.5625rem)] lg:w-[calc(20%-0.6rem)]" key={17 + i} data-aos="fade-up-sm" data-aos-delay={(17 + i) * 50}>
                      <div
                        className={
                          "group relative overflow-hidden rounded-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full" +
                          ` ${!lightColorScheme ? "border-blue-500/30 hover:border-blue-400" : "border-border/60"}`
                        }>
                        <ImageFallback
                          className="w-full h-auto object-contain"
                          width={300}
                          height={400}
                          src={item.image}
                          alt={item.alt || "Student win"}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            {!hideCtaButton && button && button.enable && (
              <div className="flex flex-col items-center gap-6 mt-10 lg:mt-20">
                {!hideFirstButton && (
                  <a
                    className={
                      "btn text-white" +
                      ` ${!lightColorScheme ? "btn-outline hover:bg-blue-900" : "btn-outline-text-dark"}`
                    }
                    href={button.link}
                    target={button.link.startsWith("http") ? "_blank" : "_self"}
                    dangerouslySetInnerHTML={markdownify(button.label)}
                  />
                )}
                
                <div className="group relative w-full md:w-fit transition-transform duration-300 active:scale-95">
                  <a
                    href="/demo"
                    className="relative z-10 rounded-full bg-linear-to-br from-blue-400 to-blue-600 p-0.5 duration-300 group-hover:scale-110 block">
                    <span className="flex items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-4 md:px-10 md:py-5 font-bold text-slate-100 duration-300 group-hover:bg-slate-900/50 group-hover:text-white group-active:bg-slate-900/80 text-lg uppercase tracking-wide">
                      <FaCrown className="text-xl" />
                      Book A Call
                    </span>
                  </a>
                  <span className="pointer-events-none absolute -inset-4 z-0 transform-gpu rounded-3xl bg-linear-to-br from-blue-400 to-blue-600 opacity-30 blur-xl transition-all duration-300 group-hover:opacity-90 group-active:opacity-50" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
