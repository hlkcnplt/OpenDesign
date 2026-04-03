# OpenDesign — Code Quality

## The Standard

Code must be written as if the next person reading it is an unfamiliar senior engineer. Every decision must be self-evident or documented.

---

## Forbidden Patterns (All Languages)

- Magic numbers or strings. Extract into named constants.
- Functions or methods longer than 50 lines. Split them.
- Nested conditionals deeper than 3 levels. Refactor using early returns or strategy pattern.
- Dead code (commented-out blocks). Delete it; Git history preserves it.
- Copy-pasted logic in more than two places. Abstract it.

---

## Frontend (TypeScript)

### Linting & Formatting

- ESLint with the Vite default config as a baseline; extend with `plugin:react-hooks/recommended`.
- Prettier for formatting. The `.prettierrc` is the single source of truth for code style.
- Run before commit: `npm run lint && npm run format:check`.

### React Anti-Patterns to Avoid

- Never put inline functions as event handlers in JSX if they cause unnecessary re-renders. Memoize with `useCallback`.
- Never derive state from props directly in a component body without `useMemo`.
- Never use `useEffect` to synchronize Zustand state with component state. Read directly from the store.
- Never import from `react-konva` inside a file that also manages business state. Separate canvas nodes from data concerns.

### Import Order (enforced by ESLint)

1. Node.js built-ins
2. External packages (`react`, `zustand`, etc.)
3. Internal aliases (`@/hooks`, `@/store`)
4. Relative imports

---

## Backend (Java)

### Static Analysis

- SpotBugs and Checkstyle are run as part of `./mvnw verify`.
- Checkstyle config inherits from Google Style Guide with the following overrides:
  - Indent: 4 spaces (not 2).
  - Line length: 120 characters.

### Anti-Patterns to Avoid

- Never use field injection (`@Autowired` on fields). Use constructor injection exclusively.
- Never catch `Exception` broadly. Catch the most specific exception type.
- Never use `Optional.get()` without checking `isPresent()` first. Use `orElseThrow()`.
- Never return `null` from a service method. Use `Optional<T>` or throw a domain exception.
- Never put `@Transactional` on controller methods. Transactions belong on service methods.

### Code Review Checklist

- [ ] Is the new code covered by tests?
- [ ] Are all public service methods Javadoc'd?
- [ ] Is any `apiKey` or sensitive data logged anywhere?
- [ ] Are DTOs `record` types?
- [ ] Does the PR introduce any new `@Autowired` field injection?

---

## AI Bridge (Python)

### Linting & Formatting

- `ruff` for linting and import sorting.
- `black` for formatting.
- Run before commit: `ruff check . && black --check .`.

### Type Checking

- `mypy` with `strict = true` in `mypy.ini`. All functions must be fully typed.
- Return types are mandatory on all functions, including `None`.

### Anti-Patterns to Avoid

- Never use `print()` for logging. Use the Python `logging` module.
- Never catch bare `except:`. Catch `Exception` at minimum, or specific exceptions.
- Never use mutable default arguments in function signatures.
- Never import `os.environ` directly inside provider classes. Read configuration through the `config.py` module.

---

## Git Hygiene

- Commits must be atomic: one logical change per commit.
- Commit messages follow Conventional Commits format (see `naming.md`).
- Branches must be rebased onto `main` before merging, not merged with a merge commit.
- PRs must not contain more than 400 changed lines (excluding auto-generated files). Large changes must be split.
- All CI checks must pass before merge. No bypassing with `--no-verify`.

---

## Security Baseline

- Dependencies with known critical CVEs must be updated within 7 days of disclosure.
- `npm audit`, `./mvnw dependency-check:check`, and `pip-audit` are run in CI.
- No secrets, API keys, or credentials may appear in source code or Git history.
- The `apiKey` field must be masked in all log outputs at every layer of the stack.
- CORS must be configured explicitly in `server-core`. Wildcard `*` origins are forbidden in production.
