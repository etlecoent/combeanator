# Animation

## Principles
- **Purposeful**: Animations should enhance UX, not distract
- **Fast**: 150-300ms for most transitions
- **Natural**: Use easing functions (`ease-out` for entrances, `ease-in` for exits)

## Common Patterns
```tsx
// Hover states
<Button className="transition-colors hover:bg-primary/90">

// Fade in/out
<div className="animate-in fade-in-0 duration-300">

// Slide in
<div className="animate-in slide-in-from-bottom-4 duration-300">
```

Available via `tw-animate-css` (imported in `index.css`).
