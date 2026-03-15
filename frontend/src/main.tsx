import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider, useAuth } from './auth';
// Generated tree routes
import { routeTree } from './routeTree.gen';

// Create a new router instance
// biome-ignore lint/style/noNonNullAssertion: context is provided at runtime via RouterProvider
const router = createRouter({ routeTree, context: { auth: undefined! } });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

// Create a query client
const queryClient = new QueryClient();

function InnerApp() {
	const auth = useAuth();
	return <RouterProvider router={router} context={{ auth }} />;
}

// Render the app
const rootElement = document.getElementById('root');
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<InnerApp />
				</AuthProvider>
			</QueryClientProvider>
		</StrictMode>
	);
}
