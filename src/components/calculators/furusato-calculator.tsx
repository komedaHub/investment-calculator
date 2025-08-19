'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FurusatoForm } from '@/components/forms/furusato-form';
import { ErrorBoundary } from '@/components/common/error-boundary';
import { ErrorMessage } from '@/components/common/error-message';
import { LoadingOverlay } from '@/components/common/loading';
import { 
  calculateFurusato, 
  formatCurrency, 
  formatPercentage 
} from '@/lib/calculations/furusato';
import { FurusatoCalculationFormData } from '@/lib/validations';
import { FurusatoCalculationResult } from '@/types/furusato';
import { useErrorHandler } from '@/lib/hooks/use-error-handler';
import { getErrorMessage, logError } from '@/lib/utils/error-utils';
import { 
  Receipt, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle,
  Heart,
  Shield
} from 'lucide-react';

export function FurusatoCalculator() {
  const [result, setResult] = useState<FurusatoCalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const { error, isError, clearError, handleError } = useErrorHandler();

  const handleCalculate = async (data: FurusatoCalculationFormData) => {
    try {
      setIsCalculating(true);
      clearError();
      
      console.log('Calculator received data:', data);
      console.log('Annual income in calculator:', data.annualIncome);
      
      // 計算処理をシミュレート
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const calculationResult = calculateFurusato(data);
      console.log('Calculation completed, result:', calculationResult);
      setResult(calculationResult);
    } catch (error) {
      logError(error, "FurusatoCalculator.handleCalculate");
      handleError(error);
      setResult(null);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-4 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">ふるさと納税 控除上限額シミュレーター</h1>
          <p className="text-muted-foreground">
            年収や家族構成から、ふるさと納税の控除上限額を自動計算します
          </p>
        </div>

        {/* 重要な注意事項 */}
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <AlertTriangle className="h-5 w-5" />
              重要な注意事項
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-orange-600 space-y-2">
            <p>• 本計算結果は概算値であり、実際の控除額を保証するものではありません。</p>
            <p>• 最新の税制や詳細な計算については、税務署や税理士にご相談ください。</p>
            <p>• ふるさと納税の控除を受けるには、確定申告またはワンストップ特例制度の申請が必要です。</p>
            <p>• 年収や控除額に変動がある場合は、再計算をお勧めします。</p>
          </CardContent>
        </Card>

        {isError && (
          <ErrorMessage
            type="error"
            title="計算エラー"
            message={getErrorMessage(error)}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <LoadingOverlay isLoading={isCalculating} message="計算中...">
              <FurusatoForm onCalculate={handleCalculate} isCalculating={isCalculating} />
            </LoadingOverlay>
          </div>

          {result && (
            <div className="space-y-6">
              {/* メイン結果 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="h-5 w-5" />
                    計算結果
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 警告メッセージ */}
                  {result.warnings && result.warnings.length > 0 && (
                    <div className="space-y-2" data-testid="warnings">
                      {result.warnings.map((warning, index) => (
                        <ErrorMessage
                          key={index}
                          type="warning"
                          message={warning}
                          showIcon={false}
                          className="text-xs"
                        />
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4">
                    {/* 控除上限額 */}
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <div>
                        <span className="text-sm text-blue-600 font-medium">控除上限額</span>
                        <p className="text-xs text-blue-500 mt-1">実質自己負担2,000円で済む上限</p>
                      </div>
                      <span className="text-2xl font-bold text-blue-600" data-testid="deduction-limit">
                        {formatCurrency(result.deductionLimit)}
                      </span>
                    </div>
                    
                    {/* おすすめ寄附金額 */}
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <div>
                        <span className="text-sm text-green-600 font-medium">おすすめ寄附金額</span>
                        <p className="text-xs text-green-500 mt-1">安全な寄附金額（上限の90%）</p>
                      </div>
                      <span className="text-2xl font-bold text-green-600" data-testid="recommended-donation">
                        {formatCurrency(result.recommendedDonation)}
                      </span>
                    </div>
                    
                    {/* 実質自己負担額 */}
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">実質自己負担額</span>
                      <span className="text-lg font-semibold text-orange-600">
                        {formatCurrency(result.selfBurden)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 節税効果の詳細 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5" />
                    節税効果の詳細
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">所得税還付額</span>
                      <span className="text-lg font-semibold text-green-600">
                        {formatCurrency(result.incomeTaxReduction)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">住民税軽減額</span>
                      <span className="text-lg font-semibold text-green-600">
                        {formatCurrency(result.residentTaxReduction)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-medium text-green-700">合計節税額</span>
                      <span className="text-xl font-bold text-green-600">
                        {formatCurrency(result.totalTaxReduction)}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• 所得税率: {formatPercentage(result.incomeTaxRate)}</p>
                    <p>• 住民税率: {formatPercentage(result.residentTaxRate)}</p>
                    <p>• 課税所得: {formatCurrency(result.taxableIncome)}</p>
                  </div>
                </CardContent>
              </Card>

              {/* 住宅ローン控除の競合警告 */}
              {result.hasHousingLoanConflict && (
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-yellow-700">
                      <AlertTriangle className="h-5 w-5" />
                      住宅ローン控除との競合について
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-yellow-600">
                      住宅ローン控除により、ふるさと納税の控除上限額が減額されています。
                      住宅ローン控除を優先的に適用した後の金額で計算されています。
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* 活用のヒント */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    活用のヒント
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Heart className="h-4 w-4 text-red-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium">返礼品を楽しもう</p>
                      <p className="text-xs text-muted-foreground">
                        地域の特産品や体験型返礼品など、多彩な返礼品から選択できます
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Shield className="h-4 w-4 text-blue-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium">ワンストップ特例制度</p>
                      <p className="text-xs text-muted-foreground">
                        寄附先が5自治体以下なら確定申告不要で控除を受けられます
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <TrendingDown className="h-4 w-4 text-green-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium">年末までの計画的な寄附</p>
                      <p className="text-xs text-muted-foreground">
                        12月31日までに寄附を完了させ、翌年の税務申告で控除を受けましょう
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

      </div>
    </ErrorBoundary>
  );
}