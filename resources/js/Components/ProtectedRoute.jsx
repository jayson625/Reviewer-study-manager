import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingState from './LoadingState';

export default function ProtectedRoute() {
    const { user, checking } = useAuth();

    if (checking) {
        return <LoadingState label="Checking your session..." />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
