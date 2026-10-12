import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingState from './LoadingState';

export default function GuestRoute() {
    const { user, checking } = useAuth();

    if (checking) {
        return <LoadingState label="Loading..." />;
    }

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}
