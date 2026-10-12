import '../css/app.css';
import './bootstrap';

import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import GuestRoute from './Components/GuestRoute';
import AppLayout from './Layouts/AppLayout';
import GuestLayout from './Layouts/GuestLayout';

import Welcome from './Pages/Welcome';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Reviewers from './Pages/Reviewers';
import ReviewerForm from './Pages/ReviewerForm';
import Study from './Pages/Study';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Welcome />} />

                    <Route element={<GuestRoute />}>
                        <Route element={<GuestLayout />}>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Route>
                    </Route>

                    <Route element={<ProtectedRoute />}>
                        <Route element={<AppLayout />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/reviewers" element={<Reviewers />} />
                            <Route path="/reviewers/create" element={<ReviewerForm />} />
                            <Route path="/reviewers/:id/edit" element={<ReviewerForm />} />
                            <Route path="/study" element={<Study />} />
                        </Route>
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

createRoot(document.getElementById('app')).render(<App />);
