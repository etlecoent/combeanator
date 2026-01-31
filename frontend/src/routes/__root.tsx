import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Footer } from '@/components/Footer';
import { NavBar } from '@/components/NavBar';

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

export const Route = createRootRoute({ component: RootLayout });
