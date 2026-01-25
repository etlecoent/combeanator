import { createFileRoute } from '@tanstack/react-router';
import type React from 'react';

export const Route = createFileRoute('/about')({
	component: About,
});

function About(): React.ReactElement {
	return <div className="p-2">Hello from About!</div>;
}
