import { CURSOR_PRICING, PRICING_BY_TYPE } from "@/data/pricing";
import type {
  Account,
  AccountTamSummary,
  AustralianState,
  CompanySize,
  LicenseTamBreakdown,
  LicenseType,
  TamSummary,
} from "@/types";

const STATES: AustralianState[] = ["NSW", "VIC", "QLD", "WA", "SA", "ACT", "TAS", "NT"];
const SIZES: CompanySize[] = ["startup", "growth", "scale"];

/** TAM per SKU = unit price × engineering headcount */
export function calculateSkuBreakdown(
  engineers: number,
  useAnnualBilling = true
): LicenseTamBreakdown[] {
  return CURSOR_PRICING.map((pricing) => {
    const unitPrice = useAnnualBilling ? pricing.annualMonthlyPrice : pricing.monthlyPrice;
    const monthlyRevenue = unitPrice * engineers;
    const annualRevenue = monthlyRevenue * 12;

    return {
      type: pricing.type,
      name: pricing.name,
      seats: engineers,
      unitPrice,
      monthlyRevenue,
      annualRevenue,
      percentage: 0,
    };
  });
}

export function getSkuTam(
  engineers: number,
  sku: LicenseType,
  useAnnualBilling = true
): LicenseTamBreakdown {
  return calculateSkuBreakdown(engineers, useAnnualBilling).find((s) => s.type === sku)!;
}

function tamForEngineers(
  engineers: number,
  sku: LicenseType,
  useAnnualBilling: boolean
) {
  const row = getSkuTam(engineers, sku, useAnnualBilling);
  return { monthlyTam: row.monthlyRevenue, annualTam: row.annualRevenue };
}

export function calculateAccountTam(
  account: Account,
  sku: LicenseType = "teams_standard",
  useAnnualBilling = true
): AccountTamSummary {
  const bySku = calculateSkuBreakdown(account.engineers, useAnnualBilling);
  const selected = getSkuTam(account.engineers, sku, useAnnualBilling);

  return {
    account,
    rank: 0,
    engineers: account.engineers,
    selectedSku: sku,
    bySku,
    monthlyTam: selected.monthlyRevenue,
    annualTam: selected.annualRevenue,
    engineerRatio:
      account.totalEmployees > 0 ? account.engineers / account.totalEmployees : 0,
    headcount: {
      engineers: account.engineers,
      other: Math.max(0, account.totalEmployees - account.engineers),
    },
  };
}

export function calculateTam(
  accounts: Account[],
  sku: LicenseType = "teams_standard",
  useAnnualBilling = true
): TamSummary {
  const totalEngineers = accounts.reduce((sum, a) => sum + a.engineers, 0);
  const totalEmployees = accounts.reduce((sum, a) => sum + a.totalEmployees, 0);
  const bySku = calculateSkuBreakdown(totalEngineers, useAnnualBilling);
  const selected = getSkuTam(totalEngineers, sku, useAnnualBilling);

  const byState = Object.fromEntries(
    STATES.map((state) => {
      const stateAccounts = accounts.filter((a) => a.state === state);
      const engineers = stateAccounts.reduce((s, a) => s + a.engineers, 0);
      const { annualTam } = tamForEngineers(engineers, sku, useAnnualBilling);
      return [state, { accounts: stateAccounts.length, engineers, annualTam }];
    })
  ) as TamSummary["byState"];

  const industries = [...new Set(accounts.map((a) => a.industry))];
  const byIndustry = Object.fromEntries(
    industries.map((industry) => {
      const indAccounts = accounts.filter((a) => a.industry === industry);
      const engineers = indAccounts.reduce((s, a) => s + a.engineers, 0);
      const { annualTam } = tamForEngineers(engineers, sku, useAnnualBilling);
      return [industry, { accounts: indAccounts.length, engineers, annualTam }];
    })
  );

  const bySize = Object.fromEntries(
    SIZES.map((size) => {
      const sizeAccounts = accounts.filter((a) => a.size === size);
      const engineers = sizeAccounts.reduce((s, a) => s + a.engineers, 0);
      const { annualTam } = tamForEngineers(engineers, sku, useAnnualBilling);
      return [size, { accounts: sizeAccounts.length, engineers, annualTam }];
    })
  ) as TamSummary["bySize"];

  return {
    totalAccounts: accounts.length,
    totalEngineers,
    totalEmployees,
    selectedSku: sku,
    monthlyTam: selected.monthlyRevenue,
    annualTam: selected.annualRevenue,
    bySku,
    byState,
    byIndustry,
    bySize,
  };
}

export function formatCurrency(value: number, compact = false): string {
  if (compact && value >= 1_000_000) {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  }
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-AU").format(value);
}

export function skuLabel(type: LicenseType): string {
  return PRICING_BY_TYPE[type]?.name ?? type;
}
