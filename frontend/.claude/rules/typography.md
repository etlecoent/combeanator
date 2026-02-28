# Typography

## Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```
System fonts provide optimal performance and native feel across platforms.

## Type Scale
Based on Tailwind's default scale (rem units, 16px base):

| Class | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-xs` | 0.75rem (12px) | 1rem | Small labels, captions |
| `text-sm` | 0.875rem (14px) | 1.25rem | Body small, secondary text |
| `text-base` | 1rem (16px) | 1.5rem | Body text (default) |
| `text-lg` | 1.125rem (18px) | 1.75rem | Emphasized text |
| `text-xl` | 1.25rem (20px) | 1.75rem | H4 headings |
| `text-2xl` | 1.5rem (24px) | 2rem | H3 headings |
| `text-3xl` | 1.875rem (30px) | 2.25rem | H2 headings |
| `text-4xl` | 2.25rem (36px) | 2.5rem | H1 headings |

## Typography Guidelines
- **Body Text**: `text-base` with `text-foreground`
- **Headings**: `font-semibold` or `font-bold`, use semantic HTML (`h1-h6`)
- **Secondary Text**: `text-sm text-muted-foreground`
- **Line Length**: Max 65-75 characters for readability (use `max-w-prose`)
