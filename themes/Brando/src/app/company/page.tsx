import { getListPage } from '@/lib/contentParser';
import CallToAction from '@/partials/CallToAction';
import CompanyBanner from '@/partials/CompanyBanner';
import Faq from '@/partials/Faq';
import Gallery from '@/partials/Gallery';
import OurTeam from '@/partials/OurTeam';
import OurValues from '@/partials/OurValues';
import SeoMeta from '@/partials/SeoMeta';

const Company = () => {
  const { title, description, meta_title, image } = getListPage("company/_index.md").frontmatter;
  const galleryData = getListPage('sections/gallery.md').frontmatter;
  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <CompanyBanner />
      <Gallery data={galleryData} />
      <OurValues />
      <OurTeam />
      <Faq />
      <CallToAction />
    </>
  )
}

export default Company;
