"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SITE_METADATA } from "../lib/docs-config";

export function BrandLogo({ size = "navbar", priority = false }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = mounted && resolvedTheme === "light";
  const logoSrc = isLight ? SITE_METADATA.logos.light : SITE_METADATA.logos.dark;

  if (size === "hero") {
    return (
      <Image
        src={logoSrc}
        alt="Subatom Pulse"
        width={320}
        height={76}
        priority={priority}
        className="h-16! sm:h-20! w-auto"
        style={{ width: "auto", height: "auto" }}
      />
    );
  }

  return (
    <Image
      src={logoSrc}
      alt="Subatom Pulse"
      width={150}
      height={36}
      priority={priority}
      className="h-8! w-auto"
      style={{ width: "auto", height: "auto" }}
    />
  );
}