import api from '../lib/api';

export async function fetchReviewers({ subject, search } = {}) {
    const { data } = await api.get('/reviewers', { params: { subject, search } });
    return data.reviewers;
}

export async function createReviewer(payload) {
    const { data } = await api.post('/reviewers', payload);
    return data.reviewer;
}

export async function updateReviewer(id, payload) {
    const { data } = await api.put(`/reviewers/${id}`, payload);
    return data.reviewer;
}

export async function deleteReviewer(id) {
    await api.delete(`/reviewers/${id}`);
}

export async function toggleReviewerDone(id) {
    const { data } = await api.patch(`/reviewers/${id}/toggle-done`);
    return data.reviewer;
}
