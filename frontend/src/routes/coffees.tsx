import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import React from 'react';
import z from 'zod';
import { CoffeeCard } from '@/components/CoffeeCard';
import { Pagination } from '@/components/Pagination';
import { SearchBar } from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import api from '@/lib/api';
import type { Coffee } from '@/types/coffee';
import type { ApiResponse, PaginatedApiResponse } from '@/types/response';

type GetCoffeesParams = {
	query?: string;
	page: number;
	size: number;
};
async function getCoffees(params: GetCoffeesParams) {
	const response = await api.get<PaginatedApiResponse<Coffee[]>>('/coffees', { params });
	return response.data;
}

async function createCoffee(payload: { name: string }) {
	const response = await api.post<ApiResponse<Coffee>>('/coffees', payload);
	return response.data;
}

async function deleteCoffee(coffeeId: number) {
	const response = await api.delete<ApiResponse<void>>(`coffees/${coffeeId}`);
	return response.data;
}

const searchParamsSchema = z.object({
	page: z.coerce.number().positive().catch(1),
	size: z.coerce.number().positive().min(10).max(10).catch(10),
	q: z.string().catch(''),
});

export const Route = createFileRoute('/coffees')({
	validateSearch: searchParamsSchema,
	component: Coffees,
});

function Coffees(): React.ReactElement {
	const { q, page, size } = Route.useSearch();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const handleSearch = (query: string) => {
		navigate({
			to: '/coffees',
			search: (prev) => ({ ...prev, page: 1, q: query }),
		});
	};

	const handlePageChange = (newPage: number) => {
		navigate({
			to: '/coffees',
			search: (prev) => ({ ...prev, page: newPage }),
		});
	};

	const [newCofee, setNewCoffee] = React.useState('');

	const query = useQuery({
		queryKey: ['coffees', q, page, size],
		queryFn: () => getCoffees({ query: q, page, size }),
		placeholderData: keepPreviousData,
	});

	const createMutation = useMutation({
		mutationFn: createCoffee,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['coffees'] });
		},
	});

	const deleteMutation = useMutation({
		mutationFn: deleteCoffee,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['coffees'] });
		},
	});

	return (
		<section className="bg-linear-to-b from-muted/50 to-background">
			<div className="container mx-auto px-4">
				<div className="flex gap-2 pt-12">
					<Input
						type="text"
						placeholder="Add a coffee"
						value={newCofee}
						onChange={(e) => setNewCoffee(e.target.value)}
						className="h-10 text-base"
					/>
					<Button onClick={() => createMutation.mutate({ name: newCofee })}>Add Coffee</Button>
				</div>

				<div className="py-12">
					<SearchBar onSearch={handleSearch} initialQuery={q} />
				</div>
				{query.isLoading && (
					<div className="py-12 flex items-center justify-center">
						<Spinner className="size-8" />
					</div>
				)}
				{query.isError && <div className="py-12 text-center text-red-600">Error</div>}
				{query.isSuccess && query.data.data.length === 0 && (
					<div className="py-12 text-center">No coffees found</div>
				)}

				{query.isSuccess && query.data.data.length > 0 && (
					<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{query.data.data.map((coffee) => (
							<li key={coffee.coffee_id} className="flex items-center justify-center">
								<CoffeeCard
									coffee={coffee}
									handleDelete={() => deleteMutation.mutate(coffee.coffee_id)}
								/>
							</li>
						))}
					</ul>
				)}

				<div className="m-5">
					<Pagination
						currentPage={page}
						totalPages={
							query.data?.pagination?.total ? Math.ceil(query.data.pagination.total / size) : 1
						}
						onPageChange={handlePageChange}
					/>
				</div>
			</div>
		</section>
	);
}
