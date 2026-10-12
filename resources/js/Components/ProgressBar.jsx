export default function ProgressBar({ percent, label }) {
    const safePercent = Number.isFinite(percent) ? Math.min(100, Math.max(0, percent)) : 0;

    return (
        <div>
            {label && (
                <div className="mb-1 flex items-baseline justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--ink-soft)' }}>
                        {label}
                    </span>
                    <span className="font-mono-tab text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                        {safePercent}%
                    </span>
                </div>
            )}
            <div
                className="h-2.5 w-full overflow-hidden rounded-full border"
                style={{ borderColor: 'var(--line-strong)', backgroundColor: '#fff' }}
                role="progressbar"
                aria-valuenow={safePercent}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${safePercent}%`, backgroundColor: 'var(--accent)' }}
                />
            </div>
        </div>
    );
}
