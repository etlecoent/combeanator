import { AxiosError } from 'axios';
import type { ApiErrorResponse } from '@/types/response';

export function getErrorMessage(error: unknown, fallback = 'Something went wrong'): string {
	if (error instanceof AxiosError) {
		return (error.response?.data as ApiErrorResponse | undefined)?.error?.message ?? error.message;
	}
	if (error instanceof Error) return error.message;
	return fallback;
}
