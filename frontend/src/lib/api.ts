import axios from 'axios';

import ENV from '@/config';

const api = axios.create({
	baseURL: ENV.VITE_API_URL,
	timeout: 1000,
});

export default api;
