# Subatom Official Documentation — Rebuild Manifest

This build consolidates the supplied documentation, framework reference material, and working sample applications into a single developer-facing documentation site.

## Included source categories

- Existing Next.js documentation application source.
- Existing user-facing Markdown, rewritten where it was duplicated, generic, or misleading.
- Detailed Subatom Router, Context, Request, Response, Response Helper, and FileUpload references from the supplied `sample.zip`.
- `create-subatom` CLI, template, extension, module, and testing/release documentation.
- A production architecture guide based on the supplied `create-test.zip`.
- A dedicated `subatom-pulse` guide based on the supplied working WebSocket implementation.

## Major documentation additions

- Request API reference.
- Response API reference.
- Response Helper API reference.
- API Reference index.
- Subatom ecosystem/package boundaries.
- Real-time / `subatom-pulse` guide.
- Complete production example.
- Documentation policy and source-authority rules.

## Cleanup

The project excludes archive metadata and packaging junk such as `__MACOSX`, `.DS_Store`, and Git repositories from the supplied reference archives. Generated documentation navigation only exposes the curated public developer surface.

## Validation note

The final source includes static checks for documentation registry/file consistency and relative Markdown links. Full Next.js typecheck/lint/build validation should be run in a network-enabled environment after installing the package dependencies because dependency installation was unavailable in the build container used for this archive preparation.
