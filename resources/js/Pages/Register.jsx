import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import InputLabel from '../Components/InputLabel';
import TextInput from '../Components/TextInput';
import InputError from '../Components/InputError';
import PrimaryButton from '../Components/PrimaryButton';
import { extractErrorMessage, extractFieldErrors } from '../lib/errors';

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    function update(field, value) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setFormError('');
        setErrors({});

        try {
            await register(form);
            navigate('/dashboard');
        } catch (err) {
            setErrors(extractFieldErrors(err));
            setFormError(extractErrorMessage(err, 'Could not create your account.'));
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="p-6">
            <p className="font-mono-tab text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                Register
            </p>
            <h1 className="mt-1 text-xl font-bold" style={{ color: 'var(--ink)' }}>
                Create your account
            </h1>
            <p className="mt-1 text-sm" style={{ color: 'var(--ink-soft)' }}>
                Start building your own reviewers.
            </p>

            {formError && (
                <p className="mt-4 rounded-sm border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                    {formError}
                </p>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        required
                        autoFocus
                        autoComplete="name"
                    />
                    <InputError message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        value={form.password}
                        onChange={(e) => update('password', e.target.value)}
                        required
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password} />
                </div>

                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        value={form.password_confirmation}
                        onChange={(e) => update('password_confirmation', e.target.value)}
                        required
                        autoComplete="new-password"
                    />
                </div>

                <PrimaryButton type="submit" className="w-full" disabled={submitting}>
                    {submitting ? 'Creating account...' : 'Register'}
                </PrimaryButton>
            </form>

            <p className="mt-6 text-center text-sm" style={{ color: 'var(--ink-soft)' }}>
                Already have an account?{' '}
                <Link to="/login" className="font-semibold underline" style={{ color: 'var(--accent)' }}>
                    Log in
                </Link>
            </p>
        </div>
    );
}
