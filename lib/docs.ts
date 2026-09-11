export interface DocSection {
  title: string;
  slug: string;
  items: DocItem[];
}

export interface DocItem {
  title: string;
  slug: string;
  file: string;
  keywords?: string[];
}

export const docSections: DocSection[] = [
  {
    title: 'Start Here',
    slug: 'start',
    items: [
      { title: 'Introduction', slug: 'introduction', file: 'introduction.md', keywords: ['framework', 'overview', 'node.js', 'subatom'] },
      { title: 'Getting Started', slug: 'getting-started', file: 'getting-started.md', keywords: ['create-subatom', 'scaffold', 'cli', 'project'] },
      { title: 'Production Example', slug: 'production-example', file: 'production-example.md', keywords: ['production', 'postgresql', 'prisma', 'redis', 'websocket', 'pulse'] },
    ],
  },
  {
    title: 'Core Framework',
    slug: 'framework',
    items: [
      { title: 'Subatom Core', slug: 'subatom', file: 'subatom.md', keywords: ['application', 'server', 'lifecycle', 'config'] },
      { title: 'Router', slug: 'router', file: 'router.md', keywords: ['routing', 'routes', 'resource', 'http', 'urlFor'] },
      { title: 'Context', slug: 'context', file: 'context.md', keywords: ['ctx', 'request', 'response'] },
      { title: 'Middleware & Pipeline', slug: 'middleware', file: 'middleware.md', keywords: ['middleware', 'pipeline', 'transformer', 'interceptor', 'serializer'] },
      { title: 'Validation', slug: 'validation', file: 'validation.md', keywords: ['validation', 'schema', 'infer', 'standard schema'] },
      { title: 'File Uploads', slug: 'file-upload', file: 'file-upload.md', keywords: ['multipart', 'files', 'upload', 'stream'] },
      { title: 'Error Handling', slug: 'error-handling', file: 'error-handling.md', keywords: ['errors', 'exceptions', 'SubatomError'] },
      { title: 'OpenAPI', slug: 'openapi', file: 'openapi.md', keywords: ['openapi', 'swagger', 'api docs'] },
    ],
  },
  {
    title: 'HTTP Reference',
    slug: 'http',
    items: [
      { title: 'Request', slug: 'request', file: 'request.md', keywords: ['IRequest', 'body', 'query', 'params', 'headers', 'stream'] },
      { title: 'Response', slug: 'response', file: 'response.md', keywords: ['IResponse', 'json', 'send', 'redirect', 'stream'] },
      { title: 'Response Helper', slug: 'response-helper', file: 'response-helper.md', keywords: ['status', 'helper', 'HTTP'] },
      { title: 'API Reference Index', slug: 'api-reference', file: 'api-reference.md', keywords: ['reference', 'api', 'methods'] },
    ],
  },
  {
    title: 'Real-Time & Ecosystem',
    slug: 'ecosystem',
    items: [
      { title: 'subatom-pulse', slug: 'subatom-pulse', file: 'subatom-pulse.md', keywords: ['websocket', 'pulse', 'rooms', 'events', 'ack', 'heartbeat'] },
      { title: 'Package Ecosystem', slug: 'packages', file: 'packages.md', keywords: ['subatom', 'infer', 'pulse', 'create-subatom'] },
    ],
  },
  {
    title: 'Production',
    slug: 'production',
    items: [
      { title: 'Architecture', slug: 'architecture', file: 'architecture.md', keywords: ['lifecycle', 'architecture', 'request'] },
      { title: 'Configuration', slug: 'configuration', file: 'configuration.md', keywords: ['config', 'environment', 'port', 'host'] },
      { title: 'Security', slug: 'security', file: 'security.md', keywords: ['auth', 'cors', 'csrf', 'secrets', 'security'] },
      { title: 'Best Practices', slug: 'best-practices', file: 'best-practices.md', keywords: ['production', 'patterns', 'scaling'] },
      { title: 'Deployment', slug: 'deployment', file: 'DEPLOYMENT.md', keywords: ['docker', 'deploy', 'production'] },
      { title: 'Testing', slug: 'testing', file: 'testing.md', keywords: ['test', 'vitest', 'integration'] },
    ],
  },
  {
    title: 'create-subatom',
    slug: 'create-subatom',
    items: [
      { title: 'CLI Contract', slug: 'cli-contract', file: 'cli-contract.md', keywords: ['prompts', 'package manager', 'generation'] },
      { title: 'Templates', slug: 'templates', file: 'templates.md', keywords: ['template', 'generated project', 'orm'] },
      { title: 'Extension Guide', slug: 'extension-guide', file: 'extension-guide.md', keywords: ['extend', 'generator', 'development'] },
      { title: 'Module Reference', slug: 'module-reference', file: 'module-reference.md', keywords: ['source', 'modules', 'architecture'] },
      { title: 'Testing & Release', slug: 'testing-and-release', file: 'testing-and-release.md', keywords: ['tests', 'release', 'e2e', 'vitest'] },
    ],
  },
];

export const allDocs = docSections.flatMap((section) =>
  section.items.map((item) => ({ ...item, section: section.title, sectionSlug: section.slug }))
);

export function getDocBySlug(slug: string) {
  return allDocs.find((doc) => doc.slug === slug);
}

export function getAdjacentDocs(slug: string) {
  const index = allDocs.findIndex((doc) => doc.slug === slug);
  return {
    prev: index > 0 ? allDocs[index - 1] : null,
    next: index < allDocs.length - 1 ? allDocs[index + 1] : null,
  };
}
