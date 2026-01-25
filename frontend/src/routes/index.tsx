import { Button } from '@/components/ui/button';
import { createFileRoute } from '@tanstack/react-router';
import type React from 'react';

export const Route = createFileRoute('/')({
	component: Index,
});

function Index(): React.ReactElement {
	return (
		<div className="container mx-auto p-8 max-w-4xl">
			<div className="space-y-8">
				<div>
					<h1 className="text-4xl font-bold text-foreground mb-2">Combeanator</h1>
					<p className="text-lg text-muted-foreground">
						Coffee-inspired productivity, warm and inviting
					</p>
				</div>

				<div className="bg-card border border-border rounded-lg p-6 space-y-6">
					<div>
						<h2 className="text-2xl font-semibold text-foreground mb-4">Button Variants</h2>
						<div className="flex flex-wrap gap-4">
							<Button variant="default">Default (Espresso)</Button>
							<Button variant="secondary">Secondary (Tan)</Button>
							<Button variant="outline">Outline</Button>
							<Button variant="ghost">Ghost</Button>
							<Button variant="destructive">Destructive</Button>
						</div>
					</div>

					<div>
						<h3 className="text-xl font-semibold text-foreground mb-3">Button Sizes</h3>
						<div className="flex flex-wrap items-center gap-4">
							<Button size="sm">Small</Button>
							<Button size="default">Default</Button>
							<Button size="lg">Large</Button>
						</div>
					</div>

					<div>
						<h3 className="text-xl font-semibold text-foreground mb-3">Disabled States</h3>
						<div className="flex flex-wrap gap-4">
							<Button disabled>Disabled Default</Button>
							<Button variant="secondary" disabled>
								Disabled Secondary
							</Button>
							<Button variant="outline" disabled>
								Disabled Outline
							</Button>
							<Button variant="destructive" disabled>
								Disabled Destructive
							</Button>
						</div>
					</div>
				</div>

				<div className="grid md:grid-cols-2 gap-6">
					<div className="bg-muted rounded-lg p-6">
						<h3 className="text-lg font-semibold mb-2">Light Mode</h3>
						<p className="text-sm text-muted-foreground">
							Warm cream backgrounds with rich espresso accents create an inviting, coffee-shop atmosphere.
						</p>
					</div>
					<div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
						<h3 className="text-lg font-semibold mb-2">Accent Colors</h3>
						<p className="text-sm text-muted-foreground">
							Amber and caramel highlights bring energy and warmth to calls-to-action.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
