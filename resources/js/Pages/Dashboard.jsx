import { Link } from 'react-router-dom';
import useReviewers from '../hooks/useReviewers';
import ProgressBar from '../Components/ProgressBar';
import LoadingState from '../Components/LoadingState';
import EmptyState from '../Components/EmptyState';
import PrimaryButton from '../Components/PrimaryButton';
import SecondaryButton from '../Components/SecondaryButton';
import subjectColor from '../lib/subjectColor';

export default function Dashboard() {
    const { reviewers, loading, error } = useReviewers();

    if (loading) {
        return <LoadingState label="Loading your dashboard..." />;
    }

    if (error) {
        return <p className="text-sm text-rose-700">{error}</p>;
    }

    const total = reviewers.length;
    const completed = reviewers.filter((r) => r.is_done).length;
    const remaining = total - completed;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    const subjects = [...new Set(reviewers.map((r) => r.subject))];
    const recent = [...reviewers]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);

    if (total === 0) {
        return (
            <EmptyState
                title="No reviewers yet."
                description="Create your first reviewer to start building your study bank."
                action={
                    <Link to="/reviewers/create">
                        <PrimaryButton>Create Your First Reviewer</PrimaryButton>
                    </Link>
                }
            />
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-lg font-bold" style={{ color: 'var(--ink)' }}>
                    Dashboard
                </h1>
                <p className="text-sm" style={{ color: 'var(--ink-soft)' }}>
                    Here's where your studying stands.
                </p>
            </div>

            <div className="index-card">
                <ProgressBar percent={percent} label="Study Progress" />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Stat label="Total" value={total} />
                <Stat label="Completed" value={completed} />
                <Stat label="Remaining" value={remaining} />
                <Stat label="Subjects" value={subjects.length} />
            </div>

            <div className="flex flex-wrap gap-3">
                <Link to="/study">
                    <PrimaryButton>Start Studying</PrimaryButton>
                </Link>
                <Link to="/reviewers/create">
                    <SecondaryButton>Add Reviewer</SecondaryButton>
                </Link>
            </div>

            <div>
                <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--ink-soft)' }}>
                    Recently added
                </h2>
                <ul className="mt-3 space-y-2">
                    {recent.map((reviewer) => {
                        const color = subjectColor(reviewer.subject);
                        return (
                            <li
                                key={reviewer.id}
                                className="flex items-center justify-between gap-3 rounded-sm border bg-[var(--paper-card)] px-3 py-2"
                                style={{ borderColor: 'var(--line)' }}
                            >
                                <span className="truncate text-sm" style={{ color: 'var(--ink)' }}>
                                    {reviewer.question}
                                </span>
                                <span
                                    className="shrink-0 rounded-sm border px-2 py-0.5 text-xs font-semibold"
                                    style={{ backgroundColor: color.bg, color: color.ink, borderColor: color.border }}
                                >
                                    {reviewer.subject}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

function Stat({ label, value }) {
    return (
        <div className="index-card text-center">
            <p className="font-mono-tab text-2xl font-bold" style={{ color: 'var(--accent)' }}>
                {value}
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--ink-soft)' }}>
                {label}
            </p>
        </div>
    );
}
