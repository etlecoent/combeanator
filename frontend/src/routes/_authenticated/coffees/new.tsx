import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import type { ReactElement } from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from '@/components/ui/combobox';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import api from '@/lib/api';
import type { Coffee } from '@/types/coffee';
import type { ApiResponse } from '@/types/response';
import type { Roaster } from '@/types/roaster';

export const Route = createFileRoute('/_authenticated/coffees/new')({
	component: RouteComponent,
});

async function getRoasters() {
	const response = await api.get<ApiResponse<Roaster[]>>('/roasters');
	return response.data.data;
}

async function createCoffee(payload: { name: string; roaster_id: number }) {
	const response = await api.post<ApiResponse<Coffee>>('/coffees', payload);
	return response.data;
}

function RouteComponent(): ReactElement {
	const navigate = useNavigate();

	const query = useQuery({
		queryKey: ['roasters'],
		queryFn: getRoasters,
	});

	const createMutation = useMutation({
		mutationFn: createCoffee,

		onSuccess: async ({ data }) => {
			navigate({
				to: `/coffees/${data.coffee_id}`,
			});
		},
	});

	const [newCofee, setNewCoffee] = useState('');
	const [selectedRoaster, setSelectedRoaster] = useState<Roaster | null>(null);

	return (
		<section className="bg-linear-to-b from-muted/50 to-background min-h-screen py-12">
			<div className="container mx-auto px-4 max-w-lg">
				<div className="flex flex-col gap-4">
					<Input
						type="text"
						placeholder="Coffee Name"
						value={newCofee}
						onChange={(e) => setNewCoffee(e.target.value)}
						className="h-10 text-base"
					/>
					<Combobox
						items={query.data || []}
						itemToStringLabel={(roaster: Roaster) => roaster.name}
						onValueChange={setSelectedRoaster}
					>
						<ComboboxInput placeholder="Select a roaster" className="w-full" showClear />
						<ComboboxContent>
							<ComboboxEmpty>No Roasters found.</ComboboxEmpty>
							<ComboboxList>
								{(roaster) => (
									<ComboboxItem key={roaster.roaster_id} value={roaster}>
										{roaster.name}
									</ComboboxItem>
								)}
							</ComboboxList>
						</ComboboxContent>
					</Combobox>
					<Button
						className="w-full"
						disabled={!(newCofee && selectedRoaster)}
						onClick={() => {
							if (newCofee && selectedRoaster) {
								return createMutation.mutate({
									name: newCofee,
									roaster_id: selectedRoaster.roaster_id,
								});
							}
						}}
					>
						Add Coffee
					</Button>

					{createMutation.isPending && (
						<div className="py-12 flex items-center justify-center">
							<Spinner className="size-8" />
						</div>
					)}

					{createMutation.isError && (
						<div className="py-12 text-center text-red-600">{createMutation.error.message}</div>
					)}
				</div>
			</div>
		</section>
	);
}
