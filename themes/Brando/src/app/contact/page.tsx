import config from "@/config/config.json";
import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { type Contact } from "@/types";

const Contact = async () => {
  const data: Contact = getListPage("contact/_index.md");
  const { title, description, meta_title, image, hero } = data.frontmatter;
  const { contact_form_action } = config.params;

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <section className="section">
        <div className="container">
          <div className="row justify-center">
            <div
              className="lg:col-8 xl:col-5 text-center pb-16 lg:pb-20"
              data-aos="fade-up-sm">
              {hero.title && (
                <h2 className="md:h1 mb-6" dangerouslySetInnerHTML={markdownify(hero.title)} />
              )}
              {hero.description && (
                <p
                  className="text-lg/[inherit]"
                  dangerouslySetInnerHTML={markdownify(hero.description)}
                />
              )}
            </div>
            <div className="col-10" data-aos="fade-up-sm" data-aos-delay="200">
              <div className="row gy-5 justify-between">
                <div className="lg:col-5 divide-y border-border space-y-4">
                  {hero.list?.map((item, i) => (
                    <div className="flex gap-4 mb-4 pb-4 last:mb-0 last:pb-0 border-border" key={i}>
                      <div className="mt-1">
                        <div className="w-6 h-6">
                          <ImageFallback
                            className="w-full h-full object-cover"
                            width={24}
                            height={24}
                            src={item.icon}
                            alt="icon"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="h6 mb-3" dangerouslySetInnerHTML={markdownify(item.title)} />
                        <div
                          className="content"
                          dangerouslySetInnerHTML={markdownify(item.description, true)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="relative lg:col-6">
                  <div>
                    <form
                      className="row g-4"
                      action={contact_form_action}
                      method="post">
                      <div className="lg:col-6">
                        <label htmlFor="name" className="form-label">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          className="form-input"
                          placeholder="Your First Name"
                          required
                          type="text"
                        />
                      </div>
                      <div className="lg:col-6">
                        <label htmlFor="name" className="form-label">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          className="form-input"
                          placeholder="Your Last Name"
                          required
                          type="text"
                        />
                      </div>
                      <div className="col-12">
                        <label htmlFor="email" className="form-label">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          className="form-input"
                          placeholder="youremail@email.com"
                          required
                          type="email"
                        />
                      </div>
                      <div className="col-12">
                        <label htmlFor="comapny-name" className="form-label">
                          Phone number <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="comapny-name"
                          name="comapny-name"
                          className="form-input"
                          placeholder="+10 (000) 000-0000"
                          required
                          type="text"
                        />
                      </div>
                      <div className="col-12">
                        <label htmlFor="message" className="form-label">
                          Write Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          className="form-input"
                          placeholder="Write Your Message Here"
                          required
                          rows={2}
                        />
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary w-full">
                          Send Message
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
