'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Position {
  symbol: string;
  name: string;
  shares: number;
  price: number;
  value: number;
  change: number;
  changePercent: number;
}

interface PortfolioData {
  totalValue: number;
  dailyChange: number;
  dailyChangePercent: number;
  positions: Position[];
}

interface PortfolioWidgetProps {
  data: PortfolioData;
}

export function PortfolioWidget({ data }: PortfolioWidgetProps) {
  const isUp = data.dailyChange >= 0;

  return (
    <Card className="bg-slate-900/50 border-slate-800 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-slate-300 text-sm font-medium flex items-center gap-2">
          📈 Portfolio
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Total Value */}
        <div className="mb-4">
          <div className="text-3xl font-bold text-slate-100">
            ${data.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className={`text-sm mt-1 ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
            {isUp ? '+' : ''}{data.dailyChange.toFixed(2)} ({isUp ? '+' : ''}{data.dailyChangePercent.toFixed(2)}%) today
          </div>
        </div>

        {/* Positions */}
        <div className="space-y-3">
          {data.positions.map((pos) => {
            const posUp = pos.change >= 0;
            return (
              <div
                key={pos.symbol}
                className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg"
              >
                <div>
                  <div className="font-medium text-slate-200">{pos.symbol}</div>
                  <div className="text-xs text-slate-500">{pos.shares} shares</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-200">${pos.value.toLocaleString()}</div>
                  <div className={`text-xs ${posUp ? 'text-emerald-400' : 'text-red-400'}`}>
                    {posUp ? '+' : ''}{pos.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
