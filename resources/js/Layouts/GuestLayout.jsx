import { Link, Outlet } from 'react-router-dom';
import SampleCardStack from '../Components/SampleCardStack';

const POINTS = [
    'Write your own subject, question and answer',
    'Study with a focused, one-card-at-a-time mode',
    'Progress calculated from what you actually know',
];

export default function GuestLayout() {
    return (
        <div className="grid min-h-screen md:grid-cols-2">
            <aside className="hidden flex-col justify-center px-10 py-10 md:flex">
                <div className="flex flex-col gap-8">
                    <SampleCardStack />
                    <div>
                        <h2 className="max-w-sm text-2xl font-bold leading-snug" style={{ color: 'var(--ink)' }}>
                            Make your own reviewers. Study them properly.
                        </h2>
                        <ul className="mt-5 space-y-2">
                            {POINTS.map((point) => (
                                <li key={point} className="flex items-start gap-2 text-sm" style={{ color: 'var(--ink-soft)' }}>
                                    <span className="mt-0.5" style={{ color: 'var(--good)' }} aria-hidden="true">
                                        ✓
                                    </span>
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </aside>

            <div
                className="flex flex-col items-center justify-center border-t px-4 py-12 md:border-l md:border-t-0"
                style={{ borderColor: 'var(--line)' }}
            >
                <Link
                    to="/"
                    className="mb-8 font-mono-tab text-sm font-bold tracking-tight md:hidden"
                    style={{ color: 'var(--accent)' }}
                >
                    Reviewer Study Manager
                </Link>

                <div className="index-card w-full max-w-sm">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
