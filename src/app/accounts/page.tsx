import { AccountDashboardCard } from "@/components/AccountDashboard";
import { TopAccountsList } from "@/components/TopAccountsList";
import { getTopAccounts } from "@/lib/accounts";
import Link from "next/link";

export default function AccountsIndexPage() {
  const topAccounts = getTopAccounts();

  return (
    <div className="min-h-screen bg-[#0c0c14] text-white">
      <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-lg font-bold">
              C
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">Top 10 Accounts</p>
              <p className="text-xs text-zinc-500">Individual account dashboards</p>
            </div>
          </Link>
          <Link
            href="/"
            className="text-sm text-zinc-400 transition-colors hover:text-white"
          >
            ← Overview
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        <TopAccountsList accounts={topAccounts} />

        <section>
          <h2 className="mb-2 text-lg font-semibold">Account Dashboards</h2>
          <p className="mb-4 text-sm text-zinc-500">
            Click any card for the full visual dashboard with license breakdowns,
            headcount analysis, and scenario comparisons.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
            {topAccounts.map((summary) => (
              <AccountDashboardCard key={summary.account.id} summary={summary} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
