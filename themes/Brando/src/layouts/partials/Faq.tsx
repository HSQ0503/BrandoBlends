import { getListPage } from '@/lib/contentParser';
import { markdownify } from '@/lib/utils/textConverter';
import { FaqSection } from '@/types';
import { FaCrown } from 'react-icons/fa';
import Script from 'next/script';

const Faq = () => {
  const { title, description, list } = getListPage("sections/faq.md").frontmatter as FaqSection;

  return (
    <section className="section bg-light">
      <div className="container">
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
            <div className="row g-4 justify-center">
              {list?.map((item, index) => (
                <div key={index} className="lg:col-8">
                  <div className="accordion">
                    {item.title && (
                      <details
                        className="group peer faq-item"
                        {...(item.active ? { open: true } : {})}>
                        <summary className="accordion-header text-xl !p-5 justify-start">
                          <span
                            className="text-base border h-12 w-12 min-w-12 text-center flex items-center justify-center rounded-full border-text-dark"
                            dangerouslySetInnerHTML={{ __html: `${index <= 9 ? "0" : ""}${index + 1}` }}
                          />
                          <span dangerouslySetInnerHTML={{ __html: item.title }} />
                        </summary>
                      </details>
                    )}
                    {item.description && (
                      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 peer-open:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                          <div
                            className="sm:pl-24 sm:pb-5 p-5 pt-0"
                            dangerouslySetInnerHTML={markdownify(item.description)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Book A Call Button */}
            <div className="col-12 mt-10 lg:mt-16">
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

      <Script id="faq-script">
        {`
          document.addEventListener('click', function(e) {
            // Check if a summary element was clicked
            if (e.target.closest('summary')) {
              const clickedDetails = e.target.closest('details');

              // If this details is already open, let the normal toggle happen
              // Otherwise, close all other details elements
              if (!clickedDetails.open) {
                document.querySelectorAll('.faq-item').forEach(details => {
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

export default Faq
