export interface CompoundCalculationInput {
  principal: number;
  annualRate: number;
  years: number;
  monthlyContribution?: number;
  compoundFrequency?: number;
}

export interface CompoundCalculationResult {
  futureValue: number;
  totalInvestment: number;
  totalInterest: number;
  monthlyBreakdown: MonthlyBreakdown[];
}

export interface MonthlyBreakdown {
  month: number;
  investment: number;
  interest: number;
  total: number;
}

export interface ChartDataPoint {
  year: number;
  investment: number;
  interest: number;
  total: number;
}