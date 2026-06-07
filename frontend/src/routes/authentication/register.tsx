import { useMutation } from '@tanstack/react-query';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import type { ReactElement } from 'react';
import { useState } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from '@/components/ui/combobox';
import { Input } from '@/components/ui/input';
import api from '@/lib/api/client';
import { getErrorMessage } from '@/lib/api/errors';
import type { ApiResponse } from '@/types/response';

type GenderOption = { value: 'man' | 'woman' | 'other'; label: string };

const GENDER_OPTIONS: GenderOption[] = [
	{ value: 'man', label: 'Man' },
	{ value: 'woman', label: 'Woman' },
	{ value: 'other', label: 'Other' },
];

const registerSchema = z
	.object({
		first_name: z.string().min(1, 'Required'),
		last_name: z.string().min(1, 'Required'),
		email: z.string().email('Invalid email'),
		password: z.string().min(15, 'Must be at least 15 characters'),
		confirm_password: z.string().min(15, 'Must be at least 15 characters'),
		gender: z.enum(['man', 'woman', 'other'], { message: 'Required' }),
	})
	.refine((data) => data.password === data.confirm_password, {
		message: 'Passwords do not match',
		path: ['confirm_password'],
	});

type RegisterPayload = z.infer<typeof registerSchema>;

async function register(payload: RegisterPayload) {
	const response = await api.post<ApiResponse<{ message: string }>>(
		'/authentication/register',
		payload
	);
	return response.data;
}

export const Route = createFileRoute('/authentication/register')({
	component: RouteComponent,
});

function RouteComponent(): ReactElement {
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [selectedGender, setSelectedGender] = useState<GenderOption | null>(null);
	const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof RegisterPayload, string>>>(
		{}
	);

	const mutation = useMutation({
		mutationFn: register,
		meta: { skipGlobalErrorToast: true },
		onSuccess: () => {
			navigate({ to: '/authentication/login' });
		},
	});

	function clearFieldError(field: keyof RegisterPayload) {
		if (fieldErrors[field]) setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
	}

	function handleSubmit() {
		if (mutation.isPending) return;

		const result = registerSchema.safeParse({
			first_name: firstName,
			last_name: lastName,
			email,
			password,
			confirm_password: confirmPassword,
			gender: selectedGender?.value,
		});

		if (!result.success) {
			const errors: Partial<Record<keyof RegisterPayload, string>> = {};
			for (const issue of result.error.issues) {
				const field = issue.path[0] as keyof RegisterPayload;
				if (!errors[field]) errors[field] = issue.message;
			}
			setFieldErrors(errors);
			return;
		}

		setFieldErrors({});
		mutation.mutate(result.data);
	}

	const serverError = mutation.isError ? getErrorMessage(mutation.error) : null;

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Create an account</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="flex flex-col gap-1.5">
							<label htmlFor="firstName" className="text-sm font-medium">
								First name
							</label>
							<Input
								id="firstName"
								type="text"
								placeholder="Jane"
								value={firstName}
								onChange={(e) => {
									setFirstName(e.target.value);
									clearFieldError('first_name');
								}}
								aria-invalid={!!fieldErrors.first_name}
							/>
							{fieldErrors.first_name && (
								<p className="text-xs text-destructive">{fieldErrors.first_name}</p>
							)}
						</div>
						<div className="flex flex-col gap-1.5">
							<label htmlFor="lastName" className="text-sm font-medium">
								Last name
							</label>
							<Input
								id="lastName"
								type="text"
								placeholder="Doe"
								value={lastName}
								onChange={(e) => {
									setLastName(e.target.value);
									clearFieldError('last_name');
								}}
								aria-invalid={!!fieldErrors.last_name}
							/>
							{fieldErrors.last_name && (
								<p className="text-xs text-destructive">{fieldErrors.last_name}</p>
							)}
						</div>
					</div>
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
					<div className="grid grid-cols-2 gap-4">
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
						<div className="flex flex-col gap-1.5">
							<label htmlFor="confirmPassword" className="text-sm font-medium">
								Confirm password
							</label>
							<Input
								id="confirmPassword"
								type="password"
								value={confirmPassword}
								onChange={(e) => {
									setConfirmPassword(e.target.value);
									clearFieldError('confirm_password');
								}}
								aria-invalid={!!fieldErrors.confirm_password}
							/>
							{fieldErrors.confirm_password && (
								<p className="text-xs text-destructive">{fieldErrors.confirm_password}</p>
							)}
						</div>
					</div>
					<div className="flex flex-col gap-1.5">
						<span className="text-sm font-medium">Gender</span>
						<Combobox
							items={GENDER_OPTIONS}
							itemToStringLabel={(option: GenderOption) => option.label}
							onValueChange={(option) => {
								setSelectedGender(option);
								clearFieldError('gender');
							}}
						>
							<ComboboxInput placeholder="Select gender" className="w-full" showClear />
							<ComboboxContent>
								<ComboboxEmpty>No options found.</ComboboxEmpty>
								<ComboboxList>
									{(option) => (
										<ComboboxItem key={option.value} value={option}>
											{option.label}
										</ComboboxItem>
									)}
								</ComboboxList>
							</ComboboxContent>
						</Combobox>
						{fieldErrors.gender && <p className="text-xs text-destructive">{fieldErrors.gender}</p>}
					</div>
					<Button className="w-full" disabled={mutation.isPending} onClick={handleSubmit}>
						Create account
					</Button>
					{serverError && <p className="text-sm text-destructive text-center">{serverError}</p>}
				</CardContent>
				<CardFooter className="justify-center">
					<p className="text-sm text-muted-foreground">
						Already have an account?{' '}
						<Link
							to="/authentication/login"
							className="text-foreground font-medium hover:underline"
						>
							Sign in
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
