import { Footer } from '@/components/Footer';
import { NavBar } from '@/components/NavBar';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

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
