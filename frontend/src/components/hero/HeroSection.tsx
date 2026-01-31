import { useNavigate } from '@tanstack/react-router';
import { Coffee } from 'lucide-react';
import type React from 'react';
import { SearchBar } from './SearchBar.js';

function HeroSection(): React.ReactElement {
	const navigate = useNavigate();
	const handleSearch = (query: string) => {
		navigate({
			to: '/search',
			search: { q: query },
		});
	};

	return (
		<section className="relative py-20 md:py-32 bg-linear-to-b from-muted/50 to-background overflow-hidden">
			{/* Decorative coffee icons */}
			<Coffee className="absolute top-1/10 left-1/20 size-16 text-muted-foreground/10 rotate-12 animate-fall-slower" />
			<Coffee className="absolute bottom-1/4 left-5/20 size-14 text-muted-foreground/10 -rotate-45 animate-fall-fast" />
			<Coffee className="absolute top-1/4 right-5/20 size-20 text-muted-foreground/10 -rotate-12 animate-fall-faster" />
			<Coffee className="absolute bottom-1/10 right-1/20 size-12 text-muted-foreground/10 rotate-45 animate-fall-slow" />

			<div className="container mx-auto px-4 relative z-10">
				<div className="max-w-4xl mx-auto text-center space-y-8">
					<div className="space-y-4">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
							Find Your Perfect Brew
						</h1>
						<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
							Search, compare, and discover coffee beans from multiple roasters in one place.
						</p>
					</div>

					<SearchBar onSearch={handleSearch} />

					<div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
						<span>Try:</span>
						<button
							type="button"
							className="text-primary hover:underline"
							onClick={() => handleSearch('Ethiopian')}
						>
							Ethiopian
						</button>
						<span>•</span>
						<button
							type="button"
							className="text-primary hover:underline"
							onClick={() => handleSearch('light roast')}
						>
							light roast
						</button>
						<span>•</span>
						<button
							type="button"
							className="text-primary hover:underline"
							onClick={() => handleSearch('fruity notes')}
						>
							fruity notes
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}

export { HeroSection };
