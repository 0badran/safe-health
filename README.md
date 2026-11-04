# Safe Health

Safe Health is an integrated healthcare platform designed to connect patients with certified medical specialists and accredited clinics, while providing tools for treatment discovery, consultation booking, and transparent medical cost estimations.

The application is built on a modern frontend stack emphasizing accessibility, performance, internationalization (RTL/LTR), and theme customizability.

---

## Technical Stack

- Framework: Next.js 16 (App Router)
- Runtime: React 19
- Styling: Tailwind CSS v4
- Component Primitives: Radix UI
- UI Architecture: shadcn/ui design system
- Theme Management: next-themes (Light, Dark, and System preference)
- Direction Support: Radix DirectionProvider with full logical utility styling
- Typography: Next.js Google Fonts (Cairo for Arabic, Plus Jakarta Sans for Headings, Inter for Latin Sans)
- Language: TypeScript 5

---

## Core Architecture and Features

### 1. Internationalization and Direction (RTL by Default)

The platform is designed with first-class Right-to-Left (RTL) support for Arabic, combined with dynamic adaptability for Left-to-Right (LTR) languages. All components utilize CSS logical properties (such as start, end, ps, pe, ms, and me) to ensure seamless layout transitions without hardcoded directional dependencies.

### 2. Dual-Mode Design System (OKLCH Tokens)

The user interface leverages native semantic color tokens configured via Tailwind CSS v4 inline themes. The color palette incorporates a medical Deep Teal primary shade and Warm Sand / Honey Gold accent tones. All components automatically adapt between light and dark modes via semantic token variables.

### 3. Accessible Component Primitives

Components are constructed using Radix UI primitives with composable slot patterns (`asChild`), ensuring keyboard navigation, ARIA attributes, and accessible portal behavior for dialogs, dropdowns, and drawers.

### 4. Layout Structure

- Navbar: Sticky header with brand identification, medical specialty dropdown, static multi-language switcher, theme toggle, and responsive mobile navigation sheet.
- Hero Section: Value proposition header, procedure search interface with quick-tag navigation, verified metrics, doctor visual card, and international accreditation indicators.
- Footer: Comprehensive directory covering patient resources, procedure categories, doctor portal links, regulatory compliance notices, and contact channels.

---

## Project Structure

```
clinica-flow/
├── public/
│   ├── images/              # Optimized static photography and assets
│   └── favicon.ico          # Application favicon
├── src/
│   ├── app/
│   │   ├── globals.css      # Design tokens, OKLCH palette, and base layers
│   │   ├── layout.tsx       # Root layout with font definitions, providers, and metadata
│   │   └── page.tsx         # Main landing page entry
│   ├── components/
│   │   ├── home/            # Page-specific sections (Hero, etc.)
│   │   ├── layout/          # Global layout components (Navbar, Footer)
│   │   ├── ui/              # Radix UI and shadcn reusable component library
│   │   ├── mode-toggle.tsx  # Theme mode switcher (Light/Dark/System)
│   │   └── theme-provider.tsx # Client-side theme context wrapper
│   └── lib/
│       └── utils.ts         # Utility helpers (cn class merger)
├── components.json          # shadcn configuration (radix-maia, rtl enabled)
├── package.json             # Project dependencies and script definitions
├── tsconfig.json            # TypeScript compiler configuration
└── README.md                # Project documentation
```

---

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/0badran/safe-health.git
cd safe-health
npm install
```

### Development Server

Run the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Type Checking and Linting

Verify TypeScript types without emitting files:

```bash
npx tsc --noEmit
```

Run static code analysis:

```bash
npm run lint
```

### Production Build

Create an optimized production bundle:

```bash
npm run build
npm run start
```

---

## Development Guidelines

1. Semantic Tokens: Rely exclusively on design tokens (`bg-background`, `bg-card`, `bg-primary`, `text-foreground`, etc.) instead of arbitrary color overrides.
2. Sizing Utilities: Use `size-*` utilities when width and height are equal (e.g., `size-6`).
3. Component Additions: Install new components using the official shadcn CLI:
   ```bash
   npx shadcn@latest add <component-name>
   ```
4. Logical Directions: Avoid physical left/right CSS properties in favor of logical inline start/end equivalents.

---

## License

Private and proprietary. All rights reserved.
