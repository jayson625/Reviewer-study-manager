import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useReviewers from '../hooks/useReviewers';
import InputLabel from '../Components/InputLabel';
import TextInput from '../Components/TextInput';
import InputError from '../Components/InputError';
import PrimaryButton from '../Components/PrimaryButton';
import SecondaryButton from '../Components/SecondaryButton';
import LoadingState from '../Components/LoadingState';
import { extractErrorMessage, extractFieldErrors } from '../lib/errors';

export default function ReviewerForm() {
    const { id } = useParams();
    const isEditing = Boolean(id);
    const navigate = useNavigate();
    const { reviewers, loading, createReviewer, updateReviewer } = useReviewers();

    const [form, setForm] = useState({ subject: '', question: '', answer: '' });
    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!isEditing || loading) return;

        const reviewer = reviewers.find((r) => String(r.id) === id);
        if (!reviewer) {
            setNotFound(true);
            return;
        }

        setForm({
            subject: reviewer.subject,
            question: reviewer.question,
            answer: reviewer.answer,
        });
    }, [isEditing, loading, reviewers, id]);

    function update(field, value) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setFormError('');
        setErrors({});

        try {
            if (isEditing) {
                await updateReviewer(Number(id), form);
            } else {
                await createReviewer(form);
            }
            navigate('/reviewers');
        } catch (err) {
            setErrors(extractFieldErrors(err));
            setFormError(extractErrorMessage(err, 'Could not save this reviewer.'));
        } finally {
            setSubmitting(false);
        }
    }

    if (isEditing && loading) {
        return <LoadingState label="Loading reviewer..." />;
    }

    if (notFound) {
        return <p className="text-sm" style={{ color: 'var(--ink-soft)' }}>That reviewer could not be found.</p>;
    }

    return (
        <div className="index-card mx-auto max-w-lg">
            <h1 className="text-lg font-bold" style={{ color: 'var(--ink)' }}>
                {isEditing ? 'Edit Reviewer' : 'New Reviewer'}
            </h1>

            {formError && (
                <p className="mt-4 rounded-sm border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                    {formError}
                </p>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                    <InputLabel htmlFor="subject" value="Subject" />
                    <TextInput
                        id="subject"
                        value={form.subject}
                        onChange={(e) => update('subject', e.target.value)}
                        placeholder="e.g. Programming"
                        required
                        autoFocus
                    />
                    <InputError message={errors.subject} />
                </div>

                <div>
                    <InputLabel htmlFor="question" value="Question" />
                    <textarea
                        id="question"
                        value={form.question}
                        onChange={(e) => update('question', e.target.value)}
                        placeholder="e.g. What is a variable?"
                        required
                        rows={3}
                        className="field-input"
                    />
                    <InputError message={errors.question} />
                </div>

                <div>
                    <InputLabel htmlFor="answer" value="Answer" />
                    <textarea
                        id="answer"
                        value={form.answer}
                        onChange={(e) => update('answer', e.target.value)}
                        placeholder="e.g. A named storage location used to hold data."
                        required
                        rows={4}
                        className="field-input"
                    />
                    <InputError message={errors.answer} />
                </div>

                <div className="flex justify-end gap-3">
                    <SecondaryButton type="button" onClick={() => navigate('/reviewers')}>
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton type="submit" disabled={submitting}>
                        {submitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Reviewer'}
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
}
