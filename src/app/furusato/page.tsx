import { Metadata } from 'next';
import { FurusatoCalculator } from '@/components/calculators/furusato-calculator';

export const metadata: Metadata = {
  title: 'ふるさと納税 控除上限額シミュレーター - 投資かんたん計算',
  description: '年収や家族構成から、ふるさと納税の控除上限額を自動計算。実質自己負担2,000円で最大限の節税効果を得られる金額をシミュレーション。住宅ローン控除、医療費控除等の併用も計算可能。',
  keywords: [
    'ふるさと納税',
    '控除上限額',
    'シミュレーション',
    '年収別',
    '節税',
    '計算機',
    '住宅ローン控除',
    '医療費控除',
    'ワンストップ特例'
  ],
  openGraph: {
    title: 'ふるさと納税 控除上限額シミュレーター',
    description: '年収や家族構成から、ふるさと納税の控除上限額を自動計算。実質2,000円で最大限の節税効果を実現。',
    type: 'website',
    url: 'https://example.com/furusato',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ふるさと納税 控除上限額シミュレーター',
    description: '年収や家族構成から、ふるさと納税の控除上限額を自動計算',
  },
  alternates: {
    canonical: 'https://example.com/furusato',
  },
};

export default function FurusatoPage() {
  return <FurusatoCalculator />;
}