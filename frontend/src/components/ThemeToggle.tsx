import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => {
		const effectiveTheme =
			theme === 'system'
				? window.matchMedia('(prefers-color-scheme: dark)').matches
					? 'dark'
					: 'light'
				: theme;

		setTheme(effectiveTheme === 'dark' ? 'light' : 'dark');
	};

	const isDark =
		theme === 'dark' ||
		(theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

	return (
		<Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
			<Sun
				className="rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0"
				aria-hidden="true"
			/>
			<Moon
				className="absolute rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100"
				aria-hidden="true"
			/>
			<span className="sr-only">Toggle theme (current: {isDark ? 'dark' : 'light'})</span>
		</Button>
	);
}
