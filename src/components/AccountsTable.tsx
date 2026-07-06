"use client";

import type { Account } from "@/types";
import { formatCurrency, getSkuTam } from "@/lib/tam";
import { useApp } from "@/context/AppContext";
import { useMemo, useState } from "react";
import Link from "next/link";

interface AccountsTableProps {
  accounts: Account[];
}

type SortKey = "name" | "engineers" | "state" | "industry" | "tam";

function SortIndicator({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: "asc" | "desc" }) {
  if (sortKey !== col) return null;
  return <span className="ml-1 text-indigo-400">{sortDir === "asc" ? "↑" : "↓"}</span>;
}

export function AccountsTable({ accounts }: AccountsTableProps) {
  const { selectedSku, annualBilling } = useApp();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("engineers");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [stateFilter, setStateFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    let result = accounts;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.city.toLowerCase().includes(q) ||
          a.industry.toLowerCase().includes(q)
      );
    }

    if (stateFilter !== "all") {
      result = result.filter((a) => a.state === stateFilter);
    }

    return [...result].sort((a, b) => {
      const tamA = getSkuTam(a.engineers, selectedSku, annualBilling).annualRevenue;
      const tamB = getSkuTam(b.engineers, selectedSku, annualBilling).annualRevenue;
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else if (sortKey === "engineers") cmp = a.engineers - b.engineers;
      else if (sortKey === "state") cmp = a.state.localeCompare(b.state);
      else if (sortKey === "industry") cmp = a.industry.localeCompare(b.industry);
      else if (sortKey === "tam") cmp = tamA - tamB;
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [accounts, search, sortKey, sortDir, stateFilter, selectedSku, annualBilling]);

  const states = [...new Set(accounts.map((a) => a.state))].sort();

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50">
      <div className="flex flex-wrap items-center gap-3 border-b border-zinc-800 p-4">
        <input
          type="text"
          placeholder="Search accounts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
        />
        <select
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
          className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
        >
          <option value="all">All States</option>
          {states.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <span className="ml-auto text-sm text-zinc-500">{filtered.length} of {accounts.length}</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-400">
              <th className="cursor-pointer px-4 py-3 font-medium hover:text-white" onClick={() => toggleSort("name")}>
                Company <SortIndicator col="name" sortKey={sortKey} sortDir={sortDir} />
              </th>
              <th className="cursor-pointer px-4 py-3 font-medium hover:text-white" onClick={() => toggleSort("state")}>
                Location <SortIndicator col="state" sortKey={sortKey} sortDir={sortDir} />
              </th>
              <th className="cursor-pointer px-4 py-3 font-medium hover:text-white" onClick={() => toggleSort("industry")}>
                Industry <SortIndicator col="industry" sortKey={sortKey} sortDir={sortDir} />
              </th>
              <th className="cursor-pointer px-4 py-3 text-right font-medium hover:text-white" onClick={() => toggleSort("engineers")}>
                Engineers <SortIndicator col="engineers" sortKey={sortKey} sortDir={sortDir} />
              </th>
              <th className="cursor-pointer px-4 py-3 text-right font-medium hover:text-white" onClick={() => toggleSort("tam")}>
                Annual TAM <SortIndicator col="tam" sortKey={sortKey} sortDir={sortDir} />
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((account) => {
              const tam = getSkuTam(account.engineers, selectedSku, annualBilling);
              return (
                <tr key={account.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                  <td className="px-4 py-3">
                    <Link href={`/accounts/${account.id}`} className="font-medium text-white hover:text-indigo-300">
                      {account.name}
                    </Link>
                    <div className="text-xs text-zinc-500">{account.website}</div>
                  </td>
                  <td className="px-4 py-3 text-zinc-300">{account.city}, {account.state}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300">{account.industry}</span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-white">{account.engineers}</td>
                  <td className="px-4 py-3 text-right font-mono text-indigo-300">{formatCurrency(tam.annualRevenue)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
