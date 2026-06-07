export type ApiResponse<T> = {
	success: boolean;
	data: T;
};

export type ApiErrorResponse = {
	success: false;
	error: { message: string; code?: string };
};

export type Pagination = {
	page: number;
	total: number;
	size: number;
};

export type PaginatedApiResponse<T> = ApiResponse<T> & {
	pagination: Pagination;
};
