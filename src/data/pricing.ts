import type { LicensePricing } from "@/types";

/** Cursor pricing as of July 2026 — https://cursor.com/docs/account/teams/pricing */
export const CURSOR_PRICING: LicensePricing[] = [
  {
    type: "pro",
    name: "Pro",
    monthlyPrice: 20,
    annualMonthlyPrice: 16,
    description: "Individual plan with $20 in credits, unlimited Auto + Tab",
    targetSegment: "Solo developers, side projects, students",
  },
  {
    type: "pro_plus",
    name: "Pro+",
    monthlyPrice: 60,
    annualMonthlyPrice: 48,
    description: "3× Pro credit pool for heavy daily Agent users",
    targetSegment: "Power individual users",
  },
  {
    type: "ultra",
    name: "Ultra",
    monthlyPrice: 200,
    annualMonthlyPrice: 160,
    description: "20× Pro credit pool ($400 in credits)",
    targetSegment: "Full-time devs running Agents constantly",
  },
  {
    type: "teams_standard",
    name: "Teams Standard",
    monthlyPrice: 40,
    annualMonthlyPrice: 32,
    description: "Standard Teams seat with Composer + API usage pools, SSO, admin controls",
    targetSegment: "Business teams — default seat for most engineers",
  },
  {
    type: "teams_premium",
    name: "Teams Premium",
    monthlyPrice: 120,
    annualMonthlyPrice: 96,
    description: "5× Standard usage at 3× cost — for heavy agent workloads",
    targetSegment: "Power users on business teams",
  },
  {
    type: "enterprise",
    name: "Enterprise",
    monthlyPrice: 55,
    annualMonthlyPrice: 44,
    description: "Custom pricing — estimated at ~$55/seat with pooled usage, SCIM, invoicing",
    targetSegment: "Orgs 100+ engineers needing governance & pooled usage",
  },
];

export const PRICING_BY_TYPE = Object.fromEntries(
  CURSOR_PRICING.map((p) => [p.type, p])
) as Record<string, LicensePricing>;

export const DEFAULT_SKU = "teams_standard" as const;
