import { useMutation } from '@tanstack/react-query';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import type { ReactElement } from 'react';
import { useState } from 'react';
import { z } from 'zod';
import { useAuth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getErrorMessage } from '@/lib/api/errors';

const loginSchema = z.object({
	email: z.string().email('Invalid email'),
	password: z.string().min(1, 'Required'),
});

type LoginPayload = z.infer<typeof loginSchema>;

export const Route = createFileRoute('/authentication/login')({
	component: RouteComponent,
});

function RouteComponent(): ReactElement {
	const navigate = useNavigate();
	const auth = useAuth();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof LoginPayload, string>>>({});

	const mutation = useMutation({
		mutationFn: () => auth.login(email, password),
		meta: { skipGlobalErrorToast: true },
		onSuccess: () => {
			navigate({ to: '/' });
		},
	});

	function clearFieldError(field: keyof LoginPayload) {
		if (fieldErrors[field]) setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
	}

	function handleSubmit() {
		if (mutation.isPending) return;

		const result = loginSchema.safeParse({ email, password });

		if (!result.success) {
			const errors: Partial<Record<keyof LoginPayload, string>> = {};
			for (const issue of result.error.issues) {
				const field = issue.path[0] as keyof LoginPayload;
				if (!errors[field]) errors[field] = issue.message;
			}
			setFieldErrors(errors);
			return;
		}

		setFieldErrors({});
		mutation.mutate();
	}

	const serverError = mutation.isError ? getErrorMessage(mutation.error) : null;

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Sign in</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<div className="flex flex-col gap-1.5">
						<label htmlFor="email" className="text-sm font-medium">
							Email
						</label>
						<Input
							id="email"
							type="email"
							placeholder="jane@example.com"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
								clearFieldError('email');
							}}
							aria-invalid={!!fieldErrors.email}
						/>
						{fieldErrors.email && <p className="text-xs text-destructive">{fieldErrors.email}</p>}
					</div>
					<div className="flex flex-col gap-1.5">
						<label htmlFor="password" className="text-sm font-medium">
							Password
						</label>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
								clearFieldError('password');
							}}
							aria-invalid={!!fieldErrors.password}
						/>
						{fieldErrors.password && (
							<p className="text-xs text-destructive">{fieldErrors.password}</p>
						)}
					</div>
					<Button className="w-full" disabled={mutation.isPending} onClick={handleSubmit}>
						Sign in
					</Button>
					{serverError && <p className="text-sm text-destructive text-center">{serverError}</p>}
				</CardContent>
				<CardFooter className="justify-center">
					<p className="text-sm text-muted-foreground">
						Don't have an account?{' '}
						<Link
							to="/authentication/register"
							className="text-foreground font-medium hover:underline"
						>
							Create an account
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
