<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## HomeFolio architecture
- Keep finance types, demo data and Indian currency/date utilities in the HomeFolio data module so every surface uses consistent calculations.
- Use the shared FinanceProvider for demo session state and authenticated Cloud sync; demo records never become private household records automatically.
- All financial writes go through authenticated server functions and role-checked database routines; authenticated table grants are read-only and audit entries originate in the database.
- Financial domain tables use family-scoped IDs and versionable JSON payloads; contributions and immutable audit records use typed amount and identity columns.
- Mount the shared shell at the root and give each finance section a distinct route and page-specific head metadata.
- Lazy-load decorative R3F scenes after hydration, read material colors from global theme tokens, and stop frame rendering offscreen or with reduced motion.
