"use client";

import { AppShell } from "@/components/AppShell";
import { SkuComparisonChart } from "@/components/Charts";
import { TamBreakdownTable } from "@/components/PricingTables";
import { SkuTamCards, SkuTamMatrix } from "@/components/SkuTamMatrix";
import { StatGrid } from "@/components/StatCard";
import { useApp } from "@/context/AppContext";
import { FILTERED_ACCOUNTS } from "@/data/accounts";
import { calculateTam } from "@/lib/tam";
import { useMemo } from "react";

export default function TamPage() {
  const { selectedSku, setSelectedSku, annualBilling } = useApp();

  const tam = useMemo(
    () => calculateTam(FILTERED_ACCOUNTS, selectedSku, annualBilling),
    [selectedSku, annualBilling]
  );

  return (
    <AppShell
      title="TAM by SKU"
      subtitle={`Price × ${tam.totalEngineers.toLocaleString()} engineers per license type`}
    >
      <div className="space-y-8">
        <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-5">
          <h2 className="text-lg font-semibold text-violet-200">How TAM is calculated</h2>
          <p className="mt-2 text-sm text-zinc-400">
            For each Cursor license SKU, total addressable market equals the per-seat monthly price
            multiplied by the total engineering headcount across all target accounts. Annual TAM =
            monthly TAM × 12. Each SKU row represents the ceiling if every engineer adopted that
            license — they are not additive.
          </p>
        </div>

        <StatGrid
          totalAccounts={tam.totalAccounts}
          totalEngineers={tam.totalEngineers}
          annualBilling={annualBilling}
        />

        <SkuTamMatrix
          breakdown={tam.bySku}
          selectedSku={selectedSku}
          onSelectSku={setSelectedSku}
        />

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <h3 className="mb-4 text-sm font-medium text-zinc-400">Annual TAM Comparison</h3>
          <SkuComparisonChart data={tam.bySku} metric="annual" />
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <h3 className="mb-4 text-sm font-medium text-zinc-400">Monthly TAM Comparison</h3>
          <SkuComparisonChart data={tam.bySku} metric="monthly" />
        </div>

        <SkuTamCards breakdown={tam.bySku} selectedSku={selectedSku} onSelectSku={setSelectedSku} />

        <TamBreakdownTable breakdown={tam.bySku} />
      </div>
    </AppShell>
  );
}
