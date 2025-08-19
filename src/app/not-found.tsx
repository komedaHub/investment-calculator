import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Home, Calculator } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-600">
            <Search className="h-6 w-6" />
            ページが見つかりません
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
            <p className="text-muted-foreground">
              お探しのページは存在しないか、移動された可能性があります。
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-sm">利用可能な計算機:</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• 複利計算機</li>
              <li>• つみたてNISA計算機（準備中）</li>
              <li>• iDeCo計算機（準備中）</li>
              <li>• 住宅ローン計算機（準備中）</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button asChild className="flex-1">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                ホームに戻る
              </Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link href="/compound">
                <Calculator className="mr-2 h-4 w-4" />
                複利計算機
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}