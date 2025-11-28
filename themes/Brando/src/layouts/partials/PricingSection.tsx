import ImageFallback from '@/helpers/ImageFallback';
import { getListPage } from '@/lib/contentParser';
import { markdownify } from '@/lib/utils/textConverter';
import { type PricingSection } from '@/types';
import Script from 'next/script';

const PricingSection = ({ largeHeading, content }: { largeHeading?: boolean, content?: { title: string, description: string } }) => {
  let { title, description, bg_gradient_image, plans, plans_labels, savings } = getListPage("sections/pricing.md").frontmatter as PricingSection;

  // Override default blog data (Title & Description) with props if provided
  if (content) {
    ({ title, description } = content);
  }
  return (
    <section className="section relative overflow-hidden">
      <div className="container">
        <div
          aria-hidden="true"
          className="blur-[100px] h-[1004px] left-1/2 -translate-x-1/2 opacity-90 absolute w-full z-0 top-[30%]">
          <ImageFallback
            className="w-full object-cover object-center h-full"
            height={1050}
            width={200}
            src={bg_gradient_image}
            alt="gradient background"
          />
        </div>
        <div className="row">
          <div
            className="mx-auto text-center lg:col-8 xl:col-7"
            data-aos="fade-up-sm">
            {title &&
              (largeHeading ? (
                <h1
                  className="mb-6 [&>strong]:text-primary"
                  dangerouslySetInnerHTML={markdownify(title)}
                />
              ) : (
                <h2
                  className="mb-6 [&>strong]:text-primary"
                  dangerouslySetInnerHTML={markdownify(title)}
                />
              ))}
            {description && (
              <p
                className="text-lg/[inherit]"
                dangerouslySetInnerHTML={markdownify(description)}
              />
            )}
          </div>
          <div className="col-12 pt-20">
            <div className="row gx-4">
              {plans_labels && savings && (
                <div
                  className="col-12 pb-10"
                  data-aos="fade-up-sm"
                  data-aos-delay="200">
                  <div className="flex items-center justify-center gap-x-3">
                    {plans_labels.map((plan, index) => (
                      <span
                        key={index}
                        className={`select-none font-medium ${index === 0 ? "order-0" : "order-3"}`}
                        dangerouslySetInnerHTML={markdownify(plan)}
                      />
                    ))}
                    <label className="relative inline-block h-8 w-16 cursor-pointer order-1 rounded-full bg-white border border-border">
                      <span className="sr-only">Pricing Switcher</span>
                      <input
                        type="checkbox"
                        id="pricing-checkbox"
                        className="pricing-check peer w-full cursor-pointer opacity-0"
                      />
                      <span className="absolute left-0 -top-px cursor-pointer before:absolute before:left-1 before:top-1 before:h-6 before:w-6 before:translate-x-0 before:rounded-full before:bg-green-500 before:transition-all before:delay-75 before:duration-300 peer-checked:before:translate-x-8" />
                    </label>
                    <span
                      className="order-3 text-white bg-primary px-2.5 text-sm py-1 rounded-full"
                      dangerouslySetInnerHTML={markdownify(savings)}
                    />
                  </div>
                </div>
              )}

              <div className="col-12">
                <div className="row gy-4">
                  {plans?.map((item, index) => (
                    <div
                      key={index}
                      className="lg:col-4"
                      data-aos="fade-up-sm"
                      data-aos-delay={200 + index * 150}>
                      <div
                        className={`bg-white drop-shadow-2xl shadow-text-dark/5 group mb-12 flex flex-col items-start md:gap-14 gap-7 min-h-full rounded-xl p-8 last:mb-0`}>
                        <div className="flex flex-col gap-6">
                          <div className="flex flex-wrap items-center justify-between w-full gap-4">
                            {item.title && (
                              <h3 className="counter text-lg font-semibold">
                                <span dangerouslySetInnerHTML={markdownify(item.title)} />
                              </h3>
                            )}
                            {item.badge?.enable && (
                              <span
                                className="rounded-full text-sm badge-bg px-3 py-1 font-medium"
                                dangerouslySetInnerHTML={markdownify(item.badge.label!)}
                              />
                            )}
                          </div>
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            {item.price_monthly && (
                              <strong className="h2">
                                {item.price_prefix}
                                <span
                                  className="data-count"
                                  data-count-monthly={item.price_monthly}
                                  dangerouslySetInnerHTML={markdownify(item.price_monthly)}
                                />
                              </strong>
                            )}
                            {item.price_description_monthly && (
                              <span
                                className="mt-6 capitalize text-sm"
                                dangerouslySetInnerHTML={markdownify(
                                  item.price_description_monthly
                                )}
                              />
                            )}
                          </div>
                          {item.description && (
                            <p dangerouslySetInnerHTML={markdownify(item.description)} />
                          )}
                          {item.features && (
                            <ul className="mt-2">
                              {item.features.map((feature, i: number) => (
                                <li key={i} className="mb-2">
                                  <ImageFallback
                                    className="w-6 inline-block me-2"
                                    height={200}
                                    width={200}
                                    src="/images/icons/svg/check-narrow.svg"
                                    alt="check"
                                  />
                                  <span dangerouslySetInnerHTML={markdownify(feature)} />
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        {item.button && item.button.enable && (
                          <a
                            className="btn btn-primary hover-text-dark text-center w-full mt-auto"
                            href={item.button.link}>
                            {item.button.label}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Script id="pricing-script">
        {`
          function pricingInit() {
            // Select the toggle switch element
            const toggleSwitch = document.querySelector(".pricing-check");
            const numbers = document.querySelectorAll(".data-count");

            if (toggleSwitch) {
              toggleSwitch.addEventListener("change", function() {
                if (this.checked) {
                  // Yearly pricing
                  numbers.forEach(function(number) {
                    const yearlyCount = number.getAttribute("data-count-yearly");
                    if (yearlyCount) {
                      number.innerHTML = yearlyCount;
                      animateCounter(number, parseInt(yearlyCount, 10));
                    }
                  });
                  toggleVisibility(".text-yearly", "block", "hidden");
                  toggleVisibility(".text-monthly", "hidden", "block");
                } else {
                  // Monthly pricing
                  numbers.forEach(function(number) {
                    const monthlyCount = number.getAttribute("data-count-monthly");
                    if (monthlyCount) {
                      number.innerHTML = monthlyCount;
                      animateCounter(number, parseInt(monthlyCount, 10));
                    }
                  });
                  toggleVisibility(".text-monthly", "block", "hidden");
                  toggleVisibility(".text-yearly", "hidden", "block");
                }
              });
            }

            function animateCounter(element, endValue) {
              let startValue = 0;
              const duration = 250;
              let startTime = null;

              function step(currentTime) {
                if (!startTime) startTime = currentTime;
                const progress = currentTime - startTime;
                const value = Math.min(progress / duration, 1) * (endValue - startValue) + startValue;
                element.innerHTML = Math.ceil(value).toString();
                if (progress < duration) {
                  requestAnimationFrame(step);
                }
              }

              requestAnimationFrame(step);
            }

            function toggleVisibility(selector, addClass, removeClass) {
              const elements = document.querySelectorAll(selector);
              elements.forEach(function(element) {
                element.classList.add(addClass);
                element.classList.remove(removeClass);
              });
            }
          }

          // Run the pricing initialization when the DOM is fully loaded
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', pricingInit);
          } else {
            pricingInit();
          }

          // Re-run when needed (backup trigger)
          setTimeout(pricingInit, 500);
        `}
      </Script>
    </section>
  )
}

export default PricingSection
