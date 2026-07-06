"use client";

import {
  LicenseBarChart,
  LicensePieChart,
} from "@/components/Charts";
import { TamBreakdownTable } from "@/components/PricingTables";
import { StatCard } from "@/components/StatCard";
import type { AccountTamSummary } from "@/types";
import { formatCurrency, formatNumber } from "@/lib/tam";
import Link from "next/link";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const HEADCOUNT_COLORS = ["#6366f1", "#3f3f46"];
const SCENARIO_COLORS = ["#4f46e5", "#6366f1", "#8b5cf6", "#a78bfa"];

interface AccountDashboardProps {
  summary: AccountTamSummary;
  scenarioName: string;
  showBackLink?: boolean;
}

export function AccountDashboard({
  summary,
  scenarioName,
  showBackLink = true,
}: AccountDashboardProps) {
  const { account, byLicense, headcount, scenarios } = summary;
  const engPercent = (summary.engineerRatio * 100).toFixed(0);

  const headcountData = [
    { name: "Engineers", value: headcount.engineers },
    { name: "Other Staff", value: headcount.other },
  ];

  const monthlyLicenseData = byLicense.map((l) => ({
    name: l.name.replace("Teams ", ""),
    monthly: l.monthlyRevenue,
    seats: l.seats,
  }));

  return (
    <div className="space-y-6">
      {showBackLink && (
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-white"
        >
          ← Back to overview
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
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                {account.industry}
              </span>
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                {account.size}
              </span>
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                {account.website}
              </span>
            </div>
            {account.notes && (
              <p className="mt-3 text-xs text-zinc-500">{account.notes}</p>
            )}
          </div>
          <div className="text-right">
            <p className="text-xs text-zinc-500">Scenario</p>
            <p className="font-medium text-indigo-300">{scenarioName}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Engineers"
          value={formatNumber(account.engineers)}
          subtext={`${engPercent}% of ${formatNumber(account.totalEmployees)} employees`}
        />
        <StatCard
          label="Addressable Seats"
          value={formatNumber(summary.addressableSeats)}
          subtext="At scenario penetration"
        />
        <StatCard
          label="Monthly TAM"
          value={formatCurrency(summary.monthlyTam, true)}
          subtext="Annual billing rates"
        />
        <StatCard
          label="Annual TAM"
          value={formatCurrency(summary.annualTam, true)}
          accent
          subtext="Total license opportunity"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <h3 className="mb-1 text-sm font-medium text-zinc-400">Headcount Split</h3>
          <p className="mb-4 text-xs text-zinc-600">Engineers vs non-engineering staff</p>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={headcountData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {headcountData.map((_, i) => (
                  <Cell key={i} fill={HEADCOUNT_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#1a1a2e",
                  border: "1px solid #333",
                  borderRadius: 8,
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <h3 className="mb-1 text-sm font-medium text-zinc-400">TAM Across Scenarios</h3>
          <p className="mb-4 text-xs text-zinc-600">Annual revenue at each penetration level</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={scenarios}>
              <XAxis
                dataKey="name"
                stroke="#888"
                fontSize={10}
                tick={{ fill: "#888" }}
                interval={0}
                angle={-20}
                textAnchor="end"
                height={50}
              />
              <YAxis
                tickFormatter={(v) => formatCurrency(v, true)}
                stroke="#888"
                fontSize={11}
              />
              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
                contentStyle={{
                  background: "#1a1a2e",
                  border: "1px solid #333",
                  borderRadius: 8,
                  color: "#fff",
                }}
              />
              <Bar dataKey="annualTam" radius={[4, 4, 0, 0]}>
                {scenarios.map((_, i) => (
                  <Cell key={i} fill={SCENARIO_COLORS[i % SCENARIO_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <h3 className="mb-4 text-sm font-medium text-zinc-400">Revenue by License Type</h3>
          <LicensePieChart data={byLicense} />
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <h3 className="mb-4 text-sm font-medium text-zinc-400">Annual Revenue by License</h3>
          <LicenseBarChart data={byLicense} />
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
        <h3 className="mb-1 text-sm font-medium text-zinc-400">Monthly Revenue by License</h3>
        <p className="mb-4 text-xs text-zinc-600">Recurring monthly at annual billing rates</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthlyLicenseData}>
            <XAxis dataKey="name" stroke="#888" fontSize={11} />
            <YAxis
              tickFormatter={(v) => formatCurrency(v, true)}
              stroke="#888"
              fontSize={11}
            />
            <Tooltip
              formatter={(value, name) => [
                name === "seats"
                  ? Number(value).toLocaleString()
                  : formatCurrency(Number(value)),
                name === "seats" ? "Seats" : "Monthly Revenue",
              ]}
              contentStyle={{
                background: "#1a1a2e",
                border: "1px solid #333",
                borderRadius: 8,
                color: "#fff",
              }}
            />
            <Bar dataKey="monthly" fill="#818cf8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <section>
        <h2 className="mb-4 text-lg font-semibold">License Breakdown</h2>
        <TamBreakdownTable breakdown={byLicense} totalAnnual={summary.annualTam} />
      </section>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {scenarios.map((s) => (
          <div
            key={s.id}
            className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
          >
            <p className="text-sm text-zinc-400">{s.name}</p>
            <p className="mt-1 text-xl font-bold text-white">
              {formatCurrency(s.annualTam, true)}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              {(s.penetrationRate * 100).toFixed(0)}% penetration
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

interface AccountDashboardCardProps {
  summary: AccountTamSummary;
}

export function AccountDashboardCard({ summary }: AccountDashboardCardProps) {
  const { account, byLicense, annualTam } = summary;
  const topLicense = byLicense[0];

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
          <p className="font-mono text-sm text-indigo-300">
            {formatCurrency(annualTam, true)}
          </p>
          <p className="text-[10px] text-zinc-500">Annual TAM</p>
        </div>
        <div className="rounded-lg bg-zinc-800/50 py-2">
          <p className="font-mono text-sm text-white">{summary.addressableSeats}</p>
          <p className="text-[10px] text-zinc-500">Seats</p>
        </div>
      </div>

      {topLicense && (
        <p className="text-xs text-zinc-500">
          Top license: {topLicense.name} ({topLicense.seats} seats ·{" "}
          {formatCurrency(topLicense.annualRevenue, true)}/yr)
        </p>
      )}

      <p className="mt-2 text-xs text-indigo-400 opacity-0 transition-opacity group-hover:opacity-100">
        View full dashboard →
      </p>
    </Link>
  );
}
