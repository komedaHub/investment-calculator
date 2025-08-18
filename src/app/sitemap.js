export default function sitemap() {
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://example.com/compound',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // 将来的に追加される計算機ページ用
    {
      url: 'https://example.com/nisa',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://example.com/ideco',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://example.com/loan',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}