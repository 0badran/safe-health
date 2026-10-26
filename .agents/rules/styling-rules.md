---
trigger: always_on
---

# Strict Styling & Semantic Color Rules

## 1. Strictly Rely on Semantic Color Variables

- **No Hardcoded Palette Colors:** NEVER use arbitrary palette utilities like `amber-*`, `slate-*`, `emerald-*`, `sky-*`, `zinc-*`, `gray-*`, etc.
- **Always Use Semantic Theme Tokens:**
  - `primary` / `primary-foreground`
  - `secondary` / `secondary-foreground`
  - `accent` / `accent-foreground`
  - `muted` / `muted-foreground`
  - `background` / `foreground`
  - `border`, `input`, `ring`
  - `card` / `card-foreground`
  - `popover` / `popover-foreground`
  - `destructive` / `destructive-foreground`

## 2. No External Color Overrides on Shadcn UI Components

- **Inspect Before Styling:** Never override shadcn components (especially `Button`, `Badge`, `Card`, `Input`, `Textarea`, `Dialog`) with external background colors (`bg-*`), text colors (`text-*`), or custom shadows.
- **Rely on Built-in Variants:** Always use the component's internal semantic variants:
  - `<Button variant="default">`, `<Button variant="secondary">`, `<Button variant="outline">`, `<Button variant="ghost">`, etc.
  - `<Badge variant="default">`, `<Badge variant="secondary">`, `<Badge variant="outline">`, etc.

## 3. Tailwind Size Utility

- Whenever `w-*` and `h-*` utilities have the same value, always use `size-*` instead (e.g., `size-6` instead of `w-6 h-6`).

## 4. Typography & Text Size Utilities

- **Fluid Heading Utilities (`h1` to `h6`):** Always use the project's fluid typography utilities (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`) defined in `globals.css` rather than arbitrary Tailwind size utilities (`text-3xl`, `text-xl`, etc.).
- **Sizes Smaller than 16px (`small`):** For any text sizes smaller than 16px, strictly use the `small` utility (e.g., `small` instead of `text-xs` or `text-sm`).
- **Gradient Headings (`text-heading`):** Use the `text-heading` utility for primary section titles that use the gradient styling and heading font.
