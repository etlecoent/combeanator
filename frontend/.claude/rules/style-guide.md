# Style Guide

## Component Development
1. Install from shadcn: `npx shadcn@latest add [component]`
2. Import and use in your feature
3. Customize via `className` or edit source in `components/ui/`
4. Use semantic color tokens, not hardcoded colors

## Style Composition
```tsx
// ✅ Good: Semantic tokens, cn() for conditional styles
<div className={cn(
  "rounded-lg border bg-card p-6",
  isActive && "ring-2 ring-primary"
)} />

// ❌ Bad: Hardcoded colors, no composition
<div className="rounded-lg border bg-white p-6" style={{borderColor: '#333'}} />
```

## Color Usage
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
