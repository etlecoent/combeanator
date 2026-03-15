import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { AuthState } from '@/auth';
import { Footer } from '@/components/Footer';
import { NavBar } from '@/components/NavBar';

type RouterContext = {
	auth: AuthState;
};

const RootLayout = () => (
	<>
		<div className="min-h-screen flex flex-col">
			<NavBar />
			<main className="flex-1">
				<Outlet />
			</main>

			<TanStackRouterDevtools />
		</div>
		<Footer />
	</>
);

export const Route = createRootRouteWithContext<RouterContext>()({ component: RootLayout });
