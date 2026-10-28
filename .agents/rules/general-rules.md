# Project Rules & Guidelines

## 1. Scope & Automatic Cleanup Boundary

- **Global Rules Scope:** Global project rules (e.g., removing translation fallbacks, enforcing `size-*` in Tailwind, eliminating mock data) automatically apply **ONLY to code and files touched or modified during the current task (Touched Files)**.
- **No Unintended Modifications:** Do not modify, refactor, cleanup, or restyle untouched files or code outside the scope of the current task just to enforce a global rule.
- **Out-of-Scope Reporting:** If an issue or improvement is noticed outside the task scope, mention it in text only without editing the code.

## 2. API Data & State Handling

- **Real API Data Only:** When integrating APIs, use real API data only—never create or add mock, fake, dummy, or static fallback data.
- **Safe State Handling:** Properly handle real API responses with dedicated loading, empty, and error states using safe property access (e.g., `?.`) and dedicated UI components to prevent UI crashes without introducing fake fallback data.

## 3. Internationalization (i18n & Translations)

- **Strict Keys Only:** Always pass keys only to translation functions (e.g., `t('key')`). Never pass inline fallback or default values (e.g., `t('key', 'fallback')`).
- **Automatic Fallback Removal:** Strip out and remove any default/fallback values in translation functions across the code touched or refactored during the task.
- **Key Reuse:** Before adding any new translation key, search existing translation files (e.g., `ar.json`, `en.json`) to reuse existing keys and prevent duplicate keys or file bloat.
- **Unified Display Fields:** When displaying data from the API (in tables, cards, badges, details, lists, views), **ALWAYS use the standard unified field name without language suffixes** (e.g., `item.name`, `item.title`, `item.description`). The backend automatically handles translation based on the `Accept-Language` header.
- **Language Suffixes Restricted to Form Inputs:** Language-specific properties with locale suffixes (e.g., `name_ar`, `name_en`) are strictly reserved for populating and binding edit/create form inputs. NEVER use them as display values or fallbacks in tables and views.

## 4. Styling & Tailwind CSS

- **Tailwind Preference:** Use Tailwind CSS whenever possible.
- **Size Utility Rule:** When Tailwind `w-*` and `h-*` utilities have the same value, use `size-*` instead (e.g., `size-6` instead of `w-6 h-6`).
- **Canonical Classes:** Fix `tailwindcss(suggestCanonicalClasses)` warnings using `npx @tailwindcss/upgrade`.

## 5. API & Postman Auditing & Exact Naming

- **Read-Only Audit Scope:** Whenever asked to compare, audit, or review the frontend against Postman / backend APIs, inspect request bodies and endpoint response structures for research and exploration. Keep code edits strictly confined to the required task.
- **Preserve Exact API Field Names & Casing:** Whenever API field names are provided or inspected, **ALWAYS use the exact same field names and casing (e.g., `snake_case` like `last_page`, `current_page`, `per_page`)**. Never transform them to `camelCase`.
- **Zero Fallback/Alternative Keys:** Rely strictly and exclusively on the exact inspected API key. Do not guess, assume, or check multiple alternative keys (e.g., `lastPage ?? last_page`).
- **MCP Tools Priority:** For any platform or service asked about (e.g., Postman, Figma, Trello, Slack), prioritize using its dedicated MCP server tools as the primary way to read and inspect data.


## 6. Library & Component Installation (Official Commands Only)

- **Official Installation Commands:** When installing, adding, or using a library, package, or component, **ALWAYS use the official CLI command** provided by its maintainers. Never manually create or improvise component files from scratch when an official installer exists.
- **Documentation & Web Search:** If you are unsure of the exact command or package setup, search the web or consult official documentation first before improvising.
- **Example (shadcn/ui):** To add or install shadcn components, strictly use the official command:
  ```bash
  npx shadcn@latest add <component-name>
  ```
