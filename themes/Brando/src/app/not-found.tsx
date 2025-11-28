import ImageFallback from "@/helpers/ImageFallback";
import SeoMeta from "@/partials/SeoMeta";
import Link from "next/link";

const NotFound = async () => {
  return (
    <>
      <SeoMeta title={"Page Not Found"} />
      <section className="section text-center">
        <div className="container" data-aos="fade-up-sm">
          <div className="row justify-center">
            <div className="sm:col-10 md:col-8 lg:col-7 text-center">
              <ImageFallback
                className="mx-auto mb-10 block w-[600px]"
                width={600}
                height={400}
                data-aos="fade-up-sm"
                data-aos-delay="150"
                src="/images/404.png"
                alt="404 image"
              />
              <p className="text-xl/inherit">
                Opps! The page that you are looking for is not found
              </p>
              <Link href="/" className="btn btn-primary mt-8">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
