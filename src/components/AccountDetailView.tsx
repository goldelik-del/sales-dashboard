"use client";

import { AccountCompanyHeader } from "@/components/AccountCompanyHeader";
import { AccountDashboard } from "@/components/AccountDashboard";
import { LeadershipPanel } from "@/components/LeadershipPanel";
import { isTopAccount } from "@/lib/accounts";
import type { AccountTamSummary } from "@/types";
import Link from "next/link";
import { useState } from "react";

type AccountTab = "leadership" | "tam";

interface AccountDetailViewProps {
  summary: AccountTamSummary;
}

export function AccountDetailView({ summary }: AccountDetailViewProps) {
  const [tab, setTab] = useState<AccountTab>("leadership");
  const { account } = summary;
  const hasLeadership = isTopAccount(account.id);

  return (
    <div className="space-y-6">
      <Link
        href="/accounts"
        className="inline-flex items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-white"
      >
        ← Back to Top 10
      </Link>

      <AccountCompanyHeader account={account} rank={summary.rank} />

      {hasLeadership && (
        <div className="flex gap-1 rounded-lg border border-zinc-800 bg-zinc-900/50 p-1">
          <TabButton active={tab === "leadership"} onClick={() => setTab("leadership")}>
            Leadership
          </TabButton>
          <TabButton active={tab === "tam"} onClick={() => setTab("tam")}>
            TAM Analysis
          </TabButton>
        </div>
      )}

      {hasLeadership && tab === "leadership" ? (
        <LeadershipPanel accountId={account.id} accountName={account.name} />
      ) : (
        <AccountDashboard summary={summary} showBackLink={false} />
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-indigo-600 text-white shadow-sm"
          : "text-zinc-400 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
