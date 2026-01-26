import { Search } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
	onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps): React.ReactElement {
	const [query, setQuery] = useState('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSearch(query);
	};

	return (
		<form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
			<div className="flex gap-2">
				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Search beans by name, origin, roast, or flavor..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						className="h-10 pl-10 text-base"
					/>
				</div>
				<Button type="submit" size="lg">
					Search
				</Button>
			</div>
		</form>
	);
}

export { SearchBar };
