"use client";

import Logo from "@/components/Logo";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import social from "@/config/social.json";
import { markdownify } from "@/lib/utils/textConverter";
import Link from "next/link";

const Footer = () => {
  const { footer_quick_links, footer_other_links } = menu;

  // Function to replace {year} this from string to year
  function replaceYear(text: string) {
    const year = new Date().getFullYear();

    return text.replace("{year}", year.toString());
  }
  return (
    <footer className="bg-dark py-16 xl:py-24">
      <div className="container" data-aos="fade-up-sm">
        <div className="row gy-5 md:gy-6">
          <div className="lg:col-6 lg:pe-8">
            <div className="sm:max-w-sm">
              <Logo src={config.site.logo} />
              {
                config.params.footer_description && (
                  <p
                    className="mt-6 mb-6 text-text-light/80"
                    dangerouslySetInnerHTML={markdownify(config.params.footer_description)}
                  />
                )
              }
              {
                config.subscription && config.subscription.enable && (
                  <form
                    action={config.subscription.form_action}
                    method="post"
                    className="flex justify-between gap-2.5 w-fit">
                    <input
                      type="email"
                      placeholder="Get free barber tips"
                      className=" !rounded-full text-base-sm md:text-base !border-transparent !text-text-light/80 bg-white/5 py-2.5 px-4 placeholder:text-base-sm placeholder:md:text-base placeholder:!opacity-100 placeholder:!text-text-light/40 focus:ring-0"
                      required
                    />
                    <button
                      className="rounded-full bg-white px-5 py-1 font-bold transition hover:opacity-80 text-base-sm md:text-base cursor-pointer"
                      type="submit">
                      Join
                    </button>
                  </form>
                )
              }
            </div>
          </div>
          <div className="lg:col-6">
            <div
              className="flex flex-col sm:flex-row gap-y-6 md:flex-nowrap flex-wrap justify-between">
              <div>
                <h3 className="mb-4 pt-2 text-sm font-normal text-white/50 md:mb-6">
                  Quick Links
                </h3>
                <ul className="flex flex-col gap-3">
                  {
                    footer_quick_links.map((item, i: number) => (
                      <li key={i}>
                        <Link
                          className="font-medium transition text-white hover:text-primary duration-500"
                          href={item.url}>
                          {item.name}
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div>
                <h3 className="mb-4 pt-2 text-sm font-normal text-white/50 md:mb-6">
                  Other Links
                </h3>
                <ul className="flex flex-col gap-3">
                  {
                    footer_other_links.map((item, i: number) => (
                      <li key={i}>
                        <Link
                          className="font-medium transition text-white hover:text-primary duration-500"
                          href={item.url}>
                          {item.name}
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div>
                <h3 className="mb-4 pt-2 text-sm font-normal text-white/50 md:mb-6">
                  Social Media
                </h3>
                <ul className="flex flex-col gap-3">
                  {
                    social.main.map((item, i: number) => (
                      <li key={i}>
                        <Link
                          className="font-medium transition text-white hover:text-primary duration-500 capitalize"
                          href={item.link}
                          target="_blank">
                          {item.name}
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="mt-10 md:mt-16 pt-7 md:pt-10 border-t border-border/10">
          <div className="max-w-4xl mx-auto space-y-6 text-white/70 text-sm leading-relaxed">
            <div className="text-center">
              <p className="text-white/90 font-medium">
                Have questions? Contact us at:{" "}
                <a 
                  href="mailto:brandoblends@barbercoach.net" 
                  className="text-blue-400 hover:text-blue-300 underline">
                  brandoblends@barbercoach.net
                </a>
              </p>
            </div>

            <p className="text-justify">
              Note that under some legislations, we may be allowed to process information until you object to such processing (by opting out), without having to rely on consent or any other of the following legal bases below. In any case, we will be happy to clarify the specific legal basis that applies to the processing, and in particular whether the provision of Personal Information is a statutory or contractual requirement, or a requirement necessary to enter into a contract. You further understand that this is a soft pull and will not harm your credit in any way whatsoever.
            </p>

            <p className="text-justify">
              This site is not a part of the Facebook website or Facebook Inc. Additionally, This site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.
            </p>

            <div className="border-t border-border/10 pt-6">
              <p className="text-justify font-medium text-white/80">
                <span className="text-white font-bold">DISCLAIMER:</span> The sales figures stated above are my personal and my students' personal sales figures. Please understand these results are not typical, I'm not implying you'll duplicate them (or do anything for that matter). I am an experienced marketer. The average person who buys any "how to" information gets little to no results. I'm using these references for example purposes only. Your results will vary and depend on many factors… including but not limited to your background, experience, and work ethic. All business entails risk as well as massive and consistent effort and action. If you're not willing to accept that, please DO NOT BOOK A CALL.
              </p>
            </div>
          </div>
        </div>

        {
          config.params.copyright && (
            <div
              className="text-center text-sm text-white mt-10 md:mt-12 pt-7 md:pt-10 border-t border-border/10 [&>a]:underline"
              dangerouslySetInnerHTML={markdownify(replaceYear(config.params.copyright))}
            />
          )
        }
      </div>
    </footer>
  );
};

export default Footer;
