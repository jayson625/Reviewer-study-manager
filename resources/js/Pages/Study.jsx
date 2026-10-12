import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import useReviewers from '../hooks/useReviewers';
import LoadingState from '../Components/LoadingState';
import EmptyState from '../Components/EmptyState';
import PrimaryButton from '../Components/PrimaryButton';
import SecondaryButton from '../Components/SecondaryButton';
import ProgressBar from '../Components/ProgressBar';
import subjectColor from '../lib/subjectColor';

export default function Study() {
    const { reviewers, loading, error, toggleDone } = useReviewers();
    const [phase, setPhase] = useState('setup'); // setup | session | summary
    const [selectedSubject, setSelectedSubject] = useState('all');
    const [sessionCards, setSessionCards] = useState([]);
    const [index, setIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [results, setResults] = useState({});
    const [marking, setMarking] = useState(false);

    const subjects = useMemo(() => [...new Set(reviewers.map((r) => r.subject))].sort(), [reviewers]);

    const poolForSubject = (subject) =>
        subject === 'all' ? reviewers : reviewers.filter((r) => r.subject === subject);

    function startSession() {
        setSessionCards(poolForSubject(selectedSubject));
        setIndex(0);
        setShowAnswer(false);
        setResults({});
        setPhase('session');
    }

    function goToNext() {
        if (index + 1 >= sessionCards.length) {
            setPhase('summary');
        } else {
            setIndex((prev) => prev + 1);
            setShowAnswer(false);
        }
    }

    async function markKnowledge(knowsIt) {
        const card = sessionCards[index];
        setMarking(true);
        try {
            if (card.is_done !== knowsIt) {
                await toggleDone(card.id);
                setSessionCards((prev) =>
                    prev.map((c) => (c.id === card.id ? { ...c, is_done: knowsIt } : c)),
                );
            }
            setResults((prev) => ({ ...prev, [card.id]: knowsIt ? 'know' : 'review' }));
        } finally {
            setMarking(false);
            goToNext();
        }
    }

    if (loading) {
        return <LoadingState label="Loading your reviewers..." />;
    }

    if (error) {
        return <p className="text-sm text-rose-700">{error}</p>;
    }

    if (reviewers.length === 0) {
        return (
            <EmptyState
                title="Nothing to study yet."
                description="Add a few reviewers first, then come back to start a study session."
                action={
                    <Link to="/reviewers/create">
                        <PrimaryButton>Create Your First Reviewer</PrimaryButton>
                    </Link>
                }
            />
        );
    }

    if (phase === 'setup') {
        return (
            <div className="mx-auto max-w-lg space-y-6">
                <div>
                    <h1 className="text-lg font-bold" style={{ color: 'var(--ink)' }}>
                        Choose what to study
                    </h1>
                    <p className="text-sm" style={{ color: 'var(--ink-soft)' }}>
                        Pick a subject or study everything.
                    </p>
                </div>

                <div className="index-card space-y-2">
                    <SubjectOption
                        label="All Subjects"
                        count={reviewers.length}
                        active={selectedSubject === 'all'}
                        onClick={() => setSelectedSubject('all')}
                    />
                    {subjects.map((subject) => (
                        <SubjectOption
                            key={subject}
                            label={subject}
                            count={poolForSubject(subject).length}
                            active={selectedSubject === subject}
                            onClick={() => setSelectedSubject(subject)}
                        />
                    ))}
                </div>

                <PrimaryButton
                    className="w-full"
                    onClick={startSession}
                    disabled={poolForSubject(selectedSubject).length === 0}
                >
                    Start Studying ({poolForSubject(selectedSubject).length})
                </PrimaryButton>
            </div>
        );
    }

    if (phase === 'summary') {
        const studied = sessionCards.length;
        const known = Object.values(results).filter((r) => r === 'know').length;
        const needsReview = Object.values(results).filter((r) => r === 'review').length;

        return (
            <div className="mx-auto max-w-lg space-y-6 text-center">
                <h1 className="text-lg font-bold" style={{ color: 'var(--ink)' }}>
                    Study Session Complete
                </h1>
                <div className="index-card space-y-4">
                    <p className="font-mono-tab text-3xl font-bold" style={{ color: 'var(--accent)' }}>
                        {studied}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--ink-soft)' }}>
                        reviewers studied
                    </p>
                    <div className="flex justify-center gap-8 pt-2">
                        <div>
                            <p className="font-mono-tab text-xl font-bold" style={{ color: 'var(--good)' }}>
                                {known}
                            </p>
                            <p className="text-xs" style={{ color: 'var(--ink-soft)' }}>
                                know this
                            </p>
                        </div>
                        <div>
                            <p className="font-mono-tab text-xl font-bold" style={{ color: 'var(--warn)' }}>
                                {needsReview}
                            </p>
                            <p className="text-xs" style={{ color: 'var(--ink-soft)' }}>
                                need review
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-3">
                    <SecondaryButton onClick={() => setPhase('setup')}>Study Again</SecondaryButton>
                    <Link to="/dashboard">
                        <PrimaryButton>Back to Dashboard</PrimaryButton>
                    </Link>
                </div>
            </div>
        );
    }

    const card = sessionCards[index];
    const color = subjectColor(card.subject);
    const percent = Math.round((index / sessionCards.length) * 100);

    return (
        <div className="mx-auto max-w-lg space-y-6">
            <div>
                <div className="mb-1 flex items-center justify-between text-xs font-semibold" style={{ color: 'var(--ink-soft)' }}>
                    <span>
                        Question {index + 1} of {sessionCards.length}
                    </span>
                    <span
                        className="rounded-sm border px-2 py-0.5"
                        style={{ backgroundColor: color.bg, color: color.ink, borderColor: color.border }}
                    >
                        {card.subject}
                    </span>
                </div>
                <ProgressBar percent={percent} />
            </div>

            <div className="index-card min-h-[16rem]">
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--ink-soft)' }}>
                    Question
                </p>
                <p className="mt-2 text-base font-medium" style={{ color: 'var(--ink)' }}>
                    {card.question}
                </p>

                {showAnswer && (
                    <div className="mt-6 border-t pt-4" style={{ borderColor: 'var(--line)' }}>
                        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--ink-soft)' }}>
                            Answer
                        </p>
                        <p className="mt-2 text-sm" style={{ color: 'var(--ink)' }}>
                            {card.answer}
                        </p>
                    </div>
                )}
            </div>

            {!showAnswer ? (
                <PrimaryButton className="w-full" onClick={() => setShowAnswer(true)}>
                    Show Answer
                </PrimaryButton>
            ) : (
                <div className="flex gap-3">
                    <SecondaryButton className="flex-1" disabled={marking} onClick={() => markKnowledge(false)}>
                        Need Review
                    </SecondaryButton>
                    <PrimaryButton className="flex-1" disabled={marking} onClick={() => markKnowledge(true)}>
                        I Know This
                    </PrimaryButton>
                </div>
            )}

            <div className="text-center">
                <button
                    type="button"
                    onClick={goToNext}
                    className="text-xs font-semibold underline"
                    style={{ color: 'var(--ink-soft)' }}
                >
                    Skip without marking
                </button>
            </div>
        </div>
    );
}

function SubjectOption({ label, count, active, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex w-full items-center justify-between rounded-sm border px-3 py-2 text-sm font-semibold"
            style={
                active
                    ? { backgroundColor: 'var(--accent)', color: '#fff', borderColor: 'var(--accent)' }
                    : { backgroundColor: '#fff', color: 'var(--ink)', borderColor: 'var(--line-strong)' }
            }
        >
            <span>{label}</span>
            <span className="font-mono-tab text-xs opacity-80">{count}</span>
        </button>
    );
}
