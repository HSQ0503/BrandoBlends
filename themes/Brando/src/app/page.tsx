import BlogSection from "@/partials/BlogSection";
import CallToAction from "@/partials/CallToAction";
import ClientGrowth from "@/partials/ClientGrowth";
import Clients from "@/partials/Clients";
import Faq from "@/partials/Faq";
import Features from "@/partials/Features";
import HomeBanner from "@/partials/HomeBanner";
import HowItWorks from "@/partials/HowItWorks";
import MediaAdvantages from "@/partials/MediaAdvantages";
import SeoMeta from "@/partials/SeoMeta";
import Testimonials from "@/partials/Testimonials";

const Home = () => {

  return (
    <>
      <SeoMeta />
      <HomeBanner />
      <Features />
      <Testimonials visibleTestimonial={16} />
      <Testimonials visibleTestimonial={15} contentSource="sections/personal-wins.md" blackBackground={true} noStacking={true} hideFirstButton={true} />
      <Faq />
      <CallToAction />
    </>
  );
};

export default Home;
