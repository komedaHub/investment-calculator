# 投資計算機 (Investment Calculator)

Next.js + TypeScript で構築された複利計算機アプリケーションです。

## 特徴

- 複利計算機能
- 月次積立投資対応
- インタラクティブなチャート表示
- 年次推移データテーブル

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **UI**: Tailwind CSS + shadcn/ui
- **フォーム**: React Hook Form + Zod
- **チャート**: Recharts
- **状態管理**: Zustand
- **コンポーネント管理**: Storybook

## 環境構築

### 必要な環境

- Node.js 18以上
- npm または yarn または pnpm

### セットアップ手順

1. **リポジトリのクローン**
   ```bash
   git clone <repository-url>
   cd investment-calculator
   ```

2. **依存関係のインストール**
   ```bash
   npm install
   # または
   yarn install
   # または
   pnpm install
   ```

## 起動方法

### 開発サーバーの起動

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) にアクセスしてアプリケーションを確認できます。

### Storybookの起動

```bash
npm run storybook
# または
yarn storybook
# または
pnpm storybook
```

ブラウザで [http://localhost:6006](http://localhost:6006) にアクセスしてStorybookを確認できます。

## ビルド

### プロダクション用ビルド

```bash
npm run build
npm run start
```

### Storybookのビルド

```bash
npm run build-storybook
```

## 使用方法

1. **初期投資額**を入力
2. **年利率**をパーセントで入力（例：5% → 5と入力）
3. **投資期間**を年数で入力
4. **月次積立額**を入力（オプション）
5. 「計算する」ボタンをクリック
6. チャートとデータテーブルで結果を確認

## プロジェクト構造

```
src/
├── app/                 # Next.js App Router
├── components/          # Reactコンポーネント
│   ├── charts/         # チャート関連
│   ├── forms/          # フォーム関連
│   └── ui/             # UIコンポーネント
├── lib/                # ユーティリティとロジック
│   └── calculations/   # 計算ロジック
├── types/              # TypeScript型定義
└── stories/            # Storybookサンプル
```

## 開発

ファイルを編集すると、開発サーバーが自動的に変更を反映します。

- `src/app/page.tsx` - メインページ
- `src/components/` - コンポーネント
- `src/lib/calculations/` - 計算ロジック

## Lint

```bash
npm run lint
```

## ライセンス

MIT License