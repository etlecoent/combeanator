import { NavLink } from '@/components/NavLink';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Link } from '@tanstack/react-router';
import { Coffee } from 'lucide-react';
import type React from 'react';

export function NavBar(): React.ReactElement {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<nav className="container mx-auto flex h-14 items-center px-4" aria-label="Main navigation">
				<Link to="/" className="flex items-center gap-2 mr-6">
					<Coffee className="h-5 w-5 text-primary" aria-hidden="true" />
					<span className="font-semibold text-foreground">Combeanator</span>
				</Link>

				<div className="flex items-center gap-1">
					<NavLink to="/">Home</NavLink>
					<NavLink to="/about">About</NavLink>
				</div>

				<div className="flex-1" />

				<ThemeToggle />
			</nav>
		</header>
	);
}
