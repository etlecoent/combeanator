import { createContext, type ReactNode, useContext, useState } from 'react';
import api from '@/lib/api';
import type { ApiResponse } from '@/types/response';

export type AuthState = {
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));

	async function login(email: string, password: string) {
		const response = await api.post<ApiResponse<{ token: string }>>('/authentication/login', {
			email,
			password,
		});
		const { token } = response.data.data;
		localStorage.setItem('token', token);
		setIsAuthenticated(true);
	}

	function logout() {
		localStorage.removeItem('token');
		setIsAuthenticated(false);
	}

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used within AuthProvider');
	return ctx;
}
