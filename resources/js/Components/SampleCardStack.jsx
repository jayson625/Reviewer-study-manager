import subjectColor from '../lib/subjectColor';

const SAMPLE_CARDS = [
    { subject: 'Database', question: 'What is a primary key?', rotate: -6, offset: 0 },
    { subject: 'Networking', question: 'What does DNS stand for?', rotate: 3, offset: 14 },
    { subject: 'Programming', question: 'What is a variable?', answer: 'A named storage location used to hold data.', rotate: -2, offset: 28 },
];

export default function SampleCardStack() {
    return (
        <div className="relative mx-auto h-72 w-full max-w-xs" aria-hidden="true">
            {SAMPLE_CARDS.map((card, i) => {
                const color = subjectColor(card.subject);
                return (
                    <div
                        key={card.subject}
                        className="absolute inset-x-0 rounded-sm border bg-[var(--paper-card)] p-4 shadow-sm"
                        style={{
                            top: card.offset,
                            borderColor: 'var(--line-strong)',
                            transform: `rotate(${card.rotate}deg)`,
                            zIndex: i,
                        }}
                    >
                        <span
                            className="inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-semibold"
                            style={{ backgroundColor: color.bg, color: color.ink, borderColor: color.border }}
                        >
                            {card.subject}
                        </span>
                        <p className="mt-3 text-sm font-medium" style={{ color: 'var(--ink)' }}>
                            {card.question}
                        </p>
                        {card.answer && (
                            <p className="mt-2 border-t pt-2 text-xs" style={{ borderColor: 'var(--line)', color: 'var(--ink-soft)' }}>
                                {card.answer}
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
