"use client";

import { AccountDashboardCard } from "@/components/AccountDashboard";
import { AccountsTable } from "@/components/AccountsTable";
import {
  IndustryChart,
  LicenseBarChart,
  LicensePieChart,
  StateBarChart,
} from "@/components/Charts";
import { PricingTable, TamBreakdownTable } from "@/components/PricingTables";
import { StatGrid } from "@/components/StatCard";
import { TopAccountsList } from "@/components/TopAccountsList";
import { FILTERED_ACCOUNTS } from "@/data/accounts";
import { CURSOR_PRICING, TAM_SCENARIOS } from "@/data/pricing";
import { getTopAccounts } from "@/lib/accounts";
import { calculateTam, formatCurrency } from "@/lib/tam";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function Dashboard() {
  const [scenarioId, setScenarioId] = useState("base");

  const scenario = TAM_SCENARIOS.find((s) => s.id === scenarioId) ?? TAM_SCENARIOS[1];
  const tam = useMemo(
    () => calculateTam(FILTERED_ACCOUNTS, scenario),
    [scenario]
  );

  const stateChartData = Object.entries(tam.byState)
    .filter(([, v]) => v.accounts > 0)
    .map(([state, v]) => ({ state, ...v }));

  const industryChartData = Object.entries(tam.byIndustry)
    .map(([industry, v]) => ({ industry, ...v }));

  const standardPrice =
    CURSOR_PRICING.find((p) => p.type === "teams_standard")!.annualMonthlyPrice;

  const topAccounts = useMemo(() => getTopAccounts(10, scenarioId), [scenarioId]);

  return (
    <div className="min-h-screen bg-[#0c0c14] text-white">
      <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-lg font-bold">
              C
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                Australia TAM Dashboard
              </h1>
              <p className="text-xs text-zinc-500">
                Cursor license opportunity · ≤250 engineers
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/accounts"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Top 10 Accounts →
            </Link>
            <div className="flex items-center gap-2">
            <label htmlFor="scenario" className="text-sm text-zinc-400">
              Scenario:
            </label>
            <select
              id="scenario"
              value={scenarioId}
              onChange={(e) => setScenarioId(e.target.value)}
              className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
            >
              {TAM_SCENARIOS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4">
          <p className="text-sm text-indigo-200">
            <strong>{scenario.name}:</strong> {scenario.description}. Pricing
            based on Cursor&apos;s July 2026 rates with 20% annual billing
            discount applied.
          </p>
        </div>

        <StatGrid
          totalAccounts={tam.totalAccounts}
          totalEngineers={tam.totalEngineers}
          monthlyTam={tam.monthlyTam}
          annualTam={tam.annualTam}
          penetrationRate={scenario.penetrationRate}
        />

        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-lg font-semibold">Top 10 Accounts</h2>
              <p className="text-sm text-zinc-500">
                Highest engineering headcount · ranked by TAM opportunity
              </p>
            </div>
            <Link
              href="/accounts"
              className="text-sm text-indigo-400 hover:underline"
            >
              View all dashboards →
            </Link>
          </div>
          <TopAccountsList accounts={topAccounts} />
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold">Account Visual Dashboards</h2>
          <p className="mb-4 text-sm text-zinc-500">
            Snapshot of each top account&apos;s license opportunity. Click for full
            breakdown with charts and scenario analysis.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {topAccounts.map((summary) => (
              <AccountDashboardCard key={summary.account.id} summary={summary} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold">TAM by License Type</h2>
          <TamBreakdownTable breakdown={tam.byLicense} totalAnnual={tam.annualTam} />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h3 className="mb-4 text-sm font-medium text-zinc-400">
              Revenue Split by License
            </h3>
            <LicensePieChart data={tam.byLicense} />
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h3 className="mb-4 text-sm font-medium text-zinc-400">
              Annual Revenue by License
            </h3>
            <LicenseBarChart data={tam.byLicense} />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h3 className="mb-4 text-sm font-medium text-zinc-400">
              TAM by State
            </h3>
            <StateBarChart data={stateChartData} />
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h3 className="mb-4 text-sm font-medium text-zinc-400">
              TAM by Industry (Top 8)
            </h3>
            <IndustryChart data={industryChartData} />
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold">Scenario Comparison</h2>
          <p className="mb-4 text-sm text-zinc-500">
            Annual TAM across all scenarios at annual billing rates
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TAM_SCENARIOS.map((s) => {
              const sTam = calculateTam(FILTERED_ACCOUNTS, s);
              const isActive = s.id === scenarioId;
              return (
                <button
                  key={s.id}
                  onClick={() => setScenarioId(s.id)}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    isActive
                      ? "border-indigo-500 bg-indigo-500/10"
                      : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
                  }`}
                >
                  <p className="text-sm font-medium text-zinc-300">{s.name}</p>
                  <p className="mt-1 text-xl font-bold text-white">
                    {formatCurrency(sTam.annualTam, true)}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {(s.penetrationRate * 100).toFixed(0)}% penetration
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold">Cursor Pricing Reference</h2>
          <PricingTable pricing={CURSOR_PRICING} />
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold">Target Accounts</h2>
          <p className="mb-4 text-sm text-zinc-500">
            {FILTERED_ACCOUNTS.length} Australian companies with ≤250 engineers.
            Est. annual TAM per account assumes Teams Standard at annual rate (
            {formatCurrency(standardPrice)}/seat/mo).
          </p>
          <AccountsTable accounts={FILTERED_ACCOUNTS} seatPrice={standardPrice} />
        </section>
      </main>

      <footer className="border-t border-zinc-800 py-6 text-center text-xs text-zinc-600">
        Data sourced from public company reports, LinkedIn estimates, and industry
        directories. Engineer counts are estimates. Pricing per{" "}
        <a
          href="https://cursor.com/docs/account/teams/pricing"
          className="text-indigo-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          cursor.com/docs
        </a>{" "}
        · July 2026
      </footer>
    </div>
  );
}
