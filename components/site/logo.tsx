/* eslint-disable @next/next/no-img-element */
interface SubatomLogoProps {
  className?: string;
}

/** Full wordmark. The supplied image already contains the Subatom name. */
export function SubatomLogo({ className }: SubatomLogoProps) {
  return (
    <span className={`inline-flex ${className ?? ""}`} aria-label="Subatom.js">
      <img
        src="/images/logos/subatom_lite.png"
        alt="Subatom.js"
        className="block h-full w-auto object-contain dark:hidden"
      />
      <img
        src="/images/logos/subatom_dark.png"
        alt="Subatom.js"
        className="hidden h-full w-auto object-contain dark:block"
      />
    </span>
  );
}

/** Compact mark without the Subatom wordmark. */
export function SubatomShortLogo({ className }: SubatomLogoProps) {
  return (
    <img src="/images/logos/subatom_short.png" alt="Subatom.js" className={className} />
  );
}
