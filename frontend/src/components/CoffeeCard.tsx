import { ArchiveXIcon } from 'lucide-react';
import type React from 'react';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import type { Coffee } from '@/types/coffee';
import { Button } from './ui/button';

interface CoffeeCardProps {
	coffee: Coffee;
	handleDelete: () => unknown;
}

export function CoffeeCard({ coffee, handleDelete }: CoffeeCardProps): React.ReactElement {
	return (
		<Card className="w-full max-w-sm" size="sm">
			<CardHeader>
				<CardTitle>{coffee.name}</CardTitle>
				<CardDescription>Lorem Ipsum</CardDescription>
				<CardAction>
					<Button variant="ghost" size="sm" onClick={handleDelete}>
						<ArchiveXIcon size-6 />
					</Button>
				</CardAction>
				<CardContent>Lorem Ipsum</CardContent>
				<Button size="sm" className="w-full">
					Learn More
				</Button>
			</CardHeader>
		</Card>
	);
}
