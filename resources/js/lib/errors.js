export function extractErrorMessage(error, fallback = 'Something went wrong. Please try again.') {
    const response = error?.response;

    if (!response) {
        return 'Unable to reach the server. Check your connection and try again.';
    }

    if (response.status === 422 && response.data?.errors) {
        return Object.values(response.data.errors).flat().join(' ');
    }

    if (response.data?.message) {
        return response.data.message;
    }

    return fallback;
}

export function extractFieldErrors(error) {
    const errors = error?.response?.data?.errors;
    if (!errors) return {};

    return Object.fromEntries(
        Object.entries(errors).map(([field, messages]) => [field, messages[0]]),
    );
}
