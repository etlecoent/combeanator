import { Link } from '@tanstack/react-router';
import { Coffee } from 'lucide-react';
import type React from 'react';

export function Footer(): React.ReactElement {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-t border-border/40 bg-muted/30 mt-auto">
			<div className="container mx-auto px-4 py-6">
				<div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<Coffee className="h-4 w-4 text-primary" aria-hidden="true" />
						<span>© {currentYear} Combeanator. Brewing productivity.</span>
					</div>

					<nav className="flex items-center gap-4 text-sm" aria-label="Footer navigation">
						<Link
							to="/about"
							className="text-muted-foreground transition-colors hover:text-foreground"
						>
							About
						</Link>
					</nav>
				</div>
			</div>
		</footer>
	);
}
