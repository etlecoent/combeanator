import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Footer } from '@/components/Footer';
import { NavBar } from '@/components/NavBar';

const RootLayout = () => (
	<>
		<NavBar />
		<main>
			<Outlet />
		</main>
		<Footer />
		<TanStackRouterDevtools />
	</>
);

export const Route = createRootRoute({ component: RootLayout });
