'use client';

import { ChartDataPoint } from '@/types/calculation';
import { formatCurrency, formatNumber } from '@/lib/calculations/compound';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DataTableProps {
  data: ChartDataPoint[];
}

export function DataTable({ data }: DataTableProps) {
  if (data.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>年次データ詳細</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 font-medium">年数</th>
                <th className="text-right p-2 font-medium">投資元本</th>
                <th className="text-right p-2 font-medium">運用益</th>
                <th className="text-right p-2 font-medium">合計金額</th>
                <th className="text-right p-2 font-medium">利益率</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => {
                const profitRate = row.investment > 0 ? (row.interest / row.investment) * 100 : 0;
                
                return (
                  <tr 
                    key={row.year} 
                    className={`border-b hover:bg-muted/50 ${
                      index % 2 === 0 ? 'bg-muted/20' : ''
                    }`}
                  >
                    <td className="p-2 font-medium">{row.year}年目</td>
                    <td className="p-2 text-right">{formatCurrency(row.investment)}</td>
                    <td className="p-2 text-right font-medium">
                      <span className={row.interest >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {formatCurrency(row.interest)}
                      </span>
                    </td>
                    <td className="p-2 text-right font-semibold">
                      <span className={row.total >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {formatCurrency(row.total)}
                      </span>
                    </td>
                    <td className="p-2 text-right">
                      <span className={profitRate > 0 ? 'text-green-600' : profitRate < 0 ? 'text-red-600' : 'text-gray-500'}>
                        {formatNumber(profitRate)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 p-4 bg-muted/30 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">最終投資元本</div>
              <div className="font-semibold">
                {formatCurrency(data[data.length - 1]?.investment || 0)}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">最終運用益</div>
              <div className="font-semibold">
                <span className={(data[data.length - 1]?.interest || 0) >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {formatCurrency(data[data.length - 1]?.interest || 0)}
                </span>
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">最終合計金額</div>
              <div className="font-semibold">
                <span className={(data[data.length - 1]?.total || 0) >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {formatCurrency(data[data.length - 1]?.total || 0)}
                </span>
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">最終利益率</div>
              <div className="font-semibold">
                {formatNumber(
                  data[data.length - 1]?.investment > 0 
                    ? ((data[data.length - 1]?.interest || 0) / (data[data.length - 1]?.investment || 1)) * 100
                    : 0
                )}%
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}