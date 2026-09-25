import { Metadata } from "next";

export const siteConfig = {
  name: "Eagle's Lab",
  description:
    "A world-class neuroscience research laboratory advancing brain science, neural engineering, and cognitive research through innovative interdisciplinary collaboration.",
  url: "https://eagleslab.edu",
  ogImage: "https://eagleslab.edu/og-image.jpg",
  twitter: "@eagleslab",
  authors: [
    { name: "Eagle's Lab Research Team", url: "https://eagleslab.edu" },
  ],
  keywords: [
    "neuroscience",
    "brain research",
    "neural engineering",
    "cognitive science",
    "neurobiology",
    "academic research",
    "laboratory",
    "Eagle's Lab",
    "neuroimaging",
    "neuroplasticity",
    "computational neuroscience",
    "neuroinformatics",
  ],
  locale: "en_US",
  type: "website" as const,
};

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  noIndex?: boolean;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}

export function generateSEO({
  title,
  description,
  image,
  url,
  noIndex = false,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const fullDescription = description || siteConfig.description;
  const fullUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
  const fullImage = image || siteConfig.ogImage;

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: siteConfig.keywords,
    authors: siteConfig.authors,
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: fullUrl,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url: fullUrl,
      siteName: siteConfig.name,
      title: fullTitle,
      description: fullDescription,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${fullTitle}`,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors }),
      ...(tags && { tags }),
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitter,
      creator: siteConfig.twitter,
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
    },
    verification: {
      google: "your-google-verification-code",
      yandex: "your-yandex-verification-code",
    },
    other: {
      "apple-mobile-web-app-title": siteConfig.name,
      "application-name": siteConfig.name,
      "msapplication-TileColor": "#0B6B3A",
      "theme-color": "#0B6B3A",
    },
  };
}

export function generateArticleSEO(
  title: string,
  description: string,
  publishedTime: string,
  modifiedTime: string,
  authors: string[],
  tags: string[],
  url: string
): Metadata {
  return generateSEO({
    title,
    description,
    url,
    type: "article",
    publishedTime,
    modifiedTime,
    authors,
    tags,
  });
}

export function generateProfileSEO(
  name: string,
  description: string,
  url: string,
  image?: string
): Metadata {
  return generateSEO({
    title: name,
    description,
    url,
    type: "profile",
    image,
  });
}

export const jsonLd = {
  organization: {
    "@context": "https://schema.org",
    "@type": "ResearchProject",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [
      "https://twitter.com/eagleslab",
      "https://linkedin.com/company/eagleslab",
      "https://github.com/eagleslab",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
      addressLocality: "University District",
      addressRegion: "State",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Research Inquiries",
      email: "research@eagleslab.edu",
    },
  },
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  },
};

export function generateOrganizationJsonLd() {
  return {
    __html: JSON.stringify(jsonLd.organization),
  };
}

export function generateWebsiteJsonLd() {
  return {
    __html: JSON.stringify(jsonLd.website),
  };
}