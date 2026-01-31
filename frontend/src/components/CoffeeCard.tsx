import { Coffee as CoffeeIcon } from 'lucide-react';
import type React from 'react';
import type { Coffee } from '@/types/coffee';

interface CoffeeCardProps {
	coffee: Coffee;
}

export function CoffeeCard({ coffee }: CoffeeCardProps): React.ReactElement {
	return (
		<article className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
			<div className="flex items-center gap-4">
				<div className="rounded-full bg-primary/10 p-3">
					<CoffeeIcon className="size-6 text-primary" />
				</div>
				<h3 className="font-semibold text-lg">{coffee.name}</h3>
			</div>
		</article>
	);
}
