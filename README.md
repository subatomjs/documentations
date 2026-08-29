# Subatom Infer

> Production-grade, high-performance runtime validation, strict schema transformation, and compile-time type inference engine powered by the unified `infer` namespace.

[![License: MIT](https://img.shields.io/badge/License-MIT-indigo.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D24.0.0-emerald.svg)](https://nodejs.org/)

---

## 📖 Documentation

For full documentation, guides, and interactive API references, visit the [Documentation Site](https://infer.subatomjs.dev).

---

## ⚡ Highlights

* **🚀 Dual Pipeline Execution:** Synchronous execution throws when encountering async refinements/transforms; asynchronous pipeline evaluates fully non-blocking.
* **🛡️ Bidirectional Typing (`Schema<Out, In>`):** Clearly separates runtime input preconditions from validated/transformed output types.
* **🔒 Immutable AST & Memory Safety:** Zero runtime side-effects, prototype poisoning protection, and thread-safe schema composition.
* **🎯 Discriminated Diagnostic AST:** Exact JSON/array paths, key-level issue grouping, and structured error trees (`.flatten()`, `.format()`, `.prettifyError()`).
* **📦 Dual ESM & CJS:** Dual-export distribution with pre-bundled TypeScript declaration maps.

---

## 📦 Installation

```bash
npm install subatom-infer
# or
pnpm add subatom-infer
# or
yarn add subatom-infer
# or
bun add subatom-infer