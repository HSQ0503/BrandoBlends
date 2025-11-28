import CaseStudyCard from '@/components/CaseStudyCard';
import { getListPage, getSinglePage } from '@/lib/contentParser';
import { markdownify } from '@/lib/utils/textConverter';
import { CaseStudy } from '@/types';

const CaseStudySection = () => {
  const { hero } = getListPage("case-studies/_index.md").frontmatter as CaseStudy["frontmatter"];
  const caseStudies = getSinglePage("case-studies");

  return (
    <section className="section relative">
      <div className="container">
        <div className="row">
          <div
            className="mx-auto text-center lg:col-8 xl:col-6"
            data-aos="fade-up-sm">
            {hero?.title && (
              <h1
                className="mb-6 [&>strong]:text-primary"
                dangerouslySetInnerHTML={markdownify(hero.title)}
              />
            )}
            {hero?.description && (
              <p
                className="text-lg/[inherit]"
                dangerouslySetInnerHTML={markdownify(hero?.description)}
              />
            )}
          </div>
          <div className="col-12 pt-20" data-aos="fade-up-sm" data-aos-delay={200}>
            <div className="row g-5 justify-center">
              {caseStudies?.map((item, i) => (
                <div className="lg:col-6" key={i}>
                  <CaseStudyCard data={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CaseStudySection;
