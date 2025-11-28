import ImageFallback from '@/helpers/ImageFallback';
import { getListPage } from '@/lib/contentParser';
import { markdownify, plainify } from '@/lib/utils/textConverter';
import { FeaturesSection } from '@/types';
import { FaCrown } from 'react-icons/fa';

const Features = () => {
  const { title, description, list_grid, list_columns } = getListPage('sections/features.md').frontmatter as FeaturesSection;

  return (
    <section className="section bg-black">
      <div className="container">
        <div className="row">
          <div
            className="mx-auto text-center lg:col-10 xl:col-6"
            data-aos="fade-up-sm">
            {title && <h2 className="mb-6 text-white" dangerouslySetInnerHTML={markdownify(title)} />}
            {description && (
              <p
                className="text-lg/[inherit] text-white"
                dangerouslySetInnerHTML={markdownify(description)}
              />
            )}
          </div>
          <div className="col-12 pt-20">
            <div className="row g-4">
              {list_grid?.map((item, gridIndex) => {
                return item.list ? (
                  <div
                    key={gridIndex}
                    className="lg:col-4"
                    data-aos="fade-up-sm"
                    data-aos-delay={gridIndex * 150}>
                    <div className="flex flex-col md:flex-row lg:flex-col min-h-full rounded-md overflow-hidden group">
                      {item.list.map((item, listIndex) => (
                        <div
                          key={listIndex}
                          className={`px-6 md:px-11 py-16 md:py-20 lg:py-0 text-center relative overflow-hidden flex flex-col h-full flex-1 justify-center group/item ${listIndex === 0 ? "bg-blue-900" : "bg-blue-900"}`}>
                          {item.title && (
                            <h3 className="h4 mb-4 text-white" dangerouslySetInnerHTML={markdownify(item.title)} />
                          )}
                          {item.description && (
                            <p className="text-lg text-white" dangerouslySetInnerHTML={markdownify(item.description)} />
                          )}

                          {item.images && (
                            <div
                              className={`${listIndex === 0 ? "group-hover/item:md:opacity-40 flex justify-between pointer-events-none absolute xl:w-[150%] md:w-[180%] w-[140%] opacity-10 md:opacity-20 left-1/2 -translate-x-1/2 inset-x-0" : "group-hover/item:top-[calc(100%_-_1.8rem)] absolute left-1/2 -translate-x-1/2 top-[calc(100%_-_2.5rem)]"} transition-all duration-300`}>
                              {item.images.map((image: string, imageIndex) => (
                                <ImageFallback
                                  key={imageIndex}
                                  width={170}
                                  height={250}
                                  loading="lazy"
                                  className={
                                    "rotating-animation transition-transform duration-500 " +
                                    (listIndex === 0
                                      ? imageIndex === 0
                                        ? "lg:group-hover/item:rotate-[20deg]"
                                        : "lg:group-hover/item:rotate-[20deg]"
                                      : "lg:group-hover/item:translate-y-5")
                                  }
                                  src={image}
                                  alt={item.title}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div
                    key={gridIndex}
                    className="md:col-6 lg:col-4"
                    data-aos="fade-up-sm"
                    data-aos-delay={gridIndex * 150}>
                    <div
                      className={`flex rounded-md group flex-col min-h-full justify-start bg-blue-900 text-white p-6 gap-y-10`}>
                      <div>
                        {item.title && (
                          <h3
                            className="h6 mb-4 text-white"
                            dangerouslySetInnerHTML={markdownify(item.title)}
                          />
                        )}
                        {item.description && (
                          <p className="text-white" dangerouslySetInnerHTML={markdownify(item.description)} />
                        )}
                      </div>

                      {item.images && (
                        <div
                          className={`${(gridIndex + 1) % 3 === 0 ? "flex justify-between -order-1" : "duration-300 transition-transform group-hover:scale-95"} py-4 md:py-8 px-6 md:px-12 bg-white/10 rounded-lg`}>
                          {item.images.map((image, imageIndex: number) => (
                            <ImageFallback

                              className={`rounded-xl duration-300 transition-all ${(gridIndex + 1) % 3 === 0 ? (imageIndex === 0 ? "group-hover:translate-y-2" : "group-hover:-translate-y-2") + " w-[calc(50%_-_0.75rem)]" : "group-hover:scale-110"}`}
                              key={imageIndex}
                              width={imageIndex === 0 ? 500 : 100}
                              height={imageIndex === 0 ? 250 : 100}
                              loading="lazy"
                              src={image}
                              alt={`image related to ${item.title}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-y-16 lg:gap-y-32 pt-16 lg:pt-32">
              {list_columns?.map((item, index) => (
                <div
                  key={index}
                  className={`row gx-0 gy-5 items-center ${index % 2 !== 0 ? "" : ""}`}>
                  <div
                    className={`${index % 2 === 0 ? "lg:pe-16" : "md:order-2 lg:ps-16"} lg:col-6`}
                    data-aos="fade-up-sm"
                    data-aos-delay={100}>
                    <div
                      className={` ${index % 2 === 0 ? "bg-white" : "bg-blue-900"} overflow-hidden flex flex-col gap-8 rounded-2xl p-8 pb-0`}>
                      {item.images &&
                        item.images.map((image: string, imageIndex: number) => (
                          <ImageFallback
                            className={`${index % 2 === 0 ? "drop-shadow-xl" : ""} rounded-t-sm ${imageIndex === 1 ? "h-[260px] object-cover object-top" : ""}`}
                            key={imageIndex}
                            width={imageIndex === 1 ? 400 : 300}
                            height={imageIndex === 1 ? 260 : 200}
                            loading="lazy"
                            src={image}
                            alt={`image related to ${plainify(item.title)}`}
                          />
                        ))}
                    </div>
                  </div>
                  <div
                    className={`${index % 2 === 0 ? "xl:ps-8" : "xl:pe-20"} lg:col-6`}
                    data-aos="fade-up-sm"
                    data-aos-delay={300}>
                    {item.title && (
                      <h3
                        className="h2 mb-6 has-highlight-text text-white"
                        dangerouslySetInnerHTML={markdownify(item.title)}
                      />
                    )}
                    {item.description && (
                      <p
                        className="text-lg/[inherit] text-white"
                        dangerouslySetInnerHTML={markdownify(item.description)}
                      />
                    )}

                    {item.list && (
                      <div className="mt-10 flex flex-col gap-10 sm:flex-row xl:mt-20 border-t border-border pt-8">
                        {item.list.map((point, index) => (
                          <div className="flex flex-col xl:flex-row gap-5" key={index}>
                            {point.icon && (
                              <div className="flex h-12 min-w-12 w-12 items-center justify-center rounded-full bg-blue-900">
                                <ImageFallback
                                  className="h-6 w-6 object-cover"
                                  width={24}
                                  height={24}
                                  src={point.icon}
                                  alt={`icon related to ${point.title}`}
                                />
                              </div>
                            )}
                            <div>
                              {point.title && (
                                <h3
                                  className="h6 mb-2 text-white"
                                  dangerouslySetInnerHTML={markdownify(point.title)}
                                />
                              )}
                              {point.description && (
                                <p className="text-white" dangerouslySetInnerHTML={markdownify(point.description)} />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {item.list_check && (
                      <ul className="columns-2 mt-10 lg:mt-20 border-t gap-x-5 border-t-white/20 pt-8">
                        {item.list_check.map((point, index) => (
                          <li className="text-lg font-medium flex gap-2 first:mt-0 mt-6 text-white" key={index}>
                            <ImageFallback
                              className="h-6 w-6 object-cover"
                              width={24}
                              height={24}
                              src="/images/icons/svg/check-green.svg"
                              alt="icon"
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="col-12 mt-6 lg:mt-10">
              <div className="flex justify-center">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
