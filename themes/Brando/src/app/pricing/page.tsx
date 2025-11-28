import { getListPage } from '@/lib/contentParser';
import CallToAction from '@/partials/CallToAction';
import Faq from '@/partials/Faq';
import PricingSection from '@/partials/PricingSection';
import SeoMeta from '@/partials/SeoMeta';
import Testimonials from '@/partials/Testimonials';
import { type Pricing } from '@/types';

const Pricing = () => {
  const { title, description, meta_title, image, hero } = getListPage("pricing/_index.md").frontmatter as Pricing;

  return (
    <>
      <SeoMeta title={title}
        meta_title={meta_title}
        description={description}
        image={image} />
      <PricingSection largeHeading={true} content={hero} />
      <Testimonials
        largeHeading={false}
        lightColorScheme={true}
        visibleTestimonial={3}
      />
      <Faq />
      <CallToAction />
    </>
  )
}

export default Pricing
