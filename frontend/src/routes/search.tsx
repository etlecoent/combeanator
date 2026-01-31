import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import type React from 'react';
import z from 'zod';
import { CoffeeCard } from '@/components/CoffeeCard';
import { SearchBar } from '@/components/hero/SearchBar';
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

export const Route = createFileRoute('/search')({
	validateSearch: searchParamsSchema,
	component: Search,
});

function Search(): React.ReactElement {
	const { q } = Route.useSearch();
	const navigate = useNavigate();

	const handleSearch = (query: string) => {
		navigate({
			to: '/search',
			search: { q: query },
		});
	};

	const query = useQuery({ queryKey: ['coffees', q], queryFn: () => getCoffees(q) });

	return (
		<section>
			<SearchBar onSearch={handleSearch} initialQuery={q} />
			<div>
				<ul>
					{query.data?.map((coffee) => (
						<CoffeeCard key={coffee.coffee_id} coffee={coffee} />
					))}
				</ul>
			</div>
		</section>
	);
}
