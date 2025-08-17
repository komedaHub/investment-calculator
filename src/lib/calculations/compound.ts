import { 
  CompoundCalculationInput, 
  CompoundCalculationResult, 
  MonthlyBreakdown,
  ChartDataPoint 
} from '@/types/calculation';

export const calculateCompoundInterest = (
  principal: number,
  rate: number,
  years: number,
  compoundFrequency: number = 1
): number => {
  return principal * Math.pow(1 + rate / compoundFrequency, compoundFrequency * years);
};

export const calculateAnnuityFutureValue = (
  monthlyPayment: number,
  annualRate: number,
  years: number
): number => {
  if (annualRate === 0) {
    return monthlyPayment * 12 * years;
  }
  
  const monthlyRate = annualRate / 12;
  const totalMonths = years * 12;
  
  return monthlyPayment * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
};

export const calculateCompound = (input: CompoundCalculationInput): CompoundCalculationResult => {
  const { principal, annualRate, years, monthlyContribution = 0, compoundFrequency = 12 } = input;
  
  let currentValue = principal;
  let totalInvestment = principal;
  const monthlyBreakdown: MonthlyBreakdown[] = [];
  
  const monthlyRate = annualRate / 12;
  
  for (let month = 1; month <= years * 12; month++) {
    currentValue = currentValue * (1 + monthlyRate) + monthlyContribution;
    totalInvestment += monthlyContribution;
    
    const totalInterest = currentValue - totalInvestment;
    
    monthlyBreakdown.push({
      month,
      investment: totalInvestment,
      interest: totalInterest,
      total: currentValue,
    });
  }
  
  const finalResult = monthlyBreakdown[monthlyBreakdown.length - 1] || {
    investment: totalInvestment,
    interest: 0,
    total: totalInvestment,
  };
  
  return {
    futureValue: finalResult.total,
    totalInvestment: finalResult.investment,
    totalInterest: finalResult.interest,
    monthlyBreakdown,
  };
};

export const getChartData = (result: CompoundCalculationResult): ChartDataPoint[] => {
  const chartData: ChartDataPoint[] = [];
  
  for (let year = 1; year <= result.monthlyBreakdown.length / 12; year++) {
    const monthIndex = year * 12 - 1;
    const monthData = result.monthlyBreakdown[monthIndex];
    
    if (monthData) {
      chartData.push({
        year,
        investment: Math.round(monthData.investment),
        interest: Math.round(monthData.interest),
        total: Math.round(monthData.total),
      });
    }
  }
  
  return chartData;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('ja-JP').format(Math.round(num));
};