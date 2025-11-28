import { humanize } from "@/lib/utils/textConverter";

const PageHeader = ({ title, lastModified }: { title: string, lastModified?: string }) => {
  return (
    <section>
      <div className="container text-center" data-aos="fade-up-sm" data-aos-delay={200}>
        <div className="rounded-2xl px-8 pt-16 md:pt-24">
          <h1 className="h2 md:h1">{humanize(title)}</h1>
          {lastModified && (
            <p
              className="text-primary mt-6"
              data-aos="fade-up-sm"
              data-aos-delay="150"
            >
              Last update: {lastModified}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
