import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Try to read from local data file first
    const dataPath = path.join(process.cwd(), 'public', 'data.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch {
    // Fallback data
    return NextResponse.json({
      agent: {
        name: 'Kit',
        emoji: '🦊',
        status: 'online',
        statusText: 'Running on Mac Mini M4',
      },
      lastSync: new Date().toISOString(),
      notionUrl: 'https://www.notion.so/be60b425a2ad40099338723024c839fd',
      scheduledJobs: [
        { name: 'morning-briefing', schedule: { kind: 'cron', expr: '30 4 * * *' }, description: 'Gmail, DMs, calendar digest' },
        { name: 'tesla-daily-monitor', schedule: { kind: 'cron', expr: '0 10 * * *' }, description: 'Craigslist, Kijiji, FB Marketplace' },
        { name: 'overnight-build', schedule: { kind: 'cron', expr: '0 23 * * *' }, description: 'Build something useful' },
      ],
      actionLog: [
        { time: new Date().toISOString(), action: 'Dashboard rebuilt with shadcn' },
      ],
      notes: [
        'Draft approval required for ALL external messages',
        'Adrian\'s waking hours: 5am - 10pm Pacific',
      ],
    });
  }
}
