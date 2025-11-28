import { getSinglePage } from "@/lib/contentParser";
import CaseStudySingle from "@/partials/CaseStudySingle";
import SeoMeta from "@/partials/SeoMeta";
import { type CaseStudy } from "@/types";

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams: () => { single: string }[] = () => {
  const cases = getSinglePage("case-studies");

  const paths = cases.map((caseStudy) => ({
    single: caseStudy.slug!,
  }));

  return paths;
};

const CaseStudy = async (props: { params: Promise<{ single: string }> }) => {
  const params = await props.params;
  const cases: CaseStudy[] = getSinglePage("case-studies");
  const caseStudy = cases.filter((page) => page.slug === params.single)[0];

  const {
    title,
    meta_title,
    description,
    image
  } = caseStudy.frontmatter;

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <CaseStudySingle data={caseStudy} />
    </>
  );
};

export default CaseStudy;
