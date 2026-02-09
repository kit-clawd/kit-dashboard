'use client';

interface NotesWidgetProps {
  notes: string[];
}

export function NotesWidget({ notes }: NotesWidgetProps) {
  return (
    <div className="space-y-2">
      {notes.map((note, i) => (
        <div
          key={i}
          className="p-3 bg-slate-800/50 rounded-lg border-l-2 border-purple-500"
        >
          <div className="text-sm text-slate-300">{note}</div>
        </div>
      ))}
      {notes.length === 0 && (
        <div className="text-slate-500 text-sm">No notes</div>
      )}
    </div>
  );
}
