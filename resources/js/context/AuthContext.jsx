import { createContext, useContext, useEffect, useState } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        authService
            .fetchCurrentUser()
            .then(setUser)
            .catch(() => setUser(null))
            .finally(() => setChecking(false));
    }, []);

    async function register(payload) {
        const registeredUser = await authService.register(payload);
        setUser(registeredUser);
        return registeredUser;
    }

    async function login(payload) {
        const loggedInUser = await authService.login(payload);
        setUser(loggedInUser);
        return loggedInUser;
    }

    async function logout() {
        try {
            await authService.logout();
        } finally {
            setUser(null);
        }
    }

    return (
        <AuthContext.Provider value={{ user, checking, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
