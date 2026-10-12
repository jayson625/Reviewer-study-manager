export default function EmptyState({ title, description, action }) {
    return (
        <div
            className="rounded-sm border border-dashed px-6 py-12 text-center"
            style={{ borderColor: 'var(--line-strong)' }}
        >
            <p className="text-base font-semibold" style={{ color: 'var(--ink)' }}>
                {title}
            </p>
            {description && (
                <p className="mx-auto mt-1 max-w-sm text-sm" style={{ color: 'var(--ink-soft)' }}>
                    {description}
                </p>
            )}
            {action && <div className="mt-4">{action}</div>}
        </div>
    );
}
