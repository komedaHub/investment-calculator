'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NumberInput } from '@/components/ui/number-input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { furusatoCalculationSchema, FurusatoCalculationFormData } from '@/lib/validations';
import { Calculator, HelpCircle, Home, Users } from 'lucide-react';

interface FurusatoFormProps {
  onCalculate: (data: FurusatoCalculationFormData) => void;
  isCalculating?: boolean;
}

export function FurusatoForm({ onCalculate, isCalculating = false }: FurusatoFormProps) {
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const form = useForm<FurusatoCalculationFormData>({
    resolver: zodResolver(furusatoCalculationSchema),
    defaultValues: {
      annualIncome: 5000000,
      incomeType: 'salary',
      familyType: 'single',
      dependents: 0,
      socialInsurancePremium: 750000,
      lifeInsurancePremium: 0,
      earthquakeInsurancePremium: 0,
      housingLoanDeduction: 0,
      medicalExpenseDeduction: 0,
      smallBusinessMutualAidPremium: 0,
    },
  });

  const handleSubmit = (data: FurusatoCalculationFormData) => {
    // デバッグ用ログ
    console.log('Form submission data:', data);
    console.log('Annual income before calculation:', data.annualIncome);
    
    // フォームの状態を保持するため、送信後にリセットしない
    onCalculate(data);
  };

  // フォーマット用のヘルパー関数
  const formatNumber = (value: string) => {
    const num = value.replace(/[^\d]/g, '');
    return parseInt(num) || 0;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          ふるさと納税控除上限額シミュレーター
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          年収や家族構成から、ふるさと納税の控除上限額を自動計算します
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            
            {/* 基本情報セクション */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <Home className="h-4 w-4" />
                <h3 className="font-semibold">基本情報</h3>
              </div>

              {/* 年収 */}
              <FormField
                control={form.control}
                name="annualIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>年収（万円）</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="500"
                        step="10"
                        min="0"
                        max="10000"
                        name={field.name}
                        ref={field.ref}
                        disabled={field.disabled}
                        onChange={(e) => {
                          const numValue = parseFloat(e.target.value) || 0;
                          console.log('Annual income input value:', numValue);
                          field.onChange(numValue * 10000);
                        }}
                        value={(() => {
                          const displayValue = field.value ? Math.round(field.value / 10000) : '';
                          console.log('Display value calculation:', {
                            fieldValue: field.value,
                            divided: field.value ? field.value / 10000 : null,
                            rounded: field.value ? Math.round(field.value / 10000) : null,
                            final: displayValue
                          });
                          return displayValue;
                        })()}
                      />
                    </FormControl>
                    <FormDescription>
                      源泉徴収票の「支払金額」または確定申告書の総収入金額を入力（10万円単位で調整可能）
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 所得の種類 */}
              <FormField
                control={form.control}
                name="incomeType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>所得の種類</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="salary" id="salary" />
                          <Label htmlFor="salary">給与所得（会社員・公務員）</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="business" id="business" />
                          <Label htmlFor="business">事業所得（個人事業主・フリーランス）</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 社会保険料控除額 */}
              <FormField
                control={form.control}
                name="socialInsurancePremium"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>社会保険料控除額（万円）</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="75"
                        {...field}
                        onChange={(e) => field.onChange(formatNumber(e.target.value) * 10000)}
                        value={field.value ? Math.round(field.value / 10000) : ''}
                      />
                    </FormControl>
                    <FormDescription>
                      健康保険料、厚生年金保険料、雇用保険料等の合計額
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* 家族構成セクション */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <Users className="h-4 w-4" />
                <h3 className="font-semibold">家族構成</h3>
              </div>

              {/* 家族構成 */}
              <FormField
                control={form.control}
                name="familyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>配偶者の状況</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="配偶者の状況を選択" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="single">独身</SelectItem>
                        <SelectItem value="married_no_income">配偶者あり（年収103万円以下）</SelectItem>
                        <SelectItem value="married_with_income">配偶者あり（年収103万円超201万円以下）</SelectItem>
                        <SelectItem value="married_high_income">配偶者あり（年収201万円超）</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 扶養親族数 */}
              <FormField
                control={form.control}
                name="dependents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>扶養親族数（人）</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="20"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>
                      16歳以上の子供や親等の扶養親族の人数
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* 詳細オプションの切り替え */}
            <div className="flex items-center space-x-2">
              <Switch
                id="advanced-options"
                checked={showAdvancedOptions}
                onCheckedChange={setShowAdvancedOptions}
              />
              <Label htmlFor="advanced-options">詳細な控除項目を入力する</Label>
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
            </div>

            {/* 詳細オプション */}
            {showAdvancedOptions && (
              <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold text-sm">その他の控除項目</h3>

                {/* 生命保険料控除 */}
                <FormField
                  control={form.control}
                  name="lifeInsurancePremium"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>生命保険料控除（万円）</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(formatNumber(e.target.value) * 10000)}
                          value={field.value ? Math.round(field.value / 10000) : ''}
                        />
                      </FormControl>
                      <FormDescription>年間支払保険料から計算される控除額</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 地震保険料控除 */}
                <FormField
                  control={form.control}
                  name="earthquakeInsurancePremium"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>地震保険料控除（万円）</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(formatNumber(e.target.value) * 10000)}
                          value={field.value ? Math.round(field.value / 10000) : ''}
                        />
                      </FormControl>
                      <FormDescription>年間支払地震保険料（上限5万円）</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 住宅ローン控除 */}
                <FormField
                  control={form.control}
                  name="housingLoanDeduction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>住宅ローン控除（万円）</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(formatNumber(e.target.value) * 10000)}
                          value={field.value ? Math.round(field.value / 10000) : ''}
                        />
                      </FormControl>
                      <FormDescription>住宅ローン控除額（税額控除）</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 医療費控除 */}
                <FormField
                  control={form.control}
                  name="medicalExpenseDeduction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>医療費控除（万円）</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(formatNumber(e.target.value) * 10000)}
                          value={field.value ? Math.round(field.value / 10000) : ''}
                        />
                      </FormControl>
                      <FormDescription>年間医療費から10万円を引いた金額</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 小規模企業共済等掛金控除 */}
                <FormField
                  control={form.control}
                  name="smallBusinessMutualAidPremium"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>小規模企業共済等掛金控除（万円）</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(formatNumber(e.target.value) * 10000)}
                          value={field.value ? Math.round(field.value / 10000) : ''}
                        />
                      </FormControl>
                      <FormDescription>iDeCo、小規模企業共済の掛金等</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <Button 
              type="button" 
              className="w-full" 
              disabled={isCalculating}
              onClick={() => {
                const currentValues = form.getValues();
                console.log('Current form values:', currentValues);
                handleSubmit(currentValues);
              }}
            >
              {isCalculating ? '計算中...' : '控除上限額を計算する'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}