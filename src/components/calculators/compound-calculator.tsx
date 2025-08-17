'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CompoundForm } from '@/components/forms/compound-form';
import { GrowthChart } from '@/components/charts/growth-chart';
import { DataTable } from '@/components/charts/data-table';
import { 
  calculateCompound, 
  getChartData, 
  formatCurrency, 
  formatNumber 
} from '@/lib/calculations/compound';
import { CompoundCalculationFormData } from '@/lib/validations';
import { CompoundCalculationResult } from '@/types/calculation';

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
              <GrowthChart data={chartData} />
            </CardContent>
          </Card>
          
          <DataTable data={chartData} />
        </div>
      )}
    </div>
  );
}