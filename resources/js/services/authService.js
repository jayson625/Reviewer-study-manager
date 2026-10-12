import axios from 'axios';
import api from '../lib/api';

async function ensureCsrfCookie() {
    await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
}

export async function register(payload) {
    await ensureCsrfCookie();
    const { data } = await api.post('/register', payload);
    return data.user;
}

export async function login(payload) {
    await ensureCsrfCookie();
    const { data } = await api.post('/login', payload);
    return data.user;
}

export async function logout() {
    await api.post('/logout');
}

export async function fetchCurrentUser() {
    const { data } = await api.get('/user');
    return data.user;
}
