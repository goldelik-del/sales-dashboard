"use client";

import type { AccountTamSummary } from "@/types";
import { formatCurrency, formatNumber, skuLabel } from "@/lib/tam";
import Link from "next/link";

interface TopAccountsListProps {
  accounts: AccountTamSummary[];
}

const RANK_COLORS = [
  "from-amber-500/20 to-amber-600/5 border-amber-500/30",
  "from-zinc-400/20 to-zinc-500/5 border-zinc-400/30",
  "from-orange-600/20 to-orange-700/5 border-orange-600/30",
];

export function TopAccountsList({ accounts }: TopAccountsListProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50">
      <div className="border-b border-zinc-800 px-4 py-3">
        <h3 className="font-semibold text-white">Top 10 Accounts by Engineers</h3>
        <p className="text-xs text-zinc-500">
          TAM = {skuLabel(accounts[0]?.selectedSku ?? "teams_standard")} × headcount
        </p>
      </div>

      <div className="divide-y divide-zinc-800/50">
        {accounts.map((item) => {
          const rankStyle =
            item.rank <= 3 ? RANK_COLORS[item.rank - 1] : "border-transparent bg-zinc-900/30";

          return (
            <Link
              key={item.account.id}
              href={`/accounts/${item.account.id}`}
              className="flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-zinc-800/40"
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-gradient-to-br text-sm font-bold ${
                  item.rank <= 3 ? rankStyle : "border-zinc-700 bg-zinc-800 text-zinc-400"
                }`}
              >
                {item.rank}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate font-medium text-white">{item.account.name}</span>
                  <span className="shrink-0 rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
                    {item.account.industry}
                  </span>
                </div>
                <p className="text-xs text-zinc-500">
                  {item.account.city}, {item.account.state}
                </p>
              </div>

              <div className="hidden text-right sm:block">
                <p className="font-mono text-sm text-white">
                  {formatNumber(item.account.engineers)} eng
                </p>
              </div>

              <div className="text-right">
                <p className="font-mono text-sm font-medium text-indigo-300">
                  {formatCurrency(item.annualTam, true)}
                </p>
                <p className="text-xs text-zinc-500">annual</p>
              </div>

              <span className="text-zinc-600">→</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
