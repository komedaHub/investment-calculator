import Link from "next/link"
import { InvestmentIcon } from "@/components/ui/investment-icon"

const calculatorLinks = [
  { title: "複利計算機", href: "/compound", available: true },
  { title: "つみたてNISA計算機", href: "/nisa", available: false },
  { title: "iDeCo計算機", href: "/ideco", available: false },
  { title: "住宅ローン計算機", href: "/loan", available: false },
]

const aboutLinks = [
  { title: "サイトについて", href: "/about", available: false },
  { title: "よくある質問", href: "/faq", available: false },
  { title: "お問い合わせ", href: "/contact", available: false },
]

const legalLinks = [
  { title: "利用規約", href: "/terms", available: false },
  { title: "プライバシーポリシー", href: "/privacy", available: false },
  { title: "免責事項", href: "/disclaimer", available: false },
]

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* ブランド情報 */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <InvestmentIcon size={32} />
              <span className="font-bold text-lg">投資かんたん計算</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              投資・資産運用に関する計算を簡単に行える実用ツール集。
              将来の資産形成をシミュレーションして賢い投資計画を立てましょう。
            </p>
            <div className="text-xs text-muted-foreground">
              <p>© 2024 投資かんたん計算</p>
              <p className="mt-1">
                本サイトの計算結果は参考値であり、投資の成果を保証するものではありません。
              </p>
            </div>
          </div>

          {/* 計算機リンク */}
          <div>
            <h3 className="font-semibold text-sm mb-4">計算機</h3>
            <ul className="space-y-2 text-sm">
              {calculatorLinks.map((link) => (
                <li key={link.title}>
                  {link.available ? (
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.title}
                    </Link>
                  ) : (
                    <span className="text-muted-foreground/50 cursor-not-allowed">
                      {link.title} (準備中)
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* サイト情報 */}
          <div>
            <h3 className="font-semibold text-sm mb-4">サイト情報</h3>
            <ul className="space-y-2 text-sm">
              {aboutLinks.map((link) => (
                <li key={link.title}>
                  {link.available ? (
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.title}
                    </Link>
                  ) : (
                    <span className="text-muted-foreground/50 cursor-not-allowed">
                      {link.title} (準備中)
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* 法的情報 */}
          <div>
            <h3 className="font-semibold text-sm mb-4">法的情報</h3>
            <ul className="space-y-2 text-sm">
              {legalLinks.map((link) => (
                <li key={link.title}>
                  {link.available ? (
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.title}
                    </Link>
                  ) : (
                    <span className="text-muted-foreground/50 cursor-not-allowed">
                      {link.title} (準備中)
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 重要な注意事項 */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-semibold text-sm mb-2 text-orange-600">
              ⚠️ 重要な注意事項
            </h4>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>
                • 本サイトで提供する計算結果は概算値であり、実際の投資成果を保証するものではありません。
              </p>
              <p>
                • 投資にはリスクが伴います。投資判断は必ずご自身の責任で行ってください。
              </p>
              <p>
                • 税制や金融商品の詳細については、最新の情報を金融機関や専門家にご確認ください。
              </p>
              <p>
                • 計算結果の正確性について最善を尽くしていますが、計算ミスや情報の古さによる誤差が生じる可能性があります。
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}