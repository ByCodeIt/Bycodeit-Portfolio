// ✅ Structured Data(JSON - LD)
const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ByCodeIt Solutions",
    "url": "https://bycodeit.dev",
    "logo": "https://bycodeit.dev/assets/og-image.jpg",
    "sameAs": [
        "https://twitter.com/bycodeit",
        "https://linkedin.com/company/bycodeit"
    ],
    "description": "We build modern, responsive, and SEO-optimized websites for businesses and startups in Nigeria and beyond."
};

const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify(structuredData);
document.head.appendChild(script);
// End