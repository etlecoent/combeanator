import { Link, useNavigate } from '@tanstack/react-router';
import { CircleUser, LogOut } from 'lucide-react';
import type React from 'react';
import { useAuth } from '@/auth';
import { Logo } from '@/components/Logo';
import { NavLink } from '@/components/NavLink';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function NavBar(): React.ReactElement {
	const auth = useAuth();
	const navigate = useNavigate();

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<nav className="container mx-auto flex h-14 items-center px-4" aria-label="Main navigation">
				<Link to="/" className="flex items-center gap-2 mr-6">
					<Logo size={30} className="text-primary" />
					<span className="font-semibold text-foreground">Combeanator</span>
				</Link>

				<div className="flex items-center gap-1">
					<NavLink to="/">Home</NavLink>
					<NavLink to="/coffees">Coffees</NavLink>
					<NavLink to="/about">About</NavLink>
				</div>

				<div className="flex-1" />

				{auth.isAuthenticated ? (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button
								type="button"
								className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							>
								<Avatar>
									<AvatarFallback>
										<CircleUser className="h-5 w-5" />
									</AvatarFallback>
								</Avatar>
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem
								onClick={() => {
									auth.logout();
									navigate({ to: '/' });
								}}
							>
								<LogOut className="h-4 w-4 mr-2" />
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<Link
						to="/authentication/login"
						className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
					>
						Sign in
					</Link>
				)}

				<div className="ml-2">
					<ThemeToggle />
				</div>
			</nav>
		</header>
	);
}
