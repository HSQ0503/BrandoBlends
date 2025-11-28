import { getListPage } from '@/lib/contentParser';
import CallToAction from '@/partials/CallToAction';
import CaseStudySection from '@/partials/CaseStudySection';
import SeoMeta from '@/partials/SeoMeta';
import { CaseStudy } from '@/types';

const CaseStudies = () => {
  const { title, meta_title, image, description } = getListPage("case-studies/_index.md").frontmatter as CaseStudy["frontmatter"];

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        image={image}
        description={description}
      />
      <CaseStudySection />
      <CallToAction />
    </>
  )
}

export default CaseStudies;
