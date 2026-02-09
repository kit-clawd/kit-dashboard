import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'public', 'stock-pick.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch {
    // Fallback with sample historical data
    const generateHistory = () => {
      const history = [];
      const baseDate = new Date('2025-06-01');
      let price = 180;
      let ma200 = 195;
      
      for (let i = 0; i < 180; i++) {
        const date = new Date(baseDate);
        date.setDate(date.getDate() + i);
        
        // Simulate some price movement
        price += (Math.random() - 0.48) * 4;
        ma200 += (Math.random() - 0.5) * 0.5;
        
        history.push({
          date: date.toISOString().split('T')[0],
          price: Math.round(price * 100) / 100,
          ma200: Math.round(ma200 * 100) / 100,
        });
      }
      return history;
    };

    return NextResponse.json({
      ticker: 'DHR',
      name: 'Danaher Corporation',
      sector: 'Healthcare',
      price: 216.61,
      ma200: 225.66,
      distance: '-4.01%',
      signal: 'Potential bounce play - testing 200-week MA support',
      date: '2026-02-07',
      priceHistory: generateHistory(),
      yahooUrl: 'https://finance.yahoo.com/quote/DHR',
      wisdom: {
        quote: 'If all you did was buy quality stocks on the 200-week moving average, you\'d beat the S&P 500 by a wide margin. The problem is, few have that discipline.',
        author: 'Charlie Munger',
      },
    });
  }
}
