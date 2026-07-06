"use client";

import { SkuComparisonChart } from "@/components/Charts";
import { TamBreakdownTable } from "@/components/PricingTables";
import { SkuTamMatrix } from "@/components/SkuTamMatrix";
import { StatCard } from "@/components/StatCard";
import { useApp } from "@/context/AppContext";
import type { AccountTamSummary } from "@/types";
import { formatCurrency, formatNumber, skuLabel } from "@/lib/tam";
import Link from "next/link";
import { CompanyLogo } from "@/components/CompanyLogo";
import { getCompanyProfile, getLogoUrl } from "@/data/company-profiles";
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

export function AccountDashboard({ summary, showBackLink = false }: AccountDashboardProps) {
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
  const { account, annualTam } = summary;
  const profile = getCompanyProfile(account.id);
  const logoUrl = profile?.logoUrl ?? getLogoUrl(account.website);

  return (
    <Link
      href={`/accounts/${account.id}`}
      className="group block rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all hover:border-indigo-500/40 hover:bg-indigo-500/5"
    >
      <div className="mb-3 flex items-start gap-3">
        <CompanyLogo name={account.name} logoUrl={logoUrl} size="sm" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-800 text-[10px] font-bold text-zinc-300 group-hover:bg-indigo-500/20 group-hover:text-indigo-300">
                #{summary.rank}
              </span>
              <h3 className="truncate font-semibold text-white group-hover:text-indigo-200">
                {account.name}
              </h3>
            </div>
            <span className="text-xs text-zinc-500">{account.state}</span>
          </div>
          <p className="mt-0.5 text-xs text-zinc-500">{account.engineers} engineers</p>
        </div>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2 text-center">
        <div className="rounded-lg bg-zinc-800/50 py-2">
          <p className="font-mono text-sm text-indigo-300">{formatCurrency(annualTam, true)}</p>
          <p className="text-[10px] text-zinc-500">Annual TAM</p>
        </div>
        <div className="rounded-lg bg-zinc-800/50 py-2">
          <p className="text-xs font-medium text-[#70b7f0]">Leadership</p>
          <p className="text-[10px] text-zinc-500">View contacts →</p>
        </div>
      </div>

      <p className="text-xs text-indigo-400 opacity-70 transition-opacity group-hover:opacity-100">
        Drill into account →
      </p>
    </Link>
  );
}
