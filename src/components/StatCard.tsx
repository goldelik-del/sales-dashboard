import { formatCurrency, formatNumber, getSkuTam } from "@/lib/tam";

interface StatCardProps {
  label: string;
  value: string;
  subtext?: string;
  accent?: boolean;
}

export function StatCard({ label, value, subtext, accent }: StatCardProps) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        accent
          ? "border-indigo-500/40 bg-indigo-500/10"
          : "border-zinc-800 bg-zinc-900/50"
      }`}
    >
      <p className="text-sm font-medium text-zinc-400">{label}</p>
      <p className={`mt-1 text-2xl font-bold tracking-tight ${accent ? "text-indigo-300" : "text-white"}`}>
        {value}
      </p>
      {subtext && <p className="mt-1 text-xs text-zinc-500">{subtext}</p>}
    </div>
  );
}

interface StatGridProps {
  totalAccounts: number;
  totalEngineers: number;
  annualBilling: boolean;
}

export function StatGrid({
  totalAccounts,
  totalEngineers,
  annualBilling,
}: StatGridProps) {
  const minTam = getSkuTam(totalEngineers, "pro", annualBilling);
  const maxTam = getSkuTam(totalEngineers, "ultra", annualBilling);

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard
        label="Target Accounts"
        value={formatNumber(totalAccounts)}
        subtext="AU companies ≤250 engineers"
      />
      <StatCard
        label="Total Engineers"
        value={formatNumber(totalEngineers)}
        subtext="Addressable headcount"
      />
      <StatCard
        label="Minimum TAM (Pro)"
        value={formatCurrency(minTam.monthlyRevenue, true)}
        subtext={`${formatCurrency(minTam.unitPrice)}/seat × ${formatNumber(totalEngineers)} engineers`}
      />
      <StatCard
        label="Maximum TAM (Ultra)"
        value={formatCurrency(maxTam.monthlyRevenue, true)}
        accent
        subtext={`${formatCurrency(maxTam.unitPrice)}/seat × ${formatNumber(totalEngineers)} engineers`}
      />
    </div>
  );
}
