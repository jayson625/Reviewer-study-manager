export default function SearchBar({ value, onChange, placeholder = 'Search reviewers...' }) {
    return (
        <div className="relative w-full sm:max-w-xs">
            <span
                className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm"
                style={{ color: 'var(--ink-soft)' }}
                aria-hidden="true"
            >
                ⌕
            </span>
            <input
                type="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                aria-label="Search reviewers"
                className="field-input pl-8"
            />
        </div>
    );
}
