'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { compoundCalculationSchema, CompoundCalculationFormData } from '@/lib/validations';

interface CompoundFormProps {
  onCalculate: (data: CompoundCalculationFormData) => void;
  isCalculating?: boolean;
}

export function CompoundForm({ onCalculate, isCalculating = false }: CompoundFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompoundCalculationFormData>({
    resolver: zodResolver(compoundCalculationSchema),
    defaultValues: {
      principal: 1000000,
      annualRate: 3,
      years: 20,
      monthlyContribution: 50000,
    },
    mode: 'onChange',
  });

  const onSubmit = (data: CompoundCalculationFormData) => {
    // パーセント値を小数点に変換
    const processedData = {
      ...data,
      annualRate: data.annualRate / 100,
    };
    onCalculate(processedData);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>複利計算設定</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="principal">初期投資額（円）</Label>
            <Input
              id="principal"
              type="number"
              step="10000"
              {...register('principal', { valueAsNumber: true })}
              className={errors.principal ? 'border-red-500' : ''}
            />
            {errors.principal && (
              <p className="text-sm text-red-500">{errors.principal.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyContribution">月額投資額（円）</Label>
            <Input
              id="monthlyContribution"
              type="number"
              step="1000"
              {...register('monthlyContribution', { valueAsNumber: true })}
              className={errors.monthlyContribution ? 'border-red-500' : ''}
            />
            {errors.monthlyContribution && (
              <p className="text-sm text-red-500">{errors.monthlyContribution.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="annualRate">年利率（%）</Label>
            <Input
              id="annualRate"
              type="number"
              step="0.1"
              min="0"
              max="30"
              {...register('annualRate', { valueAsNumber: true })}
              className={errors.annualRate ? 'border-red-500' : ''}
            />
            {errors.annualRate && (
              <p className="text-sm text-red-500">{errors.annualRate.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="years">投資期間（年）</Label>
            <Input
              id="years"
              type="number"
              min="1"
              max="50"
              {...register('years', { valueAsNumber: true })}
              className={errors.years ? 'border-red-500' : ''}
            />
            {errors.years && (
              <p className="text-sm text-red-500">{errors.years.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isCalculating}>
            {isCalculating ? '計算中...' : '計算する'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}