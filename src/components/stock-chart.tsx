'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { format, parseISO } from 'date-fns';

interface StockData {
  ticker: string;
  name: string;
  sector: string;
  price: number;
  ma200: number;
  distance: string;
  signal: string;
  date: string;
  priceHistory: Array<{ date: string; price: number; ma200: number }>;
  yahooUrl: string;
  wisdom: { quote: string; author: string };
}

interface StockChartProps {
  data: StockData;
}

export function StockChart({ data }: StockChartProps) {
  const isAboveMA = data.price >= data.ma200;
  const distanceNum = parseFloat(data.distance);

  return (
    <Card className="bg-gradient-to-br from-slate-900/80 to-emerald-950/30 border-slate-800">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-slate-400 text-sm font-medium flex items-center gap-2">
              🎯 Daily Stock Pick
            </CardTitle>
            <div className="mt-2">
              <span className="text-3xl font-bold text-emerald-400">{data.ticker}</span>
              <span className="text-slate-500 ml-3">{data.date}</span>
            </div>
            <div className="text-slate-400 text-sm mt-1">
              {data.name} · {data.sector}
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={`${
              isAboveMA 
                ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10' 
                : 'border-amber-500/50 text-amber-400 bg-amber-500/10'
            }`}
          >
            {data.signal}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        {/* Chart */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data.priceHistory}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <XAxis
                dataKey="date"
                stroke="#475569"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => {
                  try {
                    return format(parseISO(value), 'MMM d');
                  } catch {
                    return value;
                  }
                }}
                interval="preserveStartEnd"
                minTickGap={50}
              />
              <YAxis
                stroke="#475569"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
                domain={['dataMin - 5', 'dataMax + 5']}
                width={60}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  padding: '12px',
                }}
                labelStyle={{ color: '#94a3b8', marginBottom: '8px' }}
                formatter={(value) => {
                  if (typeof value === 'number') {
                    return `$${value.toFixed(2)}`;
                  }
                  return value;
                }}
                labelFormatter={(label) => {
                  try {
                    return format(parseISO(label), 'MMM d, yyyy');
                  } catch {
                    return label;
                  }
                }}
              />
              
              {/* 200 Week MA Line */}
              <Line
                type="monotone"
                dataKey="ma200"
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="200W MA"
              />
              
              {/* Price Line */}
              <Line
                type="monotone"
                dataKey="price"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
                name="Price"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-slate-800">
          <div>
            <div className="text-slate-500 text-xs uppercase tracking-wide">Price</div>
            <div className="text-xl font-semibold text-slate-200">${data.price.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-slate-500 text-xs uppercase tracking-wide">200-Week MA</div>
            <div className="text-xl font-semibold text-amber-400">${data.ma200.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-slate-500 text-xs uppercase tracking-wide">Distance</div>
            <div className={`text-xl font-semibold ${
              distanceNum >= 0 ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {data.distance}
            </div>
          </div>
        </div>

        {/* Link to Yahoo Finance */}
        <a
          href={data.yahooUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          📈 View on Yahoo Finance →
        </a>

        {/* Munger Wisdom */}
        <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
          <div className="flex gap-4">
            <img
              src="/munger.jpg"
              alt="Charlie Munger"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-slate-300 text-sm italic">"{data.wisdom.quote}"</p>
              <p className="text-slate-500 text-xs mt-2">— {data.wisdom.author}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
