const PALETTE = [
    { bg: '#e7efe3', ink: '#3f6b4a', border: '#b9d2ae' },
    { bg: '#f3e6d8', ink: '#a3781f', border: '#e0c79a' },
    { bg: '#e3ecf0', ink: '#3a5f6e', border: '#b7cfd9' },
    { bg: '#f1e1e6', ink: '#9c3f54', border: '#e1b9c4' },
    { bg: '#eae3f0', ink: '#5f4a8c', border: '#cdb9e1' },
    { bg: '#f0ead8', ink: '#8c6b1f', border: '#ddcd9d' },
];

export default function subjectColor(subject = '') {
    let hash = 0;
    for (let i = 0; i < subject.length; i++) {
        hash = (hash * 31 + subject.charCodeAt(i)) >>> 0;
    }
    return PALETTE[hash % PALETTE.length];
}
