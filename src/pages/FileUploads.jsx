import { CodeBlock } from "../components/CodeBlock";
import { Callout } from "../components/Callout";

export const FileUploads = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          File & Multi-File Upload Validation
        </h1>
        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
          Native schemas designed for Node.js multipart form upload pipelines, validating MIME types, extensions, byte limits, and storage engines[cite: 8, 9].
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CodeBlock
          title="Single File Schema (src/composites/file.ts)"
          code={`const AvatarUpload = infer.file()
  .min(1024)                         // Minimum 1 KB
  .max(5 * 1024 * 1024)              // Maximum 5 MB
  .mime(["image/png", "image/jpeg"]) // MIME types
  .extension(["png", "jpg", "jpeg"]) // Extensions
  .storage("disk");                  // "disk" | "memory"`}
        />

        <CodeBlock
          title="Multiple Files Schema (src/composites/files.ts)"
          code={`const GalleryUpload = infer.files()
  .min(1)                   // Array length >= 1
  .max(5)                   // Array length <= 5
  .minEach(500)             // Minimum bytes per file
  .maxEach(2 * 1024 * 1024) // Maximum bytes per file
  .mime("image/*")          // Wildcard MIME support
  .extension(["jpg", "png"]);`}
        />
      </div>

      <Callout type="info" title="Wildcard MIME Matching">
        <code className="font-mono">.mime()</code> accepts specific types like <code className="font-mono">"application/pdf"</code> or wildcards like <code className="font-mono">"image/*"</code> and <code className="font-mono">"*/*"</code>[cite: 8, 9].
      </Callout>
    </div>
  );
};