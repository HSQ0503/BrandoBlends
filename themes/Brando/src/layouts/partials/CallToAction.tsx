import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import { CtaSection } from "@/types";
import { FaCrown } from 'react-icons/fa';

const CallToAction = () => {
  const { enable, title, description, button } = getListPage("sections/call-to-action.md").frontmatter as CtaSection;

  return (
    <>
      {
        enable && (
          <section className="pt-16 xl:pt-24 bg-dark">
            <div className="container">
              <div className="row items-center justify-center">
                <div className="xl:col-8 lg:col-10 text-center">
                  <h2
                    dangerouslySetInnerHTML={markdownify(title)}
                    className="text-text-light mb-4"
                    data-aos="fade-up-sm"
                  />
                  <p
                    dangerouslySetInnerHTML={markdownify(description)}
                    className="text-text-light/70 text-lg/[inherit] mb-6"
                    data-aos="fade-up-sm"
                    data-aos-delay="50"
                  />
                  {button.enable && (
                    <div data-aos="fade-up-sm" data-aos-delay="200" className="flex justify-center">
                      <div className="group relative w-full md:w-fit transition-transform duration-300 active:scale-95">
                        <a
                          href={button.link}
                          target={button.link.startsWith("http") ? "_blank" : "_self"}
                          rel="noopener"
                          className="relative z-10 rounded-full bg-linear-to-br from-blue-400 to-blue-600 p-0.5 duration-300 group-hover:scale-110 block">
                          <span className="flex items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-4 md:px-10 md:py-5 font-bold text-slate-100 duration-300 group-hover:bg-slate-900/50 group-hover:text-white group-active:bg-slate-900/80 text-lg uppercase tracking-wide">
                            <FaCrown className="text-xl" />
                            {button.label}
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
        )
      }
    </>
  );
};

export default CallToAction;
