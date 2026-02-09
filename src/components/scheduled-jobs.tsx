'use client';

interface Job {
  name: string;
  schedule: { kind: string; expr?: string; tz?: string } | string;
  description: string;
}

interface ScheduledJobsProps {
  jobs: Job[];
}

function formatSchedule(schedule: Job['schedule']): string {
  if (typeof schedule === 'string') return schedule;
  if (schedule.kind === 'cron' && schedule.expr) {
    // Simple cron parsing for display
    const expr = schedule.expr;
    if (expr === '0 23 * * *') return '11pm daily';
    if (expr === '0 4 * * *') return '4am daily';
    if (expr === '30 4 * * *') return '4:30am daily';
    if (expr === '0 9 * * *') return '9am daily';
    if (expr === '0 10 * * *') return '10am daily';
    if (expr === '0 9 * * 1') return 'Mon 9am';
    if (expr === '0 10 * * 3') return 'Wed 10am';
    return expr;
  }
  return 'Scheduled';
}

export function ScheduledJobs({ jobs }: ScheduledJobsProps) {
  return (
    <div className="space-y-2">
      {jobs.slice(0, 6).map((job, i) => (
        <div
          key={i}
          className="p-3 bg-slate-800/50 rounded-lg"
        >
          <div className="font-medium text-blue-400 text-sm">{job.name}</div>
          <div className="text-xs text-slate-500 mt-1">{formatSchedule(job.schedule)}</div>
          {job.description && (
            <div className="text-xs text-slate-400 mt-1">{job.description}</div>
          )}
        </div>
      ))}
      {jobs.length === 0 && (
        <div className="text-slate-500 text-sm">No scheduled jobs</div>
      )}
    </div>
  );
}
