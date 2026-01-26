import { HeroSection } from '@/components/hero/HeroSection';
import { createFileRoute } from '@tanstack/react-router';
import type React from 'react';

export const Route = createFileRoute('/')({
	component: Index,
});

function Index(): React.ReactElement {
	return <HeroSection />;
}
