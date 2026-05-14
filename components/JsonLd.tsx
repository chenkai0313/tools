import type { FC } from 'react'

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbListProps {
  items: BreadcrumbItem[]
}

export const BreadcrumbListSchema: FC<BreadcrumbListProps> = ({ items }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      }),
    }}
  />
)

interface WebAppSchemaProps {
  name: string
  description: string
  url: string
  lang?: string
}

export const WebApplicationSchema: FC<WebAppSchemaProps> = ({ name, description, url, lang }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name,
        description,
        url,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript",
        inLanguage: lang || "zh,en",
        offers: { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        publisher: {
          "@type": "Organization",
          name: "Ken Webmaster Tools",
          url: "https://schg.xyz",
        },
      }),
    }}
  />
)

interface OrganizationSchemaProps {
  name?: string
  url?: string
  email?: string
  description?: string
}

export const OrganizationSchema: FC<OrganizationSchemaProps> = ({
  name = "Ken Webmaster Tools",
  url = "https://schg.xyz",
  email = "ckck0313@gmail.com",
  description = "Free online developer tools — all client-side, privacy-first.",
}) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name,
        url,
        email,
        description,
        sameAs: [],
      }),
    }}
  />
)

export const WebSiteSchema: FC = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Ken Webmaster Tools",
        url: "https://schg.xyz",
        inLanguage: ["zh", "en"],
        potentialAction: {
          "@type": "SearchAction",
          target: "https://schg.xyz/zh/tools/{search_term_string}",
          "query-input": "required name=search_term_string",
        },
      }),
    }}
  />
)

interface FAQSchemaProps {
  questions: { question: string; answer: string }[]
}

export const FAQSchema: FC<FAQSchemaProps> = ({ questions }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: questions.map(q => ({
          "@type": "Question",
          name: q.question,
          acceptedAnswer: { "@type": "Answer", text: q.answer },
        })),
      }),
    }}
  />
)
