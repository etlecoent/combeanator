import { createFileRoute } from '@tanstack/react-router';
import type React from 'react';
import { HeroSection } from '@/components/hero/HeroSection';

export const Route = createFileRoute('/')({
	component: Index,
});

function Index(): React.ReactElement {
	return <HeroSection />;
}
