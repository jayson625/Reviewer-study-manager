import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PrimaryButton from '../Components/PrimaryButton';
import SecondaryButton from '../Components/SecondaryButton';
import LoadingState from '../Components/LoadingState';

const FEATURES = [
    {
        title: 'Build your own reviewers',
        body: 'Write a subject, a question, and an answer. No templates, no busywork — just the material you actually need to know.',
    },
    {
        title: 'Study Mode',
        body: 'Questions one at a time. The answer stays hidden until you ask for it, so you actually test yourself instead of re-reading.',
    },
    {
        title: 'Track real progress',
        body: 'Mark what you know and what needs another pass. Your completion percentage is calculated from your own answers, not guesswork.',
    },
    {
        title: 'Filter and search',
        body: 'Jump straight to a subject, or search across every question and answer you’ve written.',
    },
];

export default function Welcome() {
    const { user, checking } = useAuth();

    if (checking) {
        return <LoadingState label="Loading..." />;
    }

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="min-h-screen">
            <header className="border-b" style={{ borderColor: 'var(--line)', backgroundColor: 'var(--paper-card)' }}>
                <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
                    <span className="font-mono-tab text-sm font-bold tracking-tight" style={{ color: 'var(--accent)' }}>
                        Reviewer Study Manager
                    </span>
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                            Log in
                        </Link>
                        <Link to="/register">
                            <PrimaryButton>Register</PrimaryButton>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
                <div className="max-w-2xl">
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--accent)' }}>
                        For students who make their own notes
                    </p>
                    <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl" style={{ color: 'var(--ink)' }}>
                        Turn your notes into reviewers you can actually study from.
                    </h1>
                    <p className="mt-4 text-base" style={{ color: 'var(--ink-soft)' }}>
                        Reviewer Study Manager is a place to write your own question-and-answer reviewers,
                        organize them by subject, and go through them in a focused Study Mode that tracks
                        what you've actually learned.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link to="/register">
                            <PrimaryButton>Create a free account</PrimaryButton>
                        </Link>
                        <Link to="/login">
                            <SecondaryButton>I already have an account</SecondaryButton>
                        </Link>
                    </div>
                </div>

                <div className="mt-16 grid gap-4 sm:grid-cols-2">
                    {FEATURES.map((feature) => (
                        <div key={feature.title} className="index-card">
                            <h2 className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                                {feature.title}
                            </h2>
                            <p className="mt-1 text-sm" style={{ color: 'var(--ink-soft)' }}>
                                {feature.body}
                            </p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
