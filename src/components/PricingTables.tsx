import type { LicensePricing, LicenseTamBreakdown } from "@/types";
import { formatCurrency, formatNumber } from "@/lib/tam";

interface PricingTableProps {
  pricing: LicensePricing[];
}

export function PricingTable({ pricing }: PricingTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/50">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-800 text-zinc-400">
            <th className="px-4 py-3 font-medium">License</th>
            <th className="px-4 py-3 font-medium">Monthly</th>
            <th className="px-4 py-3 font-medium">Annual (20% off)</th>
            <th className="px-4 py-3 font-medium">Target Segment</th>
          </tr>
        </thead>
        <tbody>
          {pricing.map((p) => (
            <tr
              key={p.type}
              className="border-b border-zinc-800/50 hover:bg-zinc-800/30"
            >
              <td className="px-4 py-3">
                <div className="font-medium text-white">{p.name}</div>
                <div className="text-xs text-zinc-500">{p.description}</div>
              </td>
              <td className="px-4 py-3 font-mono text-zinc-300">
                ${p.monthlyPrice}/mo
              </td>
              <td className="px-4 py-3 font-mono text-indigo-300">
                ${p.annualMonthlyPrice}/mo
              </td>
              <td className="px-4 py-3 text-zinc-400">{p.targetSegment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface TamBreakdownTableProps {
  breakdown: LicenseTamBreakdown[];
  totalAnnual: number;
}

export function TamBreakdownTable({ breakdown, totalAnnual }: TamBreakdownTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/50">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-800 text-zinc-400">
            <th className="px-4 py-3 font-medium">License Type</th>
            <th className="px-4 py-3 text-right font-medium">Seats</th>
            <th className="px-4 py-3 text-right font-medium">Monthly</th>
            <th className="px-4 py-3 text-right font-medium">Annual</th>
            <th className="px-4 py-3 text-right font-medium">% of TAM</th>
          </tr>
        </thead>
        <tbody>
          {breakdown.map((row) => (
            <tr
              key={row.type}
              className="border-b border-zinc-800/50 hover:bg-zinc-800/30"
            >
              <td className="px-4 py-3 font-medium text-white">{row.name}</td>
              <td className="px-4 py-3 text-right font-mono text-zinc-300">
                {formatNumber(row.seats)}
              </td>
              <td className="px-4 py-3 text-right font-mono text-zinc-300">
                {formatCurrency(row.monthlyRevenue)}
              </td>
              <td className="px-4 py-3 text-right font-mono text-indigo-300">
                {formatCurrency(row.annualRevenue)}
              </td>
              <td className="px-4 py-3 text-right font-mono text-zinc-400">
                {row.percentage.toFixed(1)}%
              </td>
            </tr>
          ))}
          <tr className="bg-indigo-500/10 font-semibold">
            <td className="px-4 py-3 text-white">Total</td>
            <td className="px-4 py-3 text-right font-mono text-white">
              {formatNumber(breakdown.reduce((s, r) => s + r.seats, 0))}
            </td>
            <td className="px-4 py-3 text-right font-mono text-white">
              {formatCurrency(breakdown.reduce((s, r) => s + r.monthlyRevenue, 0))}
            </td>
            <td className="px-4 py-3 text-right font-mono text-indigo-300">
              {formatCurrency(totalAnnual)}
            </td>
            <td className="px-4 py-3 text-right font-mono text-white">100%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
