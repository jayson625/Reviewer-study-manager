import { Outlet } from 'react-router-dom';
import Navigation from '../Components/Navigation';

export default function AppLayout() {
    return (
        <div className="min-h-screen">
            <Navigation />
            <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
                <Outlet />
            </main>
        </div>
    );
}
