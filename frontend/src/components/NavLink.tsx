import { Link } from '@tanstack/react-router';
import type React from 'react';
import { cn } from '@/lib/utils';

interface NavLinkProps {
	to: string;
	children: React.ReactNode;
}

export function NavLink({ to, children }: NavLinkProps): React.ReactElement {
	return (
		<Link
			to={to}
			className={cn(
				'inline-flex items-center justify-center rounded-md px-3 py-2',
				'text-sm font-medium transition-colors duration-150',
				'text-muted-foreground hover:text-foreground hover:bg-accent/10',
				'[&.active]:bg-primary/10 [&.active]:text-primary [&.active]:font-medium',
				'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
				'disabled:pointer-events-none disabled:opacity-50'
			)}
		>
			{children}
		</Link>
	);
}
