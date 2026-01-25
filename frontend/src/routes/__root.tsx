import { NavBar } from '@/components/layout/NavBar';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const RootLayout = () => (
	<>
		<NavBar />
		<main>
			<Outlet />
		</main>
		<TanStackRouterDevtools />
	</>
);

export const Route = createRootRoute({ component: RootLayout });
