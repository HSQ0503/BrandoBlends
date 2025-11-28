import ImageFallback from '@/helpers/ImageFallback';
import { getListPage } from '@/lib/contentParser';
import { markdownify } from '@/lib/utils/textConverter';

interface ClientGrowthImage {
  src: string;
  alt: string;
}

interface ClientGrowthTestimonial {
  name: string;
  result: string;
  image: string;
}

interface ClientGrowthSection {
  title: string;
  subtitle?: string;
  description?: string;
  images: ClientGrowthImage[];
  testimonials?: ClientGrowthTestimonial[];
  button?: {
    enable: boolean;
    label: string;
    link: string;
  };
}

const ClientGrowth = () => {
  const { title, subtitle, description, images, button } = getListPage('sections/client-growth.md').frontmatter as ClientGrowthSection;

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="row">
          <div className="mx-auto text-center lg:col-10 xl:col-8" data-aos="fade-up-sm">
            {title && <h2 className="mb-4 has-highlight-text" dangerouslySetInnerHTML={markdownify(title)} />}
            {subtitle && (
              <p className="text-xl font-semibold mb-3" dangerouslySetInnerHTML={markdownify(subtitle)} />
            )}
            {description && (
              <p
                className="text-lg/[inherit]"
                dangerouslySetInnerHTML={markdownify(description)}
              />
            )}
          </div>
        </div>

        {/* Collage Grid */}
        <div className="row mt-16 lg:mt-20">
          <div className="col-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {images?.map((image, index) => (
                <div
                  key={index}
                  className={`${
                    index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                  } group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300`}
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}>
                  <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    <ImageFallback
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      src={image.src}
                      alt={image.alt}
                      width={600}
                      height={800}
                      loading="lazy"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        {button?.enable && (
          <div className="row mt-12 lg:mt-16">
            <div className="col-12 text-center" data-aos="fade-up-sm">
              <a
                className="btn btn-primary btn-lg"
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

export default ClientGrowth;

