# Documentation Policy

This site uses a source-grounded documentation policy so developers can safely rely on examples when building production applications.

## Source priority

When supplied sources disagree, use this order:

1. working application/reference implementation supplied by the project
2. exported/public API examples from the framework/package source
3. package/CLI contracts
4. existing user-facing Markdown
5. generic explanatory material

If the sources do not establish a behavior, the documentation should say that it is unverified instead of inventing an API.

## API labels

Every substantial feature should be understood as one of:

- **Public API** — intended for application developers.
- **Internal API** — implementation detail; do not depend on it unless the project explicitly documents it as supported.
- **Companion package API** — provided by another package such as `subatom-pulse`.
- **Application example** — code showing how to combine Subatom with application infrastructure.
- **Experimental/verify** — behavior visible in a reference but not sufficiently established as a stable public contract.

## Example quality

Examples should:

- be complete enough to understand the lifecycle they demonstrate;
- use the actual package names and import style from the supplied sources;
- avoid fake secrets that could be mistaken for real credentials;
- distinguish framework behavior from application/infrastructure behavior;
- avoid claiming that a third-party integration is built into Subatom.

## Production guidance

Production guides must identify application responsibilities such as database connections, Redis topology, authentication providers, TLS termination, and capacity planning. Framework APIs should not be used as a substitute for deployment-specific engineering.
