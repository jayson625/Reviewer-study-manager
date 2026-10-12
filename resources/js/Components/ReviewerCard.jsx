import { useState } from 'react';
import subjectColor from '../lib/subjectColor';

export default function ReviewerCard({ reviewer, onEdit, onDelete, onToggleDone, toggling }) {
    const [expanded, setExpanded] = useState(false);
    const color = subjectColor(reviewer.subject);

    return (
        <div className="index-card flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
                <span
                    className="inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-semibold"
                    style={{ backgroundColor: color.bg, color: color.ink, borderColor: color.border }}
                >
                    {reviewer.subject}
                </span>

                <button
                    type="button"
                    onClick={() => onToggleDone(reviewer)}
                    disabled={toggling}
                    aria-pressed={reviewer.is_done}
                    className="flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-xs font-semibold disabled:opacity-50"
                    style={
                        reviewer.is_done
                            ? { backgroundColor: '#e7efe3', color: 'var(--good)', borderColor: '#b9d2ae' }
                            : { backgroundColor: '#fff', color: 'var(--ink-soft)', borderColor: 'var(--line-strong)' }
                    }
                >
                    <span aria-hidden="true">{reviewer.is_done ? '✓' : '○'}</span>
                    {reviewer.is_done ? 'Done' : 'Not done'}
                </button>
            </div>

            <div>
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--ink-soft)' }}>
                    Question
                </p>
                <p className="mt-1 text-sm font-medium" style={{ color: 'var(--ink)' }}>
                    {reviewer.question}
                </p>
            </div>

            <div>
                <button
                    type="button"
                    onClick={() => setExpanded((prev) => !prev)}
                    className="text-xs font-semibold underline"
                    style={{ color: 'var(--accent)' }}
                >
                    {expanded ? 'Hide answer' : 'Show answer'}
                </button>
                {expanded && (
                    <p className="mt-2 text-sm" style={{ color: 'var(--ink-soft)' }}>
                        {reviewer.answer}
                    </p>
                )}
            </div>

            <div className="mt-1 flex justify-end gap-3 border-t pt-3" style={{ borderColor: 'var(--line)' }}>
                <button
                    type="button"
                    onClick={() => onEdit(reviewer)}
                    className="text-xs font-semibold"
                    style={{ color: 'var(--ink)' }}
                >
                    Edit
                </button>
                <button
                    type="button"
                    onClick={() => onDelete(reviewer)}
                    className="text-xs font-semibold text-rose-700"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
