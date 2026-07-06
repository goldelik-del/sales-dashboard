"use client";

import {
  formatLeadershipLevel,
  getLeadershipForAccount,
  searchLeadership,
} from "@/data/leadership";
import type { LeadershipContact } from "@/types";
import { useMemo, useState } from "react";

interface LeadershipPanelProps {
  accountId: string;
  accountName: string;
}

function LeadershipRow({ contact }: { contact: LeadershipContact }) {
  return (
    <a
      href={contact.linkedinUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 px-4 py-3.5 transition-all hover:border-[#0a66c2]/40 hover:bg-[#0a66c2]/5"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 text-sm font-semibold text-zinc-300 group-hover:from-[#0a66c2]/30 group-hover:to-[#0a66c2]/10 group-hover:text-[#70b7f0]">
        {contact.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium text-white group-hover:text-[#70b7f0]">{contact.name}</p>
          <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-400">
            {formatLeadershipLevel(contact.level)}
          </span>
        </div>
        <p className="text-sm text-zinc-400">{contact.title}</p>
        {contact.location && (
          <p className="text-xs text-zinc-600">{contact.location}</p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-zinc-500 group-hover:text-[#70b7f0]">
        <LinkedInIcon />
        <span className="hidden sm:inline">LinkedIn</span>
        <span>→</span>
      </div>
    </a>
  );
}

function LinkedInIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function LeadershipPanel({ accountId, accountName }: LeadershipPanelProps) {
  const [query, setQuery] = useState("");
  const allContacts = useMemo(() => getLeadershipForAccount(accountId), [accountId]);
  const filtered = useMemo(
    () => searchLeadership(allContacts, query),
    [allContacts, query]
  );

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Engineering Leadership</h2>
          <p className="text-sm text-zinc-500">
            Director and above at {accountName} · {allContacts.length} contacts
          </p>
        </div>

        <div className="relative w-full sm:max-w-xs">
          <SearchIcon />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or title..."
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-6 py-12 text-center">
          <p className="text-zinc-400">No contacts match &ldquo;{query}&rdquo;</p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-2 text-sm text-indigo-400 hover:underline"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((contact) => (
            <LeadershipRow key={contact.id} contact={contact} />
          ))}
        </div>
      )}

      <p className="text-xs text-zinc-600">
        Showing engineering director-level and above. LinkedIn profiles sourced from public data.
      </p>
    </section>
  );
}

function SearchIcon() {
  return (
    <svg
      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}
