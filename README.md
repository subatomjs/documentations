# Subatom Official Documentation

This repository contains the Markdown-driven official documentation site for Subatom.js and its companion tooling. The content has been consolidated from the supplied framework references, `create-subatom` documentation, the Subatom sample implementation references, and the working `create-test` application.

## Documentation principles

- **Implementation first:** framework/package behavior is documented from the supplied implementation/reference material.
- **Public API clarity:** internal implementation details are not presented as application APIs.
- **Package boundaries:** `subatom`, `subatom-infer`, `subatom-pulse`, and `create-subatom` have distinct responsibilities.
- **Production focus:** guides include lifecycle, limits, security responsibilities, deployment, and a complete application architecture.
- **No invented guarantees:** benchmark numbers and optional configuration are not presented as universal guarantees without supporting evidence.

## Site stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- Markdown + GFM rendering
- Highlight.js syntax highlighting
- Static documentation routes and client-side search

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

Before release, run:

```bash
npm run typecheck
npm run lint
npm run build
```

The source package should be installed in a network-enabled environment before running these commands.

## Documentation structure

The site navigation is organized around:

- Start Here
- Core Framework
- HTTP Reference
- Real-Time & Ecosystem
- Production
- create-subatom maintainer documentation

The most complete end-to-end example is [`docs/production-example.md`](docs/production-example.md), based on the supplied `create-test` application.
