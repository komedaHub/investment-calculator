'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { ChartDataPoint } from '@/types/calculation';
import { formatCurrency } from '@/lib/calculations/compound';

interface GrowthChartProps {
  data: ChartDataPoint[];
}

export function GrowthChart({ data }: GrowthChartProps) {
  const formatTooltip = (value: number, name: string) => {
    const labels = {
      investment: '投資元本',
      interest: '運用益',
      total: '合計',
    };
    return [formatCurrency(value), labels[name as keyof typeof labels] || name];
  };

  const formatYAxisTick = (value: number) => {
    if (value >= 100000000) {
      return `${Math.round(value / 100000000)}億円`;
    } else if (value >= 10000) {
      return `${Math.round(value / 10000)}万円`;
    }
    return formatCurrency(value);
  };

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="year" 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value}年`}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickFormatter={formatYAxisTick}
          />
          <Tooltip 
            formatter={formatTooltip}
            labelFormatter={(label) => `${label}年目`}
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #cccccc',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              color: '#000000',
              fontSize: '14px',
              fontWeight: '500',
              padding: '12px',
            }}
            labelStyle={{
              color: '#000000',
              fontWeight: '600',
              marginBottom: '4px',
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="investment"
            stackId="1"
            stroke="#16a34a"
            fill="#16a34a"
            fillOpacity={0.6}
            name="投資元本"
          />
          <Area
            type="monotone"
            dataKey="interest"
            stackId="1"
            stroke="#22c55e"
            fill="#22c55e"
            fillOpacity={0.8}
            name="運用益"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}