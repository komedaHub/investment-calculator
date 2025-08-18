import { CompoundCalculator } from '@/components/calculators/compound-calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '複利計算機',
  description: '複利の力を活用した投資シミュレーション。元本、年利率、投資期間を入力して将来の資産額を計算します。月額積立投資にも対応。',
  keywords: ['複利計算', '投資シミュレーション', '資産運用', '積立投資', '複利効果'],
  openGraph: {
    title: '複利計算機',
    description: '複利の力を活用した投資シミュレーション。将来の資産額を簡単に計算できます。',
    type: 'website',
  },
};

export default function CompoundPage() {
  return <CompoundCalculator />;
}