import { ThemeToggle } from '@/components/ThemeToggle';
import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const RootLayout = () => (
	<>
		<div className="p-2 flex gap-2 items-center">
			<Link to="/" className="[&.active]:font-bold">
				Home
			</Link>{' '}
			<Link to="/about" className="[&.active]:font-bold">
				About
			</Link>
			<div className="ml-auto">
				<ThemeToggle />
			</div>
		</div>
		<hr />
		<Outlet />
		<TanStackRouterDevtools />
	</>
);

export const Route = createRootRoute({ component: RootLayout });
