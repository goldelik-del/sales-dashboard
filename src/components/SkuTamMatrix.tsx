"use client";

import type { LicenseTamBreakdown } from "@/types";
import { formatCurrency, formatNumber } from "@/lib/tam";
import { PRICING_BY_TYPE } from "@/data/pricing";
import type { LicenseType } from "@/types";

interface SkuTamMatrixProps {
  breakdown: LicenseTamBreakdown[];
  selectedSku: LicenseType;
  onSelectSku?: (sku: LicenseType) => void;
  compact?: boolean;
}

export function SkuTamMatrix({
  breakdown,
  selectedSku,
  onSelectSku,
  compact = false,
}: SkuTamMatrixProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40">
      <div className="border-b border-zinc-800 px-4 py-3">
        <h3 className="font-semibold text-white">TAM by SKU</h3>
        <p className="text-xs text-zinc-500">
          Each row = unit price × {formatNumber(breakdown[0]?.seats ?? 0)} engineers
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-xs text-zinc-500">
              <th className="px-4 py-2.5 font-medium">SKU</th>
              <th className="px-4 py-2.5 text-right font-medium">Unit/mo</th>
              <th className="px-4 py-2.5 text-right font-medium">Seats</th>
              <th className="px-4 py-2.5 text-right font-medium">Monthly TAM</th>
              {!compact && (
                <th className="px-4 py-2.5 text-right font-medium">Annual TAM</th>
              )}
            </tr>
          </thead>
          <tbody>
            {breakdown.map((row) => {
              const isSelected = row.type === selectedSku;
              const pricing = PRICING_BY_TYPE[row.type];

              return (
                <tr
                  key={row.type}
                  onClick={() => onSelectSku?.(row.type)}
                  className={`border-b border-zinc-800/40 transition-colors ${
                    onSelectSku ? "cursor-pointer hover:bg-zinc-800/40" : ""
                  } ${isSelected ? "bg-indigo-500/10" : ""}`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {isSelected && (
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                      )}
                      <div>
                        <p className="font-medium text-white">{row.name}</p>
                        {!compact && (
                          <p className="text-xs text-zinc-500">{pricing.targetSegment}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-zinc-300">
                    {formatCurrency(row.unitPrice)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-zinc-400">
                    {formatNumber(row.seats)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-white">
                    {formatCurrency(row.monthlyRevenue)}
                  </td>
                  {!compact && (
                    <td className="px-4 py-3 text-right font-mono text-indigo-300">
                      {formatCurrency(row.annualRevenue)}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface SkuTamCardsProps {
  breakdown: LicenseTamBreakdown[];
  selectedSku: LicenseType;
  onSelectSku?: (sku: LicenseType) => void;
}

export function SkuTamCards({ breakdown, selectedSku, onSelectSku }: SkuTamCardsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {breakdown.map((row) => {
        const isSelected = row.type === selectedSku;
        return (
          <button
            key={row.type}
            type="button"
            onClick={() => onSelectSku?.(row.type)}
            className={`rounded-xl border p-4 text-left transition-all ${
              isSelected
                ? "border-indigo-500/50 bg-indigo-500/10 ring-1 ring-indigo-500/30"
                : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"
            }`}
          >
            <p className="text-sm text-zinc-400">{row.name}</p>
            <p className="mt-1 text-xl font-bold text-white">
              {formatCurrency(row.annualRevenue, true)}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              {formatCurrency(row.unitPrice)}/seat × {formatNumber(row.seats)} eng/yr
            </p>
          </button>
        );
      })}
    </div>
  );
}
