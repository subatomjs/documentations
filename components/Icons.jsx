/** biome-ignore-all lint/a11y/noSvgWithoutTitle: explanation */

import Image from "next/image";
import subatom_short_logo from "../public/subatom_short_logo.png";
import { FaGithub } from "react-icons/fa6";

export function SubatomLogo({ className = "w-7 h-7" }) {
  return (
    <Image
      src={subatom_short_logo}
      width={100}
      height={100}
      className={className}
      priority
      alt="Subatom Logo"
    />
  );
}

export function GithubIcon({ className = "w-5 h-5" }) {
  return <FaGithub className={`${className} text-slate-400`} />;
}

export function NpmIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="#fc3003" className={className}>
      <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0H1.763zM5.13 5.13h13.74v13.74h-3.435V8.565h-3.435v10.305H5.13V5.13z" />
    </svg>
  );
}
