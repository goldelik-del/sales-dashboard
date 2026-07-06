import { AccountDashboard } from "@/components/AccountDashboard";
import { getAccountById, getTopAccounts } from "@/lib/accounts";
import { TAM_SCENARIOS } from "@/data/pricing";
import { calculateAccountTam } from "@/lib/tam";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getTopAccounts().map((a) => ({ id: a.account.id }));
}

export default async function AccountPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const account = getAccountById(id);

  if (!account) {
    notFound();
  }

  const scenario = TAM_SCENARIOS.find((s) => s.id === "base") ?? TAM_SCENARIOS[1];
  const summary = calculateAccountTam(account, scenario);
  const topAccounts = getTopAccounts();
  const rank = topAccounts.findIndex((a) => a.account.id === id) + 1;

  return (
    <div className="min-h-screen bg-[#0c0c14] text-white">
      <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-lg font-bold">
              C
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">Account Dashboard</p>
              <p className="text-xs text-zinc-500">{account.name}</p>
            </div>
          </Link>
          <Link
            href="/accounts"
            className="text-sm text-zinc-400 transition-colors hover:text-white"
          >
            All Top 10 →
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <AccountDashboard
          summary={{ ...summary, rank: rank || 0 }}
          scenarioName={scenario.name}
        />
      </main>
    </div>
  );
}
