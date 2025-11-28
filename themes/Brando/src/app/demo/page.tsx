import QuestionnaireForm from '../../components/QuestionnaireForm';
import SeoMeta from '@/partials/SeoMeta';

const DemoPage = () => {
  return (
    <>
      <SeoMeta
        title="Book a Call - Brando Blends"
        meta_title="Book a Call with Brando Blends"
        description="Ready to scale your barber business? Fill out our quick questionnaire and let's get you to $15k-$20k/month."
        image="/images/og-image.png"
      />

      <QuestionnaireForm />
    </>
  )
}

export default DemoPage;
