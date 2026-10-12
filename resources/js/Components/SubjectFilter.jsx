export default function SubjectFilter({ subjects, value, onChange }) {
    return (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by subject">
            <FilterPill label="All Subjects" active={value === 'all'} onClick={() => onChange('all')} />
            {subjects.map((subject) => (
                <FilterPill
                    key={subject}
                    label={subject}
                    active={value === subject}
                    onClick={() => onChange(subject)}
                />
            ))}
        </div>
    );
}

function FilterPill({ label, active, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className="rounded-sm border px-3 py-1 text-xs font-semibold transition-colors"
            style={
                active
                    ? { backgroundColor: 'var(--accent)', color: '#fff', borderColor: 'var(--accent)' }
                    : { backgroundColor: '#fff', color: 'var(--ink)', borderColor: 'var(--line-strong)' }
            }
        >
            {label}
        </button>
    );
}
