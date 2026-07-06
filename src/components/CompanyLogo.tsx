"use client";

import Image from "next/image";
import { useState } from "react";

interface CompanyLogoProps {
  name: string;
  logoUrl: string;
  size?: "sm" | "md" | "lg";
}

const SIZES = {
  sm: "h-10 w-10 text-sm",
  md: "h-16 w-16 text-xl",
  lg: "h-24 w-24 text-3xl",
};

export function CompanyLogo({ name, logoUrl, size = "md" }: CompanyLogoProps) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (failed) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center rounded-xl border border-zinc-700 bg-gradient-to-br from-indigo-600/30 to-violet-600/20 font-bold text-indigo-200 ${SIZES[size]}`}
      >
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={logoUrl}
      alt={`${name} logo`}
      width={size === "lg" ? 96 : size === "md" ? 64 : 40}
      height={size === "lg" ? 96 : size === "md" ? 64 : 40}
      className={`shrink-0 rounded-xl border border-zinc-700/80 bg-white object-contain p-1.5 ${SIZES[size]}`}
      onError={() => setFailed(true)}
      unoptimized
    />
  );
}
