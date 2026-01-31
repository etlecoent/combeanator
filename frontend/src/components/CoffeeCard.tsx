import { Coffee as CoffeeIcon } from 'lucide-react';
import type React from 'react';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import type { Coffee } from '@/types/coffee';
import { Button } from './ui/button';

interface CoffeeCardProps {
	coffee: Coffee;
}

export function CoffeeCard({ coffee }: CoffeeCardProps): React.ReactElement {
	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>{coffee.name}</CardTitle>
				<CardDescription>Lorem Ipsum</CardDescription>
				<CardAction className="rounded-full bg-primary/10">
					<CoffeeIcon className="size-6 text-primary" />
				</CardAction>
				<CardContent>Lorem Ipsum</CardContent>
				<CardFooter>
					<Button>Learn More</Button>
				</CardFooter>
			</CardHeader>
		</Card>
	);
}
