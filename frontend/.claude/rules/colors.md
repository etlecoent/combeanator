# Colors

## Token-Based System
Colors use OKLCH format for perceptual uniformity and consistent lightness across hues. The system provides semantic tokens that automatically adapt to light/dark modes.

## Light Mode Colors

| Token | Value | Usage |
|-------|-------|-------|
| `background` | Off-white cream | Page backgrounds |
| `foreground` | Deep espresso | Primary text |
| `card` | Warm white | Card backgrounds |
| `primary` | Rich espresso brown | Brand actions, headers |
| `secondary` | Warm tan | Supporting elements |
| `accent` | Amber/caramel | Highlights, CTAs |
| `muted` | Light cream | Subtle backgrounds |
| `destructive` | Warm red-brown | Error states, deletions |

## Dark Mode Colors

| Token | Value | Usage |
|-------|-------|-------|
| `background` | Deep roast brown | Page backgrounds |
| `foreground` | Cream | Primary text |
| `card` | Medium roast | Card backgrounds |
| `primary` | Cream | Brand actions (inverted) |
| `secondary` | Mocha | Supporting elements |
| `accent` | Golden amber | Highlights, CTAs |
| `muted` | Dark mocha | Subtle backgrounds |
| `destructive` | Coral | Error states (softer) |

## Chart Colors
Warm palette for data visualization:
- `chart-1`: Deep espresso brown
- `chart-2`: Caramel amber
- `chart-3`: Cream
- `chart-4`: Golden honey
- `chart-5`: Mocha

## Color Guidelines
- **Hue Range**: 25-45° (warm oranges/browns)
- **Contrast**: Maintain WCAG 2.1 AA minimum (4.5:1 for text, 3:1 for UI)
- **Saturation**: Moderate (0.05-0.15 chroma) for backgrounds, higher (0.15-0.25) for accents
- **Usage**: Use semantic tokens (`primary`, `accent`) not raw colors
