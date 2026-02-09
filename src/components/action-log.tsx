'use client';

import { format, parseISO } from 'date-fns';

interface LogEntry {
  time: string;
  action: string;
}

interface ActionLogProps {
  logs: LogEntry[];
}

export function ActionLog({ logs }: ActionLogProps) {
  return (
    <div className="space-y-2">
      {logs.slice(0, 5).map((log, i) => {
        let formattedTime = log.time;
        try {
          formattedTime = format(parseISO(log.time), 'MMM d, h:mm a');
        } catch {}

        return (
          <div key={i} className="p-3 bg-slate-800/50 rounded-lg">
            <div className="text-xs text-slate-500">{formattedTime}</div>
            <div className="text-sm text-slate-300 mt-1">{log.action}</div>
          </div>
        );
      })}
      {logs.length === 0 && (
        <div className="text-slate-500 text-sm">No recent activity</div>
      )}
    </div>
  );
}
