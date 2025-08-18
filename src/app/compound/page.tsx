import { CompoundCalculator } from '@/components/calculators/compound-calculator';
import { Metadata } from 'next';
import { StructuredData } from '@/components/seo/structured-data';

export const metadata: Metadata = {
  title: '複利計算機',
  description: '複利の力を活用した投資シミュレーション。元本、年利率、投資期間を入力して将来の資産額を計算します。月額積立投資にも対応。',
  keywords: ['複利計算', '投資シミュレーション', '資産運用', '積立投資', '複利効果'],
  openGraph: {
    title: '複利計算機',
    description: '複利の力を活用した投資シミュレーション。将来の資産額を簡単に計算できます。',
    type: 'website',
    url: 'https://example.com/compound',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '複利計算機 - 投資シミュレーション',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '複利計算機',
    description: '複利の力を活用した投資シミュレーション。将来の資産額を簡単に計算できます。',
    images: ['/twitter-card.png'],
  },
};

export default function CompoundPage() {
  const breadcrumbs = [
    { name: 'ホーム', url: '/' },
    { name: '複利計算機', url: '/compound' }
  ];

  return (
    <>
      <StructuredData 
        type="calculator"
        title="複利計算機"
        description="複利の力を活用した投資シミュレーション。元本、年利率、投資期間を入力して将来の資産額を計算します。"
        url="/compound"
        breadcrumbs={breadcrumbs}
      />
      <CompoundCalculator />
    </>
  );
}