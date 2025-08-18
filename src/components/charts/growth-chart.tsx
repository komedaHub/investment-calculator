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

export interface ChartAreaConfig {
  dataKey: string;
  name: string;
  color: string;
  stackId?: string;
  fillOpacity?: number;
}

export interface ChartConfig {
  xAxisKey: string;
  xAxisLabel?: string;
  yAxisFormatter?: (value: number) => string;
  tooltipFormatter?: (value: number, name: string) => [string, string];
  tooltipLabelFormatter?: (label: string | number) => string;
  areas: ChartAreaConfig[];
  height?: number;
  margin?: { top: number; right: number; left: number; bottom: number };
}

interface GrowthChartProps<T = Record<string, unknown>> {
  data: T[];
  config: ChartConfig;
  title?: string;
}

export function GrowthChart<T = Record<string, unknown>>({ data, config, title }: GrowthChartProps<T>) {
  const defaultTooltipFormatter = (value: number, name: string) => {
    return [value.toLocaleString(), name];
  };

  const defaultYAxisFormatter = (value: number) => {
    return value.toLocaleString();
  };

  const defaultTooltipLabelFormatter = (label: string | number) => {
    return String(label);
  };

  const height = config.height || 384; // 96 * 4 = 384px (h-96)
  const margin = config.margin || { top: 20, right: 30, left: 20, bottom: 60 }; // 凡例用に下部マージンを拡大

  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={margin}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey={config.xAxisKey}
            tick={{ fontSize: 12 }}
            tickFormatter={config.xAxisLabel ? (value) => `${value}${config.xAxisLabel}` : undefined}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickFormatter={config.yAxisFormatter || defaultYAxisFormatter}
          />
          <Tooltip 
            formatter={config.tooltipFormatter || defaultTooltipFormatter}
            labelFormatter={config.tooltipLabelFormatter || defaultTooltipLabelFormatter}
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
          <Legend 
            verticalAlign="bottom"
            height={36}
            iconType="rect"
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: '14px',
            }}
          />
          {config.areas.map((area) => (
            <Area
              key={area.dataKey}
              type="monotone"
              dataKey={area.dataKey}
              stackId={area.stackId}
              stroke={area.color}
              fill={area.color}
              fillOpacity={area.fillOpacity || 0.6}
              name={area.name}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}