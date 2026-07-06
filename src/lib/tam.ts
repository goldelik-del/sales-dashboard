import { PRICING_BY_TYPE } from "@/data/pricing";
import type {
  Account,
  AustralianState,
  CompanySize,
  LicenseTamBreakdown,
  LicenseType,
  TamScenario,
  TamSummary,
} from "@/types";

const STATES: AustralianState[] = ["NSW", "VIC", "QLD", "WA", "SA", "ACT", "TAS", "NT"];
const SIZES: CompanySize[] = ["startup", "growth", "scale"];

function allocateSeats(
  totalEngineers: number,
  penetrationRate: number,
  allocations: TamScenario["allocations"]
): Map<LicenseType, number> {
  const addressableEngineers = Math.round(totalEngineers * penetrationRate);
  const seatMap = new Map<LicenseType, number>();

  let assigned = 0;
  for (let i = 0; i < allocations.length; i++) {
    const { type, percentage } = allocations[i];
    const seats =
      i === allocations.length - 1
        ? addressableEngineers - assigned
        : Math.round(addressableEngineers * percentage);
    seatMap.set(type, seats);
    assigned += seats;
  }

  return seatMap;
}

export function calculateTam(
  accounts: Account[],
  scenario: TamScenario,
  useAnnualBilling = true
): TamSummary {
  const totalEngineers = accounts.reduce((sum, a) => sum + a.engineers, 0);
  const totalEmployees = accounts.reduce((sum, a) => sum + a.totalEmployees, 0);

  const seatMap = allocateSeats(totalEngineers, scenario.penetrationRate, scenario.allocations);

  let monthlyTam = 0;
  let annualTam = 0;
  const byLicense: LicenseTamBreakdown[] = [];

  for (const [type, seats] of seatMap) {
    const pricing = PRICING_BY_TYPE[type];
    const pricePerSeat = useAnnualBilling ? pricing.annualMonthlyPrice : pricing.monthlyPrice;
    const monthly = seats * pricePerSeat;
    const annual = monthly * 12;

    monthlyTam += monthly;
    annualTam += annual;

    byLicense.push({
      type,
      name: pricing.name,
      seats,
      monthlyRevenue: monthly,
      annualRevenue: annual,
      percentage: 0,
    });
  }

  for (const item of byLicense) {
    item.percentage = annualTam > 0 ? (item.annualRevenue / annualTam) * 100 : 0;
  }

  byLicense.sort((a, b) => b.annualRevenue - a.annualRevenue);

  const byState = Object.fromEntries(
    STATES.map((state) => {
      const stateAccounts = accounts.filter((a) => a.state === state);
      const engineers = stateAccounts.reduce((s, a) => s + a.engineers, 0);
      const stateSeats = allocateSeats(engineers, scenario.penetrationRate, scenario.allocations);
      let stateAnnual = 0;
      for (const [type, seats] of stateSeats) {
        const pricing = PRICING_BY_TYPE[type];
        const price = useAnnualBilling ? pricing.annualMonthlyPrice : pricing.monthlyPrice;
        stateAnnual += seats * price * 12;
      }
      return [state, { accounts: stateAccounts.length, engineers, annualTam: stateAnnual }];
    })
  ) as TamSummary["byState"];

  const industries = [...new Set(accounts.map((a) => a.industry))];
  const byIndustry = Object.fromEntries(
    industries.map((industry) => {
      const indAccounts = accounts.filter((a) => a.industry === industry);
      const engineers = indAccounts.reduce((s, a) => s + a.engineers, 0);
      const indSeats = allocateSeats(engineers, scenario.penetrationRate, scenario.allocations);
      let indAnnual = 0;
      for (const [type, seats] of indSeats) {
        const pricing = PRICING_BY_TYPE[type];
        const price = useAnnualBilling ? pricing.annualMonthlyPrice : pricing.monthlyPrice;
        indAnnual += seats * price * 12;
      }
      return [industry, { accounts: indAccounts.length, engineers, annualTam: indAnnual }];
    })
  );

  const bySize = Object.fromEntries(
    SIZES.map((size) => {
      const sizeAccounts = accounts.filter((a) => a.size === size);
      const engineers = sizeAccounts.reduce((s, a) => s + a.engineers, 0);
      const sizeSeats = allocateSeats(engineers, scenario.penetrationRate, scenario.allocations);
      let sizeAnnual = 0;
      for (const [type, seats] of sizeSeats) {
        const pricing = PRICING_BY_TYPE[type];
        const price = useAnnualBilling ? pricing.annualMonthlyPrice : pricing.monthlyPrice;
        sizeAnnual += seats * price * 12;
      }
      return [size, { accounts: sizeAccounts.length, engineers, annualTam: sizeAnnual }];
    })
  ) as TamSummary["bySize"];

  return {
    totalAccounts: accounts.length,
    totalEngineers,
    totalEmployees,
    monthlyTam,
    annualTam,
    byLicense,
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
