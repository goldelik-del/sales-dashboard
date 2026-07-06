"use client";

import { SkuComparisonChart } from "@/components/Charts";
import { TamBreakdownTable } from "@/components/PricingTables";
import { SkuTamMatrix } from "@/components/SkuTamMatrix";
import { StatCard } from "@/components/StatCard";
import { useApp } from "@/context/AppContext";
import type { AccountTamSummary } from "@/types";
import { formatCurrency, formatNumber, skuLabel } from "@/lib/tam";
import Link from "next/link";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const HEADCOUNT_COLORS = ["#6366f1", "#3f3f46"];

interface AccountDashboardProps {
  summary: AccountTamSummary;
  showBackLink?: boolean;
}

export function AccountDashboard({ summary, showBackLink = true }: AccountDashboardProps) {
  const { selectedSku, setSelectedSku } = useApp();
  const { account, bySku, headcount } = summary;
  const engPercent = (summary.engineerRatio * 100).toFixed(0);

  const headcountData = [
    { name: "Engineers", value: headcount.engineers },
    { name: "Other Staff", value: headcount.other },
  ];

  const selectedRow = bySku.find((s) => s.type === selectedSku) ?? bySku[0];

  return (
    <div className="space-y-6">
      {showBackLink && (
        <Link href="/accounts" className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white">
          ← Back to Top 10
        </Link>
      )}

      <div className="rounded-xl border border-zinc-800 bg-gradient-to-br from-indigo-500/10 via-zinc-900/80 to-zinc-900/50 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/40 bg-indigo-500/20 text-lg font-bold text-indigo-300">
                #{summary.rank}
              </span>
              <div>
                <h1 className="text-2xl font-bold text-white">{account.name}</h1>
                <p className="text-sm text-zinc-400">
                  {account.city}, {account.state} · Founded {account.founded}
                </p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">{account.industry}</span>
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">{account.website}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Engineers" value={formatNumber(account.engineers)} subtext={`${engPercent}% of workforce`} />
        <StatCard
          label={`Monthly TAM (${skuLabel(selectedSku)})`}
          value={formatCurrency(selectedRow.monthlyRevenue, true)}
          subtext={`${formatCurrency(selectedRow.unitPrice)} × ${account.engineers}`}
        />
        <StatCard
          label={`Annual TAM (${skuLabel(selectedSku)})`}
          value={formatCurrency(selectedRow.annualRevenue, true)}
          accent
          subtext="SKU price × engineers × 12"
        />
        <StatCard label="Total Employees" value={formatNumber(account.totalEmployees)} subtext="Company headcount" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <h3 className="mb-4 text-sm font-medium text-zinc-400">Headcount Split</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={headcountData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {headcountData.map((_, i) => (
                  <Cell key={i} fill={HEADCOUNT_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid #333", borderRadius: 8, color: "#fff" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <h3 className="mb-4 text-sm font-medium text-zinc-400">TAM by SKU (Annual)</h3>
          <SkuComparisonChart data={bySku} metric="annual" />
        </div>
      </div>

      <SkuTamMatrix
        breakdown={bySku}
        selectedSku={selectedSku}
        onSelectSku={setSelectedSku}
      />

      <section>
        <h2 className="mb-4 text-lg font-semibold">License Breakdown</h2>
        <TamBreakdownTable breakdown={bySku} />
      </section>
    </div>
  );
}

interface AccountDashboardCardProps {
  summary: AccountTamSummary;
}

export function AccountDashboardCard({ summary }: AccountDashboardCardProps) {
  const { account, annualTam, bySku } = summary;
  const topSku = [...bySku].sort((a, b) => b.annualRevenue - a.annualRevenue)[0];

  return (
    <Link
      href={`/accounts/${account.id}`}
      className="group block rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all hover:border-indigo-500/40 hover:bg-indigo-500/5"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-800 text-xs font-bold text-zinc-300 group-hover:bg-indigo-500/20 group-hover:text-indigo-300">
            #{summary.rank}
          </span>
          <h3 className="font-semibold text-white">{account.name}</h3>
        </div>
        <span className="text-xs text-zinc-500">{account.state}</span>
      </div>

      <div className="mb-3 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-zinc-800/50 py-2">
          <p className="font-mono text-sm text-white">{account.engineers}</p>
          <p className="text-[10px] text-zinc-500">Engineers</p>
        </div>
        <div className="rounded-lg bg-zinc-800/50 py-2">
          <p className="font-mono text-sm text-indigo-300">{formatCurrency(annualTam, true)}</p>
          <p className="text-[10px] text-zinc-500">Annual TAM</p>
        </div>
        <div className="rounded-lg bg-zinc-800/50 py-2">
          <p className="font-mono text-sm text-white">{formatCurrency(topSku?.annualRevenue ?? 0, true)}</p>
          <p className="text-[10px] text-zinc-500">Max SKU</p>
        </div>
      </div>

      <p className="text-xs text-indigo-400 opacity-0 transition-opacity group-hover:opacity-100">
        View full dashboard →
      </p>
    </Link>
  );
}
