import { useCallback, useEffect, useState } from 'react';
import * as reviewerService from '../services/reviewerService';
import { extractErrorMessage } from '../lib/errors';

export default function useReviewers() {
    const [reviewers, setReviewers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const load = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const data = await reviewerService.fetchReviewers();
            setReviewers(data);
        } catch (err) {
            setError(extractErrorMessage(err, 'Could not load reviewers.'));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    async function createReviewer(payload) {
        const reviewer = await reviewerService.createReviewer(payload);
        setReviewers((prev) => [reviewer, ...prev]);
        return reviewer;
    }

    async function updateReviewer(id, payload) {
        const reviewer = await reviewerService.updateReviewer(id, payload);
        setReviewers((prev) => prev.map((r) => (r.id === id ? reviewer : r)));
        return reviewer;
    }

    async function deleteReviewer(id) {
        await reviewerService.deleteReviewer(id);
        setReviewers((prev) => prev.filter((r) => r.id !== id));
    }

    async function toggleDone(id) {
        const reviewer = await reviewerService.toggleReviewerDone(id);
        setReviewers((prev) => prev.map((r) => (r.id === id ? reviewer : r)));
        return reviewer;
    }

    return {
        reviewers,
        loading,
        error,
        reload: load,
        createReviewer,
        updateReviewer,
        deleteReviewer,
        toggleDone,
    };
}
