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
- **No Unused Brand Color Declarations:** Do not define or use arbitrary `--color-brand-*` variables.

## 2. No External Color Overrides on Shadcn UI Components

- **Inspect Before Styling:** Never override shadcn components (especially `Button`, `Badge`, `Card`, `Input`, `Textarea`, `Dialog`) with external background colors (`bg-*`), text colors (`text-*`), or custom shadows.
- **Rely on Built-in Variants:** Always use the component's internal semantic variants:
  - `<Button variant="default">`, `<Button variant="secondary">`, `<Button variant="outline">`, `<Button variant="ghost">`, etc.
  - `<Badge variant="default">`, `<Badge variant="secondary">`, `<Badge variant="outline">`, etc.

## 3. Tailwind Size Utility

- Whenever `w-*` and `h-*` utilities have the same value, always use `size-*` instead (e.g., `size-6` instead of `w-6 h-6`).
