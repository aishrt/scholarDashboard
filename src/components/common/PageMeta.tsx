import { HelmetProvider, Helmet } from "react-helmet-async";

interface PageMetaProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

const PageMeta = ({
  title,
  description,
  keywords = "Trux360, fleet management, logistics, transportation, tracking, analytics",
  ogTitle,
  ogDescription,
  ogImage = "/images/logo/trux360-logo.png",
  ogUrl = window.location.href,
  twitterCard = "summary_large_image",
  twitterTitle,
  twitterDescription,
  twitterImage = "/images/logo/trux360-logo.png",
}: PageMetaProps) => (
  <Helmet>
    {/* Basic Meta Tags */}
    <title>{`${title} | Trux360`}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    
    {/* Open Graph Meta Tags */}
    <meta property="og:type" content="website" />
    <meta property="og:title" content={ogTitle || title} />
    <meta property="og:description" content={ogDescription || description} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:url" content={ogUrl} />
    
    {/* Twitter Meta Tags */}
    <meta name="twitter:card" content={twitterCard} />
    <meta name="twitter:title" content={twitterTitle || title} />
    <meta name="twitter:description" content={twitterDescription || description} />
    <meta name="twitter:image" content={twitterImage} />
    
    {/* Additional Meta Tags */}
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#1a56db" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/images/logo/trux360-logo.png" />
  </Helmet>
);

export const AppWrapper = ({ children }: { children: React.ReactNode }) => (
  <HelmetProvider>{children}</HelmetProvider>
);

export default PageMeta;
