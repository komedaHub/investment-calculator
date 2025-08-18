"use client"

interface StructuredDataProps {
  type?: 'home' | 'calculator'
  title?: string
  description?: string
  url?: string
  breadcrumbs?: Array<{
    name: string
    url: string
  }>
}

export function StructuredData({ 
  type = 'home', 
  title, 
  description, 
  url = '/',
  breadcrumbs = [] 
}: StructuredDataProps) {
  const baseUrl = 'https://example.com'
  
  // WebApplication schema for the site
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "投資かんたん計算",
    "description": "投資・資産運用に関する計算を簡単に行える実用ツール集。複利計算、つみたてNISA、iDeCo、住宅ローンなどの計算をサポート。",
    "url": baseUrl,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "JPY"
    },
    "author": {
      "@type": "Organization",
      "name": "投資かんたん計算"
    },
    "inLanguage": "ja",
    "audience": {
      "@type": "Audience",
      "audienceType": "個人投資家",
      "geographicArea": {
        "@type": "Country",
        "name": "Japan"
      }
    }
  }

  // Calculator-specific schema
  const calculatorSchema = type === 'calculator' ? {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": title || "投資計算機",
    "description": description || "投資・資産運用計算ツール",
    "url": `${baseUrl}${url}`,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "JPY"
    },
    "isPartOf": {
      "@type": "WebApplication",
      "name": "投資かんたん計算",
      "url": baseUrl
    }
  } : null

  // Breadcrumb schema
  const breadcrumbSchema = breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${baseUrl}${crumb.url}`
    }))
  } : null

  // FAQ schema for investment calculations (common questions)
  const faqSchema = type === 'home' ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "複利計算とは何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "複利計算とは、元本に加えて発生した利息にも利息が付く計算方法です。時間をかけることで資産が指数関数的に増加する「複利の力」を活用した投資計算の基本です。"
        }
      },
      {
        "@type": "Question", 
        "name": "月額積立投資のメリットは？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "月額積立投資は、定期的に一定額を投資することで、価格変動リスクを分散し、平均購入単価を下げる効果（ドルコスト平均法）があります。また、少額から始められるため初心者にもおすすめです。"
        }
      }
    ]
  } : null

  const schemas = [webAppSchema, calculatorSchema, breadcrumbSchema, faqSchema].filter(Boolean)

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}