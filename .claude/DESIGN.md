# Design System

This file documents the design system for Combeanator - a coffee-inspired productivity application.

## Design Principles

### Brand Identity: Coffee Culture
The visual language draws from coffee culture - warm, inviting, energizing, and focused. Colors evoke espresso, cream, caramel, and the cozy atmosphere of a coffee shop.

### Core Values
- **Warmth**: Welcoming and approachable through warm color tones
- **Focus**: Clean, uncluttered interfaces that aid concentration
- **Energy**: Vibrant accents that inspire action
- **Craftsmanship**: Attention to detail in spacing, typography, and interactions

## Color Palette

### Token-Based System
Colors use OKLCH format for perceptual uniformity and consistent lightness across hues. The system provides semantic tokens that automatically adapt to light/dark modes.

### Light Mode Colors

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

### Dark Mode Colors

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

### Chart Colors
Warm palette for data visualization:
- `chart-1`: Deep espresso brown
- `chart-2`: Caramel amber
- `chart-3`: Cream
- `chart-4`: Golden honey
- `chart-5`: Mocha

### Color Guidelines
- **Hue Range**: 25-45° (warm oranges/browns)
- **Contrast**: Maintain WCAG 2.1 AA minimum (4.5:1 for text, 3:1 for UI)
- **Saturation**: Moderate (0.05-0.15 chroma) for backgrounds, higher (0.15-0.25) for accents
- **Usage**: Use semantic tokens (`primary`, `accent`) not raw colors

## Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```
System fonts provide optimal performance and native feel across platforms.

### Type Scale
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

### Typography Guidelines
- **Body Text**: `text-base` with `text-foreground`
- **Headings**: `font-semibold` or `font-bold`, use semantic HTML (`h1-h6`)
- **Secondary Text**: `text-sm text-muted-foreground`
- **Line Length**: Max 65-75 characters for readability (use `max-w-prose`)

## Spacing

### Base Unit: 4px
Tailwind uses a 4px spacing scale. Common values:

| Token | Size | Usage |
|-------|------|-------|
| `space-1` | 0.25rem (4px) | Tight spacing |
| `space-2` | 0.5rem (8px) | Compact layouts |
| `space-3` | 0.75rem (12px) | Small gaps |
| `space-4` | 1rem (16px) | Default spacing |
| `space-6` | 1.5rem (24px) | Comfortable spacing |
| `space-8` | 2rem (32px) | Section spacing |
| `space-12` | 3rem (48px) | Large sections |
| `space-16` | 4rem (64px) | Page sections |

### Spacing Guidelines
- **Component Padding**: `p-4` or `p-6` for cards/containers
- **Stack Spacing**: `space-y-4` for vertical rhythm
- **Grid Gaps**: `gap-4` or `gap-6` for layouts
- **Section Spacing**: `mt-8` or `mt-12` between major sections

## Components (shadcn/ui)

### Installation
```bash
npx shadcn@latest add [component-name]
```

### Available Components
shadcn/ui provides 50+ components. Common ones:

#### Button
```tsx
import { Button } from "@/components/ui/button"

<Button variant="default">Primary Action</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
```

**Variants**:
- `default`: Primary action (espresso brown bg)
- `secondary`: Supporting actions (warm tan)
- `outline`: Bordered, transparent
- `ghost`: No background, hover only
- `destructive`: Destructive actions (warm red)
- `link`: Text link style

**Sizes**: `default`, `sm`, `lg`, `icon`

#### Card
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Heading</CardTitle>
    <CardDescription>Supporting text</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

#### Form Elements
```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<div>
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>
```

#### Dialog
```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Modal Title</DialogTitle>
      <DialogDescription>Description text</DialogDescription>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

### Component Customization
Components use class-variance-authority (CVA) for variant management and can be customized via:
1. **Props**: Pass `className` to override/extend styles
2. **Variants**: Modify in component source (`components/ui/[name].tsx`)
3. **Theme**: Update CSS variables in `index.css`

### Utility Function
```tsx
import { cn } from "@/lib/utils"

// Merge classes with proper precedence
<div className={cn("base-class", conditional && "conditional-class", className)} />
```

## Layout Patterns

### Responsive Breakpoints
Mobile-first approach using Tailwind breakpoints:

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| `sm` | 640px | Small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols */}
</div>
```

### Common Layouts

#### Container
```tsx
<div className="container mx-auto px-4 py-8 max-w-7xl">
  {/* Centered, responsive padding */}
</div>
```

#### Centered Card
```tsx
<div className="min-h-screen flex items-center justify-center p-4">
  <Card className="w-full max-w-md">
    {/* Centered card, max 448px wide */}
  </Card>
</div>
```

#### Two-Column Layout
```tsx
<div className="grid md:grid-cols-[240px_1fr] gap-6">
  <aside>{/* Sidebar */}</aside>
  <main>{/* Main content */}</main>
</div>
```

## Accessibility

### Standards
Target **WCAG 2.1 Level AA** compliance:
- Color contrast: 4.5:1 for text, 3:1 for UI components
- Keyboard navigation: All interactive elements accessible via keyboard
- Screen readers: Semantic HTML, ARIA labels where needed
- Focus indicators: Visible focus states on all focusable elements

### Best Practices
- **Semantic HTML**: Use `button`, `nav`, `main`, `article` appropriately
- **Alt Text**: Descriptive alt text for images
- **Labels**: Associate labels with form inputs
- **Focus Management**: Trap focus in modals, restore on close
- **ARIA**: Use sparingly, prefer native semantics

### Testing Tools
- Chrome DevTools Lighthouse (Accessibility audit)
- axe DevTools extension
- Keyboard-only navigation testing
- Screen reader testing (NVDA, VoiceOver)

## Animation

### Principles
- **Purposeful**: Animations should enhance UX, not distract
- **Fast**: 150-300ms for most transitions
- **Natural**: Use easing functions (`ease-out` for entrances, `ease-in` for exits)

### Common Patterns
```tsx
// Hover states
<Button className="transition-colors hover:bg-primary/90">

// Fade in/out
<div className="animate-in fade-in-0 duration-300">

// Slide in
<div className="animate-in slide-in-from-bottom-4 duration-300">
```

Available via `tw-animate-css` (imported in `index.css`).

## Icons

### Lucide React
Installed and ready to use:

```tsx
import { Coffee, Check, X, ChevronDown } from "lucide-react"

<Coffee className="h-5 w-5 text-muted-foreground" />
```

**Guidelines**:
- Standard size: `h-5 w-5` (20px) for inline icons
- Button icons: `h-4 w-4` (16px)
- Large icons: `h-6 w-6` (24px) or larger
- Always set both height and width for consistency

## Development Workflow

### Component Development
1. Install from shadcn: `npx shadcn@latest add [component]`
2. Import and use in your feature
3. Customize via `className` or edit source in `components/ui/`
4. Use semantic color tokens, not hardcoded colors

### Style Composition
```tsx
// ✅ Good: Semantic tokens, cn() for conditional styles
<div className={cn(
  "rounded-lg border bg-card p-6",
  isActive && "ring-2 ring-primary"
)} />

// ❌ Bad: Hardcoded colors, no composition
<div className="rounded-lg border bg-white p-6" style={{borderColor: '#333'}} />
```

### Color Usage
```tsx
// ✅ Good: Use semantic tokens
<h1 className="text-foreground">Title</h1>
<p className="text-muted-foreground">Subtitle</p>
<Button variant="default">Action</Button>

// ❌ Bad: Hardcoded colors
<h1 className="text-gray-900">Title</h1>
<p className="text-gray-500">Subtitle</p>
<Button className="bg-brown-600">Action</Button>
```

## Resources

- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com
- **Lucide Icons**: https://lucide.dev
- **OKLCH Color Picker**: https://oklch.com
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
