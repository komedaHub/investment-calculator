'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface TableColumn<T = Record<string, unknown>> {
  key: keyof T;
  header: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: T[keyof T], row: T, index: number) => React.ReactNode;
  className?: string;
}

export interface SummaryItem {
  label: string;
  value: React.ReactNode;
  className?: string;
}

export interface DataTableConfig<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  summary?: SummaryItem[];
  showSummary?: boolean;
  striped?: boolean;
  hoverable?: boolean;
}

interface DataTableProps<T = Record<string, unknown>> {
  data: T[];
  config: DataTableConfig<T>;
  title?: string;
  className?: string;
}

export function DataTable<T = Record<string, unknown>>({ data, config, title, className }: DataTableProps<T>) {
  if (data.length === 0) {
    return null;
  }

  const defaultRender = (value: T[keyof T]) => {
    if (value === null || value === undefined) return '';
    return String(value);
  };

  const getAlignClass = (align?: string) => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

  return (
    <Card className={className}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                {config.columns.map((column) => (
                  <th 
                    key={column.key}
                    className={`p-2 font-medium ${getAlignClass(column.align)} ${column.className || ''}`}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr 
                  key={index}
                  className={`border-b ${
                    config.hoverable !== false ? 'hover:bg-muted/50' : ''
                  } ${
                    config.striped !== false && index % 2 === 0 ? 'bg-muted/20' : ''
                  }`}
                >
                  {config.columns.map((column) => {
                    const value = row[column.key];
                    const content = column.render 
                      ? column.render(value, row, index)
                      : defaultRender(value);
                    
                    return (
                      <td 
                        key={column.key}
                        className={`p-2 ${getAlignClass(column.align)} ${column.className || ''}`}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {config.showSummary && config.summary && (
          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
            <div className={`grid gap-4 text-sm ${
              config.summary.length <= 2 ? 'grid-cols-2' :
              config.summary.length <= 4 ? 'grid-cols-2 md:grid-cols-4' :
              'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            }`}>
              {config.summary.map((item, index) => (
                <div key={index} className={item.className}>
                  <div className="text-muted-foreground">{item.label}</div>
                  <div className="font-semibold">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}