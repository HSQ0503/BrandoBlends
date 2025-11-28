import { getListPage } from '@/lib/contentParser';
import { markdownify } from '@/lib/utils/textConverter';

interface HowItWorksItem {
  number: string;
  title: string;
  description: string;
}

interface HowItWorksSection {
  title: string;
  description?: string;
  list: HowItWorksItem[];
  button?: {
    enable: boolean;
    label: string;
    link: string;
  };
}

const HowItWorks = () => {
  const { title, description, list, button } = getListPage('sections/how-it-works.md').frontmatter as HowItWorksSection;

  return (
    <section className="section relative overflow-hidden bg-linear-to-b from-white via-gray-50 to-white py-12 lg:py-16">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(74,222,128,0.05),transparent_50%)]"></div>
      
      <div className="container relative z-10">
        <div className="row">
          <div className="mx-auto text-center lg:col-10 xl:col-8" data-aos="fade-up-sm">
            {title && (
              <h2 className="mb-3 text-3xl lg:text-4xl font-bold" dangerouslySetInnerHTML={markdownify(title)} />
            )}
            {description && (
              <p
                className="text-base text-gray-600"
                dangerouslySetInnerHTML={markdownify(description)}
              />
            )}
          </div>
        </div>

        <div className="row mt-10 lg:mt-12 gy-4 lg:gy-6">
          {list?.map((item, index) => (
            <div
              key={index}
              className="md:col-6 lg:col-4"
              data-aos="fade-up-sm"
              data-aos-delay={index * 100}>
              <div className="group relative h-full">
                {/* Card */}
                <div className="relative h-full bg-white rounded-2xl p-6 lg:p-7 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  {/* Number Badge */}
                  <div className="mb-5">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-primary/80 text-white font-bold text-xl shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-300">
                      {item.number}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h3 
                      className="text-lg lg:text-xl font-bold mb-3 text-gray-900 tracking-tight" 
                      dangerouslySetInnerHTML={markdownify(item.title)} 
                    />
                    <p 
                      className="text-sm lg:text-base text-gray-600 leading-relaxed" 
                      dangerouslySetInnerHTML={markdownify(item.description)} 
                    />
                  </div>

                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>

                {/* Connecting line for desktop */}
                {index < 2 && (
                  <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-linear-to-r from-gray-200 to-transparent"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {button?.enable && (
          <div className="row mt-8 lg:mt-10">
            <div className="col-12 text-center" data-aos="fade-up-sm" data-aos-delay="300">
              <a
                className="btn btn-primary text-base px-7 py-3 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
                href={button.link}
                target={button.link.startsWith("http") ? "_blank" : "_self"}
                rel="noopener">
                {button.label}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HowItWorks;

