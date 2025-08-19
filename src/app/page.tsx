import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, PiggyBank } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-bold tracking-tight">投資かんたん計算</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          投資・資産運用に関する計算を簡単に行える実用ツール集
        </p>
        <p className="text-muted-foreground">
          複利計算、つみたてNISA、iDeCo、住宅ローンなど、個人の資産形成に必要な計算をサポートします
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Calculator className="w-6 h-6 text-primary" />
              <CardTitle>複利計算機</CardTitle>
            </div>
            <CardDescription>
              複利の力を活用した投資シミュレーション。元本と月額積立で将来価値を計算します。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/compound">
              <Button variant="outline" className="w-full">
                <TrendingUp className="w-4 h-4 mr-2" />
                計算を開始
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="opacity-50">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <PiggyBank className="w-6 h-6 text-muted-foreground" />
              <CardTitle>つみたてNISA計算機</CardTitle>
            </div>
            <CardDescription>
              年間120万円の投資枠を活用した20年間の資産形成シミュレーション。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" disabled>
              準備中
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Calculator className="w-6 h-6 text-primary" />
              <CardTitle>ふるさと納税 控除上限額シミュレーター</CardTitle>
            </div>
            <CardDescription>
              年収や家族構成から、ふるさと納税の控除上限額を自動計算。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/furusato">
              <Button variant="outline" className="w-full">
                <Calculator className="w-4 h-4 mr-2" />
                計算を開始
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted/50 rounded-lg p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">なぜ投資計算が重要なのか？</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div>
            <h3 className="font-semibold mb-2">複利の効果を理解</h3>
            <p className="text-sm text-muted-foreground">
              時間を味方にした資産形成の威力を数字で実感できます。
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">目標設定の明確化</h3>
            <p className="text-sm text-muted-foreground">
              老後資金や教育費など、具体的な目標額に向けた計画を立てられます。
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">リスクとリターンの把握</h3>
            <p className="text-sm text-muted-foreground">
              異なる利回りでのシミュレーションで、投資戦略を比較検討できます。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
