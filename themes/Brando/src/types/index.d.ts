export type RegularPage = {
  frontmatter: {
    title: string;
    image?: string;
    description?: string;
    meta_title?: string;
    layout?: string;
    draft?: boolean;
  };
  content: string;
  slug?: string;
};

export type Button = {
  enable: boolean;
  label: string;
  link: string;
};

export type Blog = {
  frontmatter: {
    title: string;
    description: string;
    meta_title?: string;
    hero?: {
      title: string;
      description: string;
    };
    button?: Button;
    list?: Array<{
      name: string;
      designation: string;
      avatar: string;
      content: string;
    }>;
    date?: Date | string;
    image: string;
    draft?: boolean;
  };
  content: string;
  slug?: string;
};

export type CaseStudy = {
  frontmatter: {
    title: string;
    meta_title?: string;
    description: string;
    image?: string;
    draft?: boolean;
    date?: string;
    hero?: {
      title: string;
      description: string;
    };
  };
  content: string;
  slug: string;
};

export type Contact = {
  frontmatter: {
    title: string;
    meta_title?: string;
    description: string;
    image?: string;
    draft: boolean;
    hero: {
      title: string;
      description: string;
      list: Array<{
        icon: string;
        title: string;
        description: string;
      }>;
    };
  };
  content: string;
  slug?: string;
};

export type Demo = {
  title: string;
  meta_title?: string;
  description: string;
  image?: string;
  draft: boolean;
  hero: {
    title: string;
    description: string;
    list: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
};

export type Pricing = {
  title: string;
  meta_title?: string;
  description: string;
  image?: string;
  draft: boolean;
  hero: {
    title: string;
    description: string;
  };
};

export type CtaSection = {
  enable: boolean;
  title: string;
  image: string;
  description: string;
  button: Button;
};

export type ChangelogSection = {
  title: string;
  description?: string;
  list: Array<{
    version: string;
    date: string;
    content: string;
  }>;
};

export type ClientsSection = {
  title: string;
  list: string[];
};

export type CompanyBannerSection = {
  title: string;
  description: string;
  image: string;
  bg_image: string;
  button: Button;
  about: {
    enable: boolean;
    title: string;
    description: string;
  };
  stats: Array<{
    label: string;
    value: string;
  }>;
};

export type FaqSection = {
  title: string;
  description: string;
  exclusive_open: boolean;
  exclusive_open_group: string;
  list?: Array<{
    title: string;
    description: string;
    active?: boolean;
  }>;
};

export type FeaturesSection = {
  title: string;
  description: string;
  list_grid?: Array<{
    title?: string;
    description?: string;
    images?: string[];
    list?: Array<{
      title?: string;
      description?: string;
      images?: string[];
    }>;
  }>;
  list_columns: Array<{
    title: string;
    description: string;
    images: string[];
    list?: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    list_check?: string[];
  }>;
};

export type GallerySection = {
  title: string;
  images: string[];
};

export type HomeBannerSection = {
  title: string;
  subtitle: string;
  description: string;
  bg_image?: string;
  animating_images: string[];
  images: Array<{
    src: string;
    alt: string;
  }>;
  buttons: Array<Button>;
};

export type HowItWorksSection = {
  title: string;
  description: string;
  list: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
};

export type IntegrationSection = {
  title: string;
  description: string;
  bg_gradient_image: string;
  list: Array<{
    name: string;
    image: string;
    description: string;
  }>;
};

export type MediaAdvantagesSection = {
  title: string;
  image: string;
  bg_image: string;
  description: string;
  exclusive_open: boolean;
  exclusive_open_group: string;
  list: Array<{
    icon: string;
    title: string;
    description: string;
    active?: boolean;
  }>;
};

export type OurTeamSection = {
  title: string;
  list: Array<{
    name: string;
    image: string;
    company: string;
  }>;
};

export type OurValuesSection = {
  title: string;
  description: string;
  list: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
};

export type PricingSection = {
  title: string;
  description: string;
  bg_gradient_image: string;
  savings: string;
  plans_labels: string[];
  plans: Array<{
    title: string;
    description: string;
    price_prefix: string;
    price_monthly: string;
    price_yearly: string;
    price_description_monthly: string;
    price_description_yearly: string;
    features: string[];
    badge: {
      enable: boolean;
      label?: string;
    };
    button: Button;
  }>;
};

export type TestimonialSection = {
  title: string;
  description: string;
  button: Button;
  list: Array<{
    name?: string;
    designation?: string;
    avatar?: string;
    content?: string;
    image?: string;
    alt?: string;
  }>;
};
