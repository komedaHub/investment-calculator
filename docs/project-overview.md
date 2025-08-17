# 投資・資産運用計算機 プロジェクトドキュメント

## 1. プロジェクト概要・目的

**InvestCalc（インベストカルク）**

投資・資産運用に関する各種計算を行うWebツール集。複利計算、つみたてNISA、iDeCo、住宅ローンなど、個人の資産形成に必要な計算を簡単に行える実用ツールサイト。

**コア価値**
- 複雑な金融計算を誰でも簡単に実行できる
- 視覚的でわかりやすい結果表示
- SEO最適化による高い検索流入
- 高単価な金融系広告による収益化

---

## 2. 機能一覧

### 🔴 優先度1（MVP・初回リリース）

**複利計算機**
- 元本・利率・期間を入力して将来価値を計算
- 月額積立での複利計算
- 計算結果のグラフ表示
- 結果の詳細説明

**基本UI/UX**
- レスポンシブデザイン
- 入力フォームのバリデーション
- 計算結果のリアルタイム更新
- 基本的なSEO設定

**分析・運用**
- Google Analytics導入
- 基本的なエラーハンドリング

### 🟡 優先度2（機能拡充）

**つみたてNISA計算機**
- 年間投資枠（120万円）を考慮した計算
- 20年間の投資シミュレーション
- 非課税効果の可視化

**iDeCo計算機**
- 職業別拠出上限額の自動判定
- 所得税・住民税の節税効果計算
- 受取時の税額計算

**住宅ローン計算機**
- 月々返済額計算
- 繰り上げ返済シミュレーション
- 借り換え効果計算

**収益化準備**
- Google AdSense申請・設置
- アフィリエイト準備
- A/Bテスト基盤

### 🟢 優先度3（最適化・拡張）

**高度な計算機能**
- ポートフォリオ分析
- リバランス計算
- 退職金運用シミュレーション
- インフレ調整計算

**コンテンツマーケティング**
- 計算ツール解説記事
- 投資・資産運用ガイド
- 最新金利情報の自動更新

**ユーザビリティ向上**
- 計算履歴保存（LocalStorage）
- 計算結果のPDF出力
- URL共有機能
- プリセット設定

---

## 3. 技術スタック

### 🌐 フロントエンド

**基盤技術**
- **フレームワーク**: React 18 + Next.js 14 (App Router)
- **言語**: TypeScript
- **デプロイ**: Vercel

**UI・スタイリング**
- **CSSフレームワーク**: Tailwind CSS
- **UIライブラリ**: shadcn/ui
- **アイコン**: Lucide React
- **チャート**: Recharts（グラフ表示用）

**状態・データ管理**
- **状態管理**: Zustand（計算履歴・設定用）
- **フォーム管理**: React Hook Form + Zod
- **データ永続化**: LocalStorage（計算履歴）

**計算・分析**
- **金融計算**: カスタム計算関数
- **数学ライブラリ**: mathjs（必要に応じて）
- **日時処理**: date-fns

### ⚙️ バックエンド（最小構成）

**静的データ管理**
- **設定ファイル**: JSON形式
- **税率データ**: 定数として管理
- **金利データ**: 手動更新（将来API化検討）

### 📊 分析・収益化

**分析ツール**
- **Google Analytics 4**: ユーザー行動分析
- **Google Search Console**: SEO分析

**収益化**
- **Google AdSense**: ディスプレイ広告
- **アフィリエイト**: 証券会社・銀行系
- **A/Bテスト**: Vercel Analytics

---

## 4. プロジェクト構成

```
investment-calculator/
├── README.md
├── .gitignore
├── docs/                          # ドキュメント
│   ├── calculations/             # 計算式説明
│   ├── seo/                      # SEO戦略
│   └── monetization/             # 収益化戦略
├── public/                       # 静的ファイル
│   ├── images/                   # 画像素材
│   ├── icons/                    # アイコン
│   └── data/                     # 静的データ
│       ├── tax-rates.json        # 税率データ
│       └── interest-rates.json   # 金利データ
└── src/                          # ソースコード
    ├── app/                      # Next.js App Router
    │   ├── layout.tsx            # ルートレイアウト
    │   ├── page.tsx              # ホーム（計算機一覧）
    │   ├── compound/             # 複利計算機
    │   │   └── page.tsx
    │   ├── nisa/                 # つみたてNISA計算機
    │   │   └── page.tsx
    │   ├── ideco/                # iDeCo計算機
    │   │   └── page.tsx
    │   ├── loan/                 # 住宅ローン計算機
    │   │   └── page.tsx
    │   └── blog/                 # SEO記事
    │       └── [slug]/
    │           └── page.tsx
    ├── components/               # Reactコンポーネント
    │   ├── ui/                   # shadcn/ui基本コンポーネント
    │   ├── layout/               # レイアウトコンポーネント
    │   │   ├── header.tsx
    │   │   ├── footer.tsx
    │   │   └── sidebar.tsx
    │   ├── calculators/          # 計算機コンポーネント
    │   │   ├── compound-calculator.tsx
    │   │   ├── nisa-calculator.tsx
    │   │   ├── ideco-calculator.tsx
    │   │   └── loan-calculator.tsx
    │   ├── charts/               # グラフコンポーネント
    │   │   ├── growth-chart.tsx
    │   │   └── breakdown-chart.tsx
    │   ├── forms/                # 入力フォーム
    │   │   ├── calculation-form.tsx
    │   │   └── input-field.tsx
    │   └── common/               # 共通コンポーネント
    │       ├── loading.tsx
    │       ├── error-boundary.tsx
    │       └── ads.tsx
    ├── lib/                      # ユーティリティ・設定
    │   ├── calculations/         # 計算ロジック
    │   │   ├── compound.ts
    │   │   ├── nisa.ts
    │   │   ├── ideco.ts
    │   │   └── loan.ts
    │   ├── utils.ts              # 汎用ユーティリティ
    │   ├── constants.ts          # 定数定義
    │   ├── validations.ts        # バリデーションスキーマ
    │   └── hooks/                # カスタムフック
    │       ├── use-calculation.ts
    │       └── use-history.ts
    ├── store/                    # Zustand状態管理
    │   ├── calculation-store.ts  # 計算履歴
    │   └── ui-store.ts          # UI状態
    ├── types/                    # TypeScript型定義
    │   ├── calculation.ts        # 計算関連型
    │   ├── chart.ts             # グラフ関連型
    │   └── common.ts            # 共通型
    └── styles/                   # スタイル
        └── globals.css
```

---

## 5. 主要計算ロジック

### 複利計算

```typescript
// 一括投資複利計算
export const calculateCompoundInterest = (
  principal: number,      // 元本
  rate: number,          // 年利率（小数）
  years: number,         // 年数
  compoundFrequency: number = 1 // 複利回数（年）
): number => {
  return principal * Math.pow(1 + rate / compoundFrequency, compoundFrequency * years);
};

// 積立投資計算
export const calculateAnnuityFutureValue = (
  monthlyPayment: number, // 月額積立額
  annualRate: number,     // 年利率
  years: number           // 積立年数
): number => {
  const monthlyRate = annualRate / 12;
  const totalMonths = years * 12;
  return monthlyPayment * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
};
```

### つみたてNISA計算

```typescript
export const calculateNISA = (
  monthlyAmount: number,  // 月額積立額
  annualReturn: number,   // 想定年利
  years: number = 20      // 積立期間（20年固定）
): NISAResult => {
  const maxAnnualAmount = 1200000; // 年間上限120万円
  const actualAnnualAmount = Math.min(monthlyAmount * 12, maxAnnualAmount);
  const actualMonthlyAmount = actualAnnualAmount / 12;
  
  const totalInvestment = actualMonthlyAmount * 12 * years;
  const futureValue = calculateAnnuityFutureValue(actualMonthlyAmount, annualReturn, years);
  const profit = futureValue - totalInvestment;
  const taxSaved = profit * 0.20315; // 課税された場合の税額
  
  return {
    totalInvestment,
    futureValue,
    profit,
    taxSaved,
    actualMonthlyAmount
  };
};
```

### iDeCo計算

```typescript
export const calculateIdeco = (
  monthlyAmount: number,
  annualReturn: number,
  years: number,
  occupation: 'employee' | 'public' | 'self_employed' | 'housewife',
  annualIncome: number
): IdecoResult => {
  const contributionLimits = {
    employee: 23000,      // 企業年金なし会社員
    public: 12000,        // 公務員
    self_employed: 68000, // 自営業
    housewife: 23000      // 専業主婦
  };
  
  const maxMonthly = contributionLimits[occupation];
  const actualMonthly = Math.min(monthlyAmount, maxMonthly);
  
  // 運用益計算
  const futureValue = calculateAnnuityFutureValue(actualMonthly, annualReturn, years);
  const totalInvestment = actualMonthly * 12 * years;
  const profit = futureValue - totalInvestment;
  
  // 所得控除による節税効果
  const annualContribution = actualMonthly * 12;
  const taxRate = calculateTaxRate(annualIncome);
  const annualTaxSavings = annualContribution * taxRate;
  const totalTaxSavings = annualTaxSavings * years;
  
  return {
    totalInvestment,
    futureValue,
    profit,
    totalTaxSavings,
    actualMonthly
  };
};
```

---

## 6. SEO・コンテンツ戦略

### ターゲットキーワード

**メインキーワード**
- 複利計算
- つみたてNISA 計算
- iDeCo 計算機
- 住宅ローン 計算
- 投資 シミュレーション

**ロングテールキーワード**
- 複利計算 20年 積立
- つみたてNISA 月3万円 20年
- iDeCo 節税効果 計算機
- 住宅ローン 繰り上げ返済 効果

### コンテンツプラン

**計算ツール解説記事**
- 「複利の力を理解する」
- 「つみたてNISAで老後資金を作る方法」
- 「iDeCoの節税効果を最大化する」
- 「住宅ローンの賢い返済戦略」

**比較・ランキング記事**
- 「ネット証券会社比較」
- 「つみたてNISA おすすめ銘柄」
- 「住宅ローン金利比較」

---

## 7. 収益化戦略

### 広告配置

**Google AdSense**
- ヘッダー下: レクタングル広告
- 計算結果下: レスポンシブ広告
- サイドバー: スカイスクレイパー広告
- 記事内: インフィード広告

**アフィリエイト**
- 証券会社の口座開設
- 銀行の住宅ローン
- 保険の見直し相談
- FP相談サービス

### 収益予想

**月間PV別収益予想**
- 1万PV: 5,000-15,000円
- 5万PV: 25,000-75,000円  
- 10万PV: 50,000-150,000円
- 20万PV: 100,000-300,000円

※金融系は広告単価が高いため、一般的なサイトの2-3倍の収益が期待できる

---

## 8. 開発スケジュール

### Phase 1: MVP開発（3-4週間）
- **Week 1**: 環境構築、基本レイアウト、複利計算機
- **Week 2**: UI/UX改善、グラフ表示、バリデーション
- **Week 3**: SEO最適化、Google Analytics導入
- **Week 4**: テスト、デプロイ、初期コンテンツ作成

### Phase 2: 機能拡充（4-5週間）
- **Week 5-6**: つみたてNISA・iDeCo計算機開発
- **Week 7**: 住宅ローン計算機開発
- **Week 8-9**: AdSense申請・設置、アフィリエイト準備

### Phase 3: 最適化（2-3週間）
- **Week 10-11**: A/Bテスト、SEO記事作成
- **Week 12**: パフォーマンス最適化、追加機能

---

## 9. 成功指標（KPI）

### トラフィック指標
- **月間PV**: 3ヶ月後に1万PV、6ヶ月後に5万PV
- **オーガニック流入**: 全流入の80%以上
- **直帰率**: 60%以下
- **滞在時間**: 平均3分以上

### 収益指標
- **AdSense収益**: 3ヶ月後に月1万円、6ヶ月後に月5万円
- **アフィリエイト収益**: 6ヶ月後に月2万円
- **RPM（1000PV当たり収益）**: 1000円以上

### 利用者指標
- **計算機利用率**: 訪問者の70%以上が計算機を利用
- **複数ツール利用率**: 30%以上
- **リピート率**: 20%以上

このドキュメントを基に、段階的に開発を進めていきます。まずはPhase 1のMVP開発から始めることをお勧めします。