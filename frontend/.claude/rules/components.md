# Components (shadcn/ui)

## Installation
```bash
npx shadcn@latest add [component-name]
```

## Available Components
shadcn/ui provides 50+ components. Common ones:

### Button
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

### Card
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

### Form Elements
```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<div>
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>
```

### Dialog
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

## Component Customization
Components use class-variance-authority (CVA) for variant management and can be customized via:
1. **Props**: Pass `className` to override/extend styles
2. **Variants**: Modify in component source (`components/ui/[name].tsx`)
3. **Theme**: Update CSS variables in `index.css`

## Utility Function
```tsx
import { cn } from "@/lib/utils"

// Merge classes with proper precedence
<div className={cn("base-class", conditional && "conditional-class", className)} />
```
