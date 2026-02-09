'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { StockChart } from '@/components/stock-chart';
import { PortfolioWidget } from '@/components/portfolio-widget';
import { ScheduledJobs } from '@/components/scheduled-jobs';
import { ActionLog } from '@/components/action-log';
import { NotesWidget } from '@/components/notes-widget';

interface DashboardData {
  agent: { name: string; emoji: string; status: string; statusText: string };
  lastSync: string;
  notionUrl?: string;
  scheduledJobs: Array<{ name: string; schedule: any; description: string }>;
  actionLog: Array<{ time: string; action: string }>;
  notes: string[];
}

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

interface PortfolioData {
  totalValue: number;
  dailyChange: number;
  dailyChangePercent: number;
  positions: Array<{
    symbol: string;
    name: string;
    shares: number;
    price: number;
    value: number;
    change: number;
    changePercent: number;
  }>;
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [dataRes, stockRes, portfolioRes] = await Promise.all([
          fetch('/api/data'),
          fetch('/api/stock-pick'),
          fetch('/api/portfolio'),
        ]);
        
        if (dataRes.ok) setData(await dataRes.json());
        if (stockRes.ok) setStockData(await stockRes.json());
        if (portfolioRes.ok) setPortfolioData(await portfolioRes.json());
      } catch (e) {
        console.error('Failed to load data:', e);
      }
    };

    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex items-center justify-center">
        <div className="text-slate-400 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-3xl shadow-lg shadow-orange-500/20">
            {data.agent.emoji}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-100">{data.agent.name} Mission Control</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-2.5 h-2.5 rounded-full ${
                data.agent.status === 'online' ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-yellow-500'
              }`} />
              <span className="text-slate-400 text-sm">{data.agent.statusText}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {data.notionUrl && (
            <Button variant="outline" asChild className="border-slate-700 hover:bg-slate-800">
              <a href={data.notionUrl} target="_blank" rel="noopener noreferrer">
                📝 Open in Notion
              </a>
            </Button>
          )}
          <div className="text-right text-sm text-slate-500">
            <div>Last sync</div>
            <div className="text-slate-400">{new Date(data.lastSync).toLocaleString()}</div>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stock Pick - Full Width */}
        {stockData && (
          <div className="lg:col-span-2">
            <StockChart data={stockData} />
          </div>
        )}

        {/* Portfolio */}
        {portfolioData && (
          <div className="lg:col-span-1">
            <PortfolioWidget data={portfolioData} />
          </div>
        )}

        {/* Scheduled Jobs */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-slate-300 text-sm font-medium flex items-center gap-2">
              ⏰ Scheduled Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScheduledJobs jobs={data.scheduledJobs} />
          </CardContent>
        </Card>

        {/* Action Log */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-slate-300 text-sm font-medium flex items-center gap-2">
              📝 Action Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ActionLog logs={data.actionLog} />
          </CardContent>
        </Card>

        {/* Notes */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-slate-300 text-sm font-medium flex items-center gap-2">
              💡 Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <NotesWidget notes={data.notes} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
