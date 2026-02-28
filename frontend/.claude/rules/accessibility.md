# Accessibility

## Standards
Target **WCAG 2.1 Level AA** compliance:
- Color contrast: 4.5:1 for text, 3:1 for UI components
- Keyboard navigation: All interactive elements accessible via keyboard
- Screen readers: Semantic HTML, ARIA labels where needed
- Focus indicators: Visible focus states on all focusable elements

## Best Practices
- **Semantic HTML**: Use `button`, `nav`, `main`, `article` appropriately
- **Alt Text**: Descriptive alt text for images
- **Labels**: Associate labels with form inputs
- **Focus Management**: Trap focus in modals, restore on close
- **ARIA**: Use sparingly, prefer native semantics

## Testing Tools
- Chrome DevTools Lighthouse (Accessibility audit)
- axe DevTools extension
- Keyboard-only navigation testing
- Screen reader testing (NVDA, VoiceOver)
