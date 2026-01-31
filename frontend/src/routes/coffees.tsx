import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import type React from 'react';
import z from 'zod';
import { CoffeeCard } from '@/components/CoffeeCard';
import { SearchBar } from '@/components/SearchBar';
import { Spinner } from '@/components/ui/spinner';
import api from '@/lib/api';
import type { Coffee } from '@/types/coffee';

async function getCoffees(query?: string): Promise<Coffee[]> {
	const params = query ? { q: query } : {};

	const response = await api.get<Coffee[]>('/coffees', { params });
	return response.data;
}

const searchParamsSchema = z.object({
	q: z.string().optional().default(''),
});

export const Route = createFileRoute('/coffees')({
	validateSearch: searchParamsSchema,
	component: Coffees,
});

function Coffees(): React.ReactElement {
	const { q } = Route.useSearch();
	const navigate = useNavigate();

	const handleSearch = (query: string) => {
		navigate({
			to: '/coffees',
			search: { q: query },
		});
	};

	const query = useQuery({ queryKey: ['coffees', q], queryFn: () => getCoffees(q) });

	return (
		<section className="bg-linear-to-b from-muted/50 to-background">
			<div className="container mx-auto px-4">
				<div className=" py-12">
					<SearchBar onSearch={handleSearch} initialQuery={q} />
				</div>

				{query.isLoading && (
					<div className="py-12 flex items-center justify-center">
						<Spinner className="size-8" />
					</div>
				)}
				{query.isError && <div className="py-12 text-center text-red-600">Error</div>}

				{query.isSuccess && query.data.length === 0 && (
					<div className="py-12 text-center">No coffees found</div>
				)}
				{query.isSuccess && query.data.length > 0 && (
					<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{query.data.map((coffee) => (
							<li key={coffee.coffee_id} className="flex items-center justify-center">
								<CoffeeCard coffee={coffee} />
							</li>
						))}
					</ul>
				)}
			</div>
		</section>
	);
}
