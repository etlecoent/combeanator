import axios from 'axios';

import ENV from '@/config';

const api = axios.create({
	baseURL: ENV.VITE_API_URL,
	timeout: 1000,
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

export default api;
