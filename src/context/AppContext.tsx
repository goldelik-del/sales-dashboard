"use client";

import { CURSOR_PRICING, DEFAULT_SKU } from "@/data/pricing";
import type { LicenseType } from "@/types";
import { createContext, useContext, useState, type ReactNode } from "react";

interface AppContextValue {
  selectedSku: LicenseType;
  setSelectedSku: (sku: LicenseType) => void;
  annualBilling: boolean;
  setAnnualBilling: (annual: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedSku, setSelectedSku] = useState<LicenseType>(DEFAULT_SKU);
  const [annualBilling, setAnnualBilling] = useState(true);

  return (
    <AppContext.Provider
      value={{ selectedSku, setSelectedSku, annualBilling, setAnnualBilling }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

export function SkuSelector({ className = "" }: { className?: string }) {
  const { selectedSku, setSelectedSku } = useApp();

  return (
    <select
      value={selectedSku}
      onChange={(e) => setSelectedSku(e.target.value as LicenseType)}
      className={`rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none ${className}`}
    >
      {CURSOR_PRICING.map((p) => (
        <option key={p.type} value={p.type}>
          {p.name}
        </option>
      ))}
    </select>
  );
}

export function BillingToggle({ className = "" }: { className?: string }) {
  const { annualBilling, setAnnualBilling } = useApp();

  return (
    <div className={`flex rounded-lg border border-zinc-700 bg-zinc-800 p-0.5 ${className}`}>
      <button
        type="button"
        onClick={() => setAnnualBilling(true)}
        className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
          annualBilling ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-white"
        }`}
      >
        Annual
      </button>
      <button
        type="button"
        onClick={() => setAnnualBilling(false)}
        className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
          !annualBilling ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-white"
        }`}
      >
        Monthly
      </button>
    </div>
  );
}
