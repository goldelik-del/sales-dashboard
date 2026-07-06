"use client";

import { CompanyLogo } from "@/components/CompanyLogo";
import { getCompanyProfile, getLogoUrl } from "@/data/company-profiles";
import type { Account } from "@/types";
import { formatNumber } from "@/lib/tam";

interface AccountCompanyHeaderProps {
  account: Account;
  rank?: number;
}

export function AccountCompanyHeader({ account, rank }: AccountCompanyHeaderProps) {
  const profile = getCompanyProfile(account.id);
  const logoUrl = profile?.logoUrl ?? getLogoUrl(account.website);
  const linkedinUrl = profile?.linkedinCompanyUrl;

  return (
    <div className="rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-indigo-950/30 p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <CompanyLogo name={account.name} logoUrl={logoUrl} size="lg" />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            {rank ? (
              <span className="rounded-lg border border-indigo-500/40 bg-indigo-500/15 px-2.5 py-1 text-sm font-bold text-indigo-300">
                #{rank}
              </span>
            ) : null}
            <h1 className="text-2xl font-bold text-white">{account.name}</h1>
          </div>

          <p className="mt-1 text-sm text-zinc-400">
            {account.city}, {account.state} · Founded {account.founded} · {account.industry}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
              {formatNumber(account.engineers)} engineers
            </span>
            <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
              {formatNumber(account.totalEmployees)} employees
            </span>
            <a
              href={`https://${account.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300 hover:text-white"
            >
              {account.website} ↗
            </a>
          </div>

          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#0a66c2]/40 bg-[#0a66c2]/10 px-4 py-2 text-sm font-medium text-[#70b7f0] transition-colors hover:bg-[#0a66c2]/20"
            >
              <LinkedInIcon />
              View company on LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function LinkedInIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
