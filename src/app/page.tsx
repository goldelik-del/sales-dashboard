"use client";

import { AccountDashboardCard } from "@/components/AccountDashboard";
import { AccountsTable } from "@/components/AccountsTable";
import { AppShell } from "@/components/AppShell";
import { IndustryChart, SkuComparisonChart, StateBarChart } from "@/components/Charts";
import { PricingTable } from "@/components/PricingTables";
import { SkuTamCards, SkuTamMatrix } from "@/components/SkuTamMatrix";
import { StatGrid } from "@/components/StatCard";
import { TopAccountsList } from "@/components/TopAccountsList";
import { useApp } from "@/context/AppContext";
import { FILTERED_ACCOUNTS } from "@/data/accounts";
import { CURSOR_PRICING } from "@/data/pricing";
import { getTopAccounts } from "@/lib/accounts";
import { calculateTam, skuLabel } from "@/lib/tam";
import { useMemo } from "react";

export default function Dashboard() {
  const { selectedSku, setSelectedSku, annualBilling } = useApp();

  const tam = useMemo(
    () => calculateTam(FILTERED_ACCOUNTS, selectedSku, annualBilling),
    [selectedSku, annualBilling]
  );

  const topAccounts = useMemo(
    () => getTopAccounts(10, selectedSku),
    [selectedSku]
  );

  const stateChartData = Object.entries(tam.byState)
    .filter(([, v]) => v.accounts > 0)
    .map(([state, v]) => ({ state, ...v }));

  const industryChartData = Object.entries(tam.byIndustry).map(([industry, v]) => ({
    industry,
    ...v,
  }));

  return (
    <AppShell
      title="Overview"
      subtitle={`${FILTERED_ACCOUNTS.length} accounts · ${tam.totalEngineers.toLocaleString()} engineers`}
    >
      <div className="space-y-8">
        <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4">
          <p className="text-sm text-indigo-200">
            <strong>TAM formula:</strong> Each SKU&apos;s total addressable market = unit price ×
            engineering headcount. Select a SKU in the sidebar to view geo and account breakdowns
            for that license type.
          </p>
        </div>

        <StatGrid
          totalAccounts={tam.totalAccounts}
          totalEngineers={tam.totalEngineers}
          annualBilling={annualBilling}
        />

        <section>
          <h2 className="mb-4 text-lg font-semibold">TAM by SKU — All License Types</h2>
          <SkuTamMatrix
            breakdown={tam.bySku}
            selectedSku={selectedSku}
            onSelectSku={setSelectedSku}
          />
        </section>

        <section>
          <h2 className="mb-4 text-sm font-medium text-zinc-400">SKU Comparison (Annual TAM)</h2>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <SkuComparisonChart data={tam.bySku} metric="annual" />
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-lg font-semibold">Top 10 Accounts</h2>
              <p className="text-sm text-zinc-500">
                Click to drill into leadership contacts, company LinkedIn &amp; TAM
              </p>
            </div>
          </div>
          <TopAccountsList accounts={topAccounts} />
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold">Account Dashboards</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {topAccounts.map((summary) => (
              <AccountDashboardCard key={summary.account.id} summary={summary} />
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h3 className="mb-4 text-sm font-medium text-zinc-400">
              {skuLabel(selectedSku)} TAM by State
            </h3>
            <StateBarChart data={stateChartData} />
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h3 className="mb-4 text-sm font-medium text-zinc-400">
              {skuLabel(selectedSku)} TAM by Industry
            </h3>
            <IndustryChart data={industryChartData} />
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold">All SKU Annual TAM</h2>
          <SkuTamCards breakdown={tam.bySku} selectedSku={selectedSku} onSelectSku={setSelectedSku} />
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold">Cursor Pricing Reference</h2>
          <PricingTable pricing={CURSOR_PRICING} />
        </section>

        <section id="accounts">
          <h2 className="mb-2 text-lg font-semibold">All Target Accounts</h2>
          <p className="mb-4 text-sm text-zinc-500">
            Annual TAM shown for selected SKU ({skuLabel(selectedSku)}). Click any row for the
            account dashboard.
          </p>
          <AccountsTable accounts={FILTERED_ACCOUNTS} />
        </section>
      </div>
    </AppShell>
  );
}
