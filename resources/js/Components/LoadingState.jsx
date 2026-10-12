export default function LoadingState({ label = 'Loading...' }) {
    return (
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-center">
            <div
                className="h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"
                style={{ borderColor: 'var(--line-strong)', borderTopColor: 'transparent' }}
                aria-hidden="true"
            />
            <p className="text-sm" style={{ color: 'var(--ink-soft)' }}>
                {label}
            </p>
        </div>
    );
}
