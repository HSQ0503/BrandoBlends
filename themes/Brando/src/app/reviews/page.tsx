import { getListPage } from '@/lib/contentParser';
import CallToAction from '@/partials/CallToAction';
import SeoMeta from '@/partials/SeoMeta';
import Testimonials from '@/partials/Testimonials';

const Reviews = () => {
  const { title, meta_title, description, image } = getListPage("reviews/_index.md").frontmatter;

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />

      <Testimonials
        hideCtaButton
        lightColorScheme
        largeHeading
      />
      <CallToAction />
    </>
  )
}

export default Reviews;
