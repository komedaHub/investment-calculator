'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CompoundForm } from '@/components/forms/compound-form';
import { GrowthChart, ChartConfig } from '@/components/charts/growth-chart';
import { DataTable, DataTableConfig } from '@/components/charts/data-table';
import { 
  calculateCompound, 
  getChartData, 
  formatCurrency, 
  formatNumber 
} from '@/lib/calculations/compound';
import { CompoundCalculationFormData } from '@/lib/validations';
import { CompoundCalculationResult, ChartDataPoint } from '@/types/calculation';
import React from 'react';

export function CompoundCalculator() {
  const [result, setResult] = useState<CompoundCalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = async (data: CompoundCalculationFormData) => {
    setIsCalculating(true);
    
    // 計算処理をシミュレート（実際には即座に完了）
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const calculationResult = calculateCompound({
      principal: data.principal,
      annualRate: data.annualRate,
      years: data.years,
      monthlyContribution: data.monthlyContribution || 0,
    });
    
    setResult(calculationResult);
    setIsCalculating(false);
  };

  const chartData = result ? getChartData(result) : [];

  // GrowthChart用の設定
  const formatYAxisTick = (value: number) => {
    if (value >= 100000000) {
      return `${Math.round(value / 100000000)}億円`;
    } else if (value >= 10000) {
      return `${Math.round(value / 10000)}万円`;
    }
    return formatCurrency(value);
  };

  const chartConfig: ChartConfig = {
    xAxisKey: 'year',
    xAxisLabel: '年',
    yAxisFormatter: formatYAxisTick,
    tooltipFormatter: (value: number, name: string): [string, string] => {
      const labels = {
        investment: '投資元本',
        interest: '運用益',
        total: '合計',
      };
      return [formatCurrency(value), labels[name as keyof typeof labels] || name];
    },
    tooltipLabelFormatter: (label: string | number) => `${label}年目`,
    height: 400, // 高さを少し増やして凡例用のスペースを確保
    margin: { top: 20, right: 30, left: 60, bottom: 80 }, // 左右と下部のマージンを調整
    areas: [
      {
        dataKey: 'investment',
        name: '投資元本',
        color: '#16a34a',
        stackId: '1',
        fillOpacity: 0.6,
      },
      {
        dataKey: 'interest',
        name: '運用益',
        color: '#22c55e',
        stackId: '1',
        fillOpacity: 0.8,
      },
    ],
  };

  // DataTable用の設定
  const tableConfig: DataTableConfig<ChartDataPoint> = {
    columns: [
      {
        key: 'year',
        header: '年数',
        render: (value: number) => `${value}年目`,
      },
      {
        key: 'investment',
        header: '投資元本',
        align: 'right',
        render: (value: number) => formatCurrency(value),
      },
      {
        key: 'interest',
        header: '運用益',
        align: 'right',
        render: (value: number) => 
          React.createElement('span', {
            className: value >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'
          }, formatCurrency(value)),
      },
      {
        key: 'total',
        header: '合計金額',
        align: 'right',
        render: (value: number) => 
          React.createElement('span', {
            className: value >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'
          }, formatCurrency(value)),
      },
      {
        key: 'profitRate' as keyof ChartDataPoint, // 仮想カラムとして利益率を表示
        header: '利益率',
        align: 'right',
        render: (value: number, row: ChartDataPoint) => {
          const profitRate = row.investment > 0 ? (row.interest / row.investment) * 100 : 0;
          return React.createElement('span', {
            className: profitRate > 0 ? 'text-green-600' : profitRate < 0 ? 'text-red-600' : 'text-gray-500'
          }, `${formatNumber(profitRate)}%`);
        },
      },
    ],
    showSummary: true,
    summary: result ? [
      {
        label: '最終投資元本',
        value: formatCurrency(result.totalInvestment),
      },
      {
        label: '最終運用益',
        value: React.createElement('span', {
          className: result.totalInterest >= 0 ? 'text-green-600' : 'text-red-600'
        }, formatCurrency(result.totalInterest)),
      },
      {
        label: '最終合計金額',
        value: React.createElement('span', {
          className: result.futureValue >= 0 ? 'text-green-600' : 'text-red-600'
        }, formatCurrency(result.futureValue)),
      },
      {
        label: '最終利益率',
        value: formatNumber((result.totalInterest / result.totalInvestment) * 100) + '%',
      },
    ] : [],
    striped: true,
    hoverable: true,
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">複利計算機</h1>
        <p className="text-muted-foreground">
          複利の力を活用した資産運用をシミュレーションします
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <CompoundForm onCalculate={handleCalculate} isCalculating={isCalculating} />
        </div>

        {result && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>計算結果</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">最終運用額</span>
                    <span className="text-xl font-bold text-green-600">
                      {formatCurrency(result.futureValue)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">投資元本</span>
                    <span className="text-lg">
                      {formatCurrency(result.totalInvestment)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">運用益</span>
                    <span className={`text-lg ${result.totalInterest >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(result.totalInterest)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">運用益率</span>
                    <span className={`text-lg ${result.totalInterest >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatNumber((result.totalInterest / result.totalInvestment) * 100)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {result && chartData.length > 0 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>資産推移グラフ</CardTitle>
            </CardHeader>
            <CardContent>
              <GrowthChart 
                data={chartData} 
                config={chartConfig}
                title="資産推移チャート" 
              />
            </CardContent>
          </Card>
          
          <DataTable 
            data={chartData} 
            config={tableConfig}
            title="年次データ詳細"
          />
        </div>
      )}
    </div>
  );
}