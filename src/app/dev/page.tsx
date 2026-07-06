"use client";

import { AppShell } from "@/components/AppShell";
import { FILTERED_ACCOUNTS } from "@/data/accounts";
import { getTopAccounts } from "@/lib/accounts";
import { calculateTam } from "@/lib/tam";
import { useApp } from "@/context/AppContext";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const ROUTES = [
  { href: "/", label: "Overview", desc: "TAM dashboard, top 10 list, SKU matrix" },
  { href: "/accounts", label: "Top 10 Accounts", desc: "Ranked accounts with drill-down cards" },
  { href: "/tam", label: "TAM by SKU", desc: "Full license comparison matrix" },
  { href: "/dev", label: "Dev Server", desc: "This page — launch pad & route map" },
];

const FEATURES = [
  { name: "SKU × headcount TAM", path: "/" },
  { name: "Top 10 leadership (LinkedIn)", path: "/accounts/1" },
  { name: "Messaging GO button", path: "/accounts/1", tab: "messaging" },
  { name: "Account TAM charts", path: "/accounts/1", tab: "tam" },
];

export default function DevServerPage() {
  const { selectedSku, annualBilling } = useApp();
  const [apiStatus, setApiStatus] = useState<"checking" | "ok" | "error">("checking");
  const [messagingStatus, setMessagingStatus] = useState<"idle" | "checking" | "ok" | "error">("idle");

  const tam = useMemo(
    () => calculateTam(FILTERED_ACCOUNTS, selectedSku, annualBilling),
    [selectedSku, annualBilling]
  );
  const topAccounts = useMemo(() => getTopAccounts(10, selectedSku), [selectedSku]);

  useEffect(() => {
    fetch("/api/health")
      .then((r) => setApiStatus(r.ok ? "ok" : "error"))
      .catch(() => setApiStatus("error"));
  }, []);

  async function testMessaging() {
    setMessagingStatus("checking");
    try {
      const res = await fetch("/api/messaging/1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sku: selectedSku }),
      });
      setMessagingStatus(res.ok ? "ok" : "error");
    } catch {
      setMessagingStatus("error");
    }
  }

  return (
    <AppShell title="Dev Server" subtitle="Local development launch pad">
      <div className="space-y-8">
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
            </span>
            <div>
              <p className="font-semibold text-emerald-300">Dev server running</p>
              <p className="text-sm text-emerald-200/70">
                Next.js ·{" "}
                <a href="http://localhost:3000" className="underline">
                  http://localhost:3000
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="Accounts" value={String(FILTERED_ACCOUNTS.length)} />
          <Stat label="Engineers" value={tam.totalEngineers.toLocaleString()} />
          <Stat label="API" value={apiStatus === "checking" ? "…" : apiStatus === "ok" ? "Healthy" : "Down"} />
        </div>

        <section>
          <h2 className="mb-4 text-lg font-semibold">Routes</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {ROUTES.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-colors hover:border-indigo-500/40 hover:bg-indigo-500/5"
              >
                <p className="font-medium text-white">{route.label}</p>
                <p className="mt-1 font-mono text-xs text-indigo-400">{route.href}</p>
                <p className="mt-2 text-sm text-zinc-500">{route.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold">Top 10 — quick drill-down</h2>
          <div className="overflow-hidden rounded-xl border border-zinc-800">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/80 text-zinc-400">
                  <th className="px-4 py-2.5 font-medium">#</th>
                  <th className="px-4 py-2.5 font-medium">Account</th>
                  <th className="px-4 py-2.5 font-medium">Links</th>
                </tr>
              </thead>
              <tbody>
                {topAccounts.map((a) => (
                  <tr key={a.account.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                    <td className="px-4 py-2.5 text-zinc-500">{a.rank}</td>
                    <td className="px-4 py-2.5 font-medium text-white">{a.account.name}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex flex-wrap gap-2">
                        <TabLink href={`/accounts/${a.account.id}`} label="Account" />
                        <TabLink href={`/accounts/${a.account.id}`} label="LinkedIn" />
                        <TabLink href={`/accounts/${a.account.id}`} label="TAM" />
                        <TabLink href={`/accounts/${a.account.id}`} label="Messaging" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold">API smoke tests</h2>
          <div className="flex flex-wrap items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <button
              type="button"
              onClick={testMessaging}
              disabled={messagingStatus === "checking"}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
            >
              Test POST /api/messaging/1
            </button>
            <StatusBadge
              status={messagingStatus === "idle" ? "pending" : messagingStatus === "ok" ? "ok" : messagingStatus === "error" ? "error" : "checking"}
            />
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold">Run locally</h2>
          <pre className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-sm text-zinc-300">
{`npm install
npm run dev
# → http://localhost:3000`}
          </pre>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold">Feature map</h2>
          <ul className="space-y-2">
            {FEATURES.map((f) => (
              <li key={f.name} className="flex items-center gap-3 text-sm text-zinc-400">
                <span className="text-emerald-500">✓</span>
                {f.name}
                <Link href={f.path} className="font-mono text-xs text-indigo-400 hover:underline">
                  {f.path}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-1 text-xl font-bold text-white">{value}</p>
    </div>
  );
}

function TabLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-md border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300 hover:border-indigo-500/50 hover:text-indigo-300"
    >
      {label}
    </Link>
  );
}

function StatusBadge({ status }: { status: "pending" | "checking" | "ok" | "error" }) {
  const styles = {
    pending: "text-zinc-500",
    checking: "text-amber-400",
    ok: "text-emerald-400",
    error: "text-red-400",
  };
  const labels = {
    pending: "Not tested",
    checking: "Testing…",
    ok: "OK",
    error: "Failed",
  };
  return <span className={`text-sm font-medium ${styles[status]}`}>{labels[status]}</span>;
}
