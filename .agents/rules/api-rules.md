---
trigger: always_on
---

# Strict API Keys & Naming Convention (Zero Assumptions)

## 1. Preserve Exact API Field Names & Casing

- Whenever API field names are provided by the user or inspected in Postman/responses, **ALWAYS use the exact same field names and casing (e.g., `snake_case` like `last_page`, `current_page`, `per_page`, `total`)**.
- NEVER transform them to `camelCase` or over-engineer custom names.

## 2. Zero Fallback & Alternative Keys

- NEVER guess, assume, or check multiple alternative keys (e.g., `lastPage ?? last_page ?? pagination?.meta?.last_page`).
- Rely strictly and exclusively on the exact inspected API keys. If the keys are not yet known or not inspected, only then ask or use standard minimal defaults.
