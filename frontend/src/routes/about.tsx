import { createFileRoute } from '@tanstack/react-router';
import { Coffee, GitCompare, Search, Sparkles } from 'lucide-react';
import type React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.js';

export const Route = createFileRoute('/about')({
	component: About,
});

const HOW_WE_HELP = [
	{
		icon: Search,
		title: 'Search',
		description:
			'Browse beans from dozens of roasters in one place — no more hunting across a dozen browser tabs just to find your next bag.',
	},
	{
		icon: GitCompare,
		title: 'Compare',
		description:
			'See origin, roast level, and tasting notes side by side so the right bean rises to the top, naturally.',
	},
	{
		icon: Sparkles,
		title: 'Discover',
		description:
			'Surface brews that match what you love. The more you explore, the better the suggestions get.',
	},
] as const;

function About(): React.ReactElement {
	return (
		<>
			{/* Hero — The Story */}
			<section className="relative py-20 md:py-32 bg-linear-to-b from-muted/50 to-background overflow-hidden">
				{/* Decorative coffee icons */}
				<Coffee
					className="absolute top-1/10 left-1/20 size-16 text-muted-foreground/10 rotate-12 animate-fall-slower"
					aria-hidden="true"
				/>
				<Coffee
					className="absolute bottom-1/4 left-5/20 size-14 text-muted-foreground/10 -rotate-45 animate-fall-fast"
					aria-hidden="true"
				/>
				<Coffee
					className="absolute top-1/4 right-5/20 size-20 text-muted-foreground/10 -rotate-12 animate-fall-faster"
					aria-hidden="true"
				/>
				<Coffee
					className="absolute bottom-1/10 right-1/20 size-12 text-muted-foreground/10 rotate-45 animate-fall-slow"
					aria-hidden="true"
				/>

				<div className="container mx-auto px-4 relative z-10">
					<div className="max-w-4xl mx-auto text-center space-y-8">
						<div className="space-y-4">
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
								The Hunt for the Perfect Brew
							</h1>
							<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
								Every great cup starts with the right bean — but finding it shouldn't feel like a
								second job.
							</p>
						</div>

						<div className="max-w-prose mx-auto text-left space-y-6 text-muted-foreground text-base md:text-lg">
							<p>
								If you've ever spent an afternoon clicking through roaster after roaster — each with
								its own format, its own jargon, its own definition of "medium roast" — you know the
								feeling. You just want a bean with bright citrus notes and a clean finish. Instead
								you get twelve browser tabs, three conflicting descriptions, and decision fatigue
								before your first sip.
							</p>
							<p>
								The specialty coffee world is rich and growing fast. New roasters launch every
								month, incredible single-origins come and go with the harvest, and somewhere out
								there is a bag that's exactly what you're looking for. But the information is
								scattered, inconsistent, and frankly a bit of a grind to navigate.
							</p>
							<p>
								So we built Combeanator. One place to search, compare, and discover coffee beans
								across the roasters you love — and the ones you haven't tried yet. Because the
								coffee is worth the effort. Finding it shouldn't be.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* How Combeanator Helps */}
			<section className="py-16 md:py-24 bg-background">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto space-y-12">
						<div className="text-center space-y-3">
							<h2 className="text-3xl md:text-4xl font-bold text-foreground">
								How Combeanator Helps
							</h2>
							<p className="text-muted-foreground text-lg max-w-xl mx-auto">
								Search, compare, and discover — without the tab chaos.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{HOW_WE_HELP.map(({ icon: Icon, title, description }) => (
								<Card key={title} className="text-center">
									<CardHeader className="items-center pb-2">
										<div className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10">
											<Icon className="size-6 text-primary" aria-hidden="true" />
										</div>
										<CardTitle>{title}</CardTitle>
									</CardHeader>
									<CardContent>
										<CardDescription className="text-sm leading-relaxed">
											{description}
										</CardDescription>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
