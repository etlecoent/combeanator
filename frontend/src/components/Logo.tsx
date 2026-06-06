import type React from 'react';

interface LogoProps {
	size?: number;
	className?: string;
}

export function Logo({ size = 24, className }: LogoProps): React.ReactElement {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="60 60 180 180"
			width={size}
			height={size}
			className={className}
			aria-label="Combeanator logo"
			role="img"
		>
			<defs>
				<g id="logo-bean">
					<path
						fill="currentColor"
						d="M 0,-24 C 14,-24 18,-12 14,12 C 11,22 5,26 0,26 C -5,26 -11,22 -14,12 C -18,-12 -14,-24 0,-24 Z"
					/>
					<path
						fill="none"
						stroke="var(--background)"
						strokeWidth="3"
						strokeLinecap="round"
						d="M 0,-20 C -3,-8 3,4 0,20"
					/>
				</g>
			</defs>
			<g transform="translate(150, 150)">
				<use href="#logo-bean" opacity="1.00" transform="rotate(0) translate(0, -65) rotate(35)" />
				<use href="#logo-bean" opacity="0.83" transform="rotate(60) translate(0, -65) rotate(35)" />
				<use
					href="#logo-bean"
					opacity="0.67"
					transform="rotate(120) translate(0, -65) rotate(35)"
				/>
				<use
					href="#logo-bean"
					opacity="0.50"
					transform="rotate(180) translate(0, -65) rotate(35)"
				/>
				<use
					href="#logo-bean"
					opacity="0.67"
					transform="rotate(240) translate(0, -65) rotate(35)"
				/>
				<use
					href="#logo-bean"
					opacity="0.83"
					transform="rotate(300) translate(0, -65) rotate(35)"
				/>
			</g>
		</svg>
	);
}
