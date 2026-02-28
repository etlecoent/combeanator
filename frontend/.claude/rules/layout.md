# Layout Patterns

## Responsive Breakpoints
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

## Common Layouts

### Container
```tsx
<div className="container mx-auto px-4 py-8 max-w-7xl">
  {/* Centered, responsive padding */}
</div>
```

### Centered Card
```tsx
<div className="min-h-screen flex items-center justify-center p-4">
  <Card className="w-full max-w-md">
    {/* Centered card, max 448px wide */}
  </Card>
</div>
```

### Two-Column Layout
```tsx
<div className="grid md:grid-cols-[240px_1fr] gap-6">
  <aside>{/* Sidebar */}</aside>
  <main>{/* Main content */}</main>
</div>
```
