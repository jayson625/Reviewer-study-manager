import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/reviewers', label: 'Reviewers' },
    { to: '/study', label: 'Study Mode' },
];

export default function Navigation() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        navigate('/login');
    }

    return (
        <header className="border-b" style={{ borderColor: 'var(--line)', backgroundColor: 'var(--paper-card)' }}>
            <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
                <div className="flex items-center gap-6">
                    <span className="font-mono-tab text-sm font-bold tracking-tight" style={{ color: 'var(--accent)' }}>
                        Reviewer Study Manager
                    </span>
                    <nav className="flex items-center gap-4">
                        {links.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    'text-sm font-semibold ' + (isActive ? '' : 'opacity-60 hover:opacity-100')
                                }
                                style={{ color: 'var(--ink)' }}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>
                <div className="flex items-center gap-3 text-sm">
                    {user && (
                        <span style={{ color: 'var(--ink-soft)' }} className="hidden sm:inline">
                            {user.name}
                        </span>
                    )}
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="text-sm font-semibold"
                        style={{ color: 'var(--ink)' }}
                    >
                        Log out
                    </button>
                </div>
            </div>
        </header>
    );
}
