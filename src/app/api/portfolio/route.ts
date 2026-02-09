import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'public', 'portfolio.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch {
    // Fallback data
    return NextResponse.json({
      totalValue: 127450.23,
      dailyChange: 1234.56,
      dailyChangePercent: 0.98,
      positions: [
        { symbol: 'AAPL', name: 'Apple Inc.', shares: 50, price: 182.50, value: 9125, change: 125, changePercent: 1.39 },
        { symbol: 'MSFT', name: 'Microsoft', shares: 30, price: 415.20, value: 12456, change: -89, changePercent: -0.71 },
        { symbol: 'GOOGL', name: 'Alphabet', shares: 40, price: 175.30, value: 7012, change: 234, changePercent: 3.45 },
        { symbol: 'NVDA', name: 'NVIDIA', shares: 25, price: 875.60, value: 21890, change: 567, changePercent: 2.66 },
      ],
    });
  }
}
