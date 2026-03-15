import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/coffees/$coffeeId')({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/coffees/$coffeeId"!</div>;
}
