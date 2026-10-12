import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useReviewers from '../hooks/useReviewers';
import LoadingState from '../Components/LoadingState';
import EmptyState from '../Components/EmptyState';
import PrimaryButton from '../Components/PrimaryButton';
import SearchBar from '../Components/SearchBar';
import SubjectFilter from '../Components/SubjectFilter';
import ReviewerCard from '../Components/ReviewerCard';
import ConfirmModal from '../Components/ConfirmModal';
import { extractErrorMessage } from '../lib/errors';

export default function Reviewers() {
    const navigate = useNavigate();
    const { reviewers, loading, error, deleteReviewer, toggleDone } = useReviewers();
    const [search, setSearch] = useState('');
    const [subject, setSubject] = useState('all');
    const [pendingDelete, setPendingDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [togglingId, setTogglingId] = useState(null);
    const [actionError, setActionError] = useState('');

    const subjects = useMemo(() => [...new Set(reviewers.map((r) => r.subject))].sort(), [reviewers]);

    const filtered = useMemo(() => {
        const term = search.trim().toLowerCase();
        return reviewers.filter((r) => {
            const matchesSubject = subject === 'all' || r.subject === subject;
            const matchesSearch =
                term === '' ||
                r.subject.toLowerCase().includes(term) ||
                r.question.toLowerCase().includes(term) ||
                r.answer.toLowerCase().includes(term);
            return matchesSubject && matchesSearch;
        });
    }, [reviewers, search, subject]);

    async function handleToggleDone(reviewer) {
        setTogglingId(reviewer.id);
        setActionError('');
        try {
            await toggleDone(reviewer.id);
        } catch (err) {
            setActionError(extractErrorMessage(err, 'Could not update that reviewer.'));
        } finally {
            setTogglingId(null);
        }
    }

    async function confirmDelete() {
        if (!pendingDelete) return;
        setDeleting(true);
        setActionError('');
        try {
            await deleteReviewer(pendingDelete.id);
            setPendingDelete(null);
        } catch (err) {
            setActionError(extractErrorMessage(err, 'Could not delete that reviewer.'));
        } finally {
            setDeleting(false);
        }
    }

    if (loading) {
        return <LoadingState label="Loading your reviewers..." />;
    }

    if (error) {
        return <p className="text-sm text-rose-700">{error}</p>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-lg font-bold" style={{ color: 'var(--ink)' }}>
                        Reviewers
                    </h1>
                    <p className="text-sm" style={{ color: 'var(--ink-soft)' }}>
                        {reviewers.length} total
                    </p>
                </div>
                <Link to="/reviewers/create">
                    <PrimaryButton>+ New Reviewer</PrimaryButton>
                </Link>
            </div>

            {actionError && <p className="text-sm text-rose-700">{actionError}</p>}

            {reviewers.length === 0 ? (
                <EmptyState
                    title="No reviewers yet."
                    description="Create your first reviewer to start building your study bank."
                    action={
                        <Link to="/reviewers/create">
                            <PrimaryButton>Create Your First Reviewer</PrimaryButton>
                        </Link>
                    }
                />
            ) : (
                <>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <SearchBar value={search} onChange={setSearch} />
                        <SubjectFilter subjects={subjects} value={subject} onChange={setSubject} />
                    </div>

                    {filtered.length === 0 ? (
                        <EmptyState
                            title={search ? 'No reviewers match your search.' : 'No reviewers found for this subject.'}
                        />
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2">
                            {filtered.map((reviewer) => (
                                <ReviewerCard
                                    key={reviewer.id}
                                    reviewer={reviewer}
                                    onEdit={(r) => navigate(`/reviewers/${r.id}/edit`)}
                                    onDelete={setPendingDelete}
                                    onToggleDone={handleToggleDone}
                                    toggling={togglingId === reviewer.id}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}

            <ConfirmModal
                show={!!pendingDelete}
                title="Delete this reviewer?"
                message="Are you sure you want to delete this reviewer? This cannot be undone."
                confirmLabel="Delete"
                busy={deleting}
                onConfirm={confirmDelete}
                onCancel={() => setPendingDelete(null)}
            />
        </div>
    );
}
