"use client";

import { AccountDashboardCard } from "@/components/AccountDashboard";
import { AppShell } from "@/components/AppShell";
import { TopAccountsList } from "@/components/TopAccountsList";
import { useApp } from "@/context/AppContext";
import { getTopAccounts } from "@/lib/accounts";
import { useMemo } from "react";

export default function AccountsIndexPage() {
  const { selectedSku } = useApp();
  const topAccounts = useMemo(() => getTopAccounts(10, selectedSku), [selectedSku]);

  return (
    <AppShell title="Top 10 Accounts" subtitle="Highest engineering headcount in segment">
      <div className="space-y-8">
        <TopAccountsList accounts={topAccounts} />

        <section>
          <h2 className="mb-4 text-lg font-semibold">Visual Dashboards</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topAccounts.map((summary) => (
              <AccountDashboardCard key={summary.account.id} summary={summary} />
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
