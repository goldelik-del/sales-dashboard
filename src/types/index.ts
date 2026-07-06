export type AustralianState = "NSW" | "VIC" | "QLD" | "WA" | "SA" | "ACT" | "TAS" | "NT";

export type Industry =
  | "Fintech"
  | "SaaS"
  | "HealthTech"
  | "DevTools"
  | "Cybersecurity"
  | "AI/ML"
  | "E-commerce"
  | "HR Tech"
  | "PropTech"
  | "AgTech"
  | "Gaming"
  | "Consulting"
  | "EdTech"
  | "MarTech"
  | "Other";

export type CompanySize = "startup" | "growth" | "scale";

export type LicenseType =
  | "pro"
  | "pro_plus"
  | "ultra"
  | "teams_standard"
  | "teams_premium"
  | "enterprise";

export interface Account {
  id: string;
  name: string;
  city: string;
  state: AustralianState;
  industry: Industry;
  totalEmployees: number;
  engineers: number;
  founded: number;
  website: string;
  size: CompanySize;
  notes?: string;
}

export interface LicensePricing {
  type: LicenseType;
  name: string;
  monthlyPrice: number;
  annualMonthlyPrice: number;
  description: string;
  targetSegment: string;
}

export interface LicenseAllocation {
  type: LicenseType;
  percentage: number;
}

export interface TamScenario {
  id: string;
  name: string;
  description: string;
  penetrationRate: number;
  allocations: LicenseAllocation[];
}

export interface LicenseTamBreakdown {
  type: LicenseType;
  name: string;
  seats: number;
  monthlyRevenue: number;
  annualRevenue: number;
  percentage: number;
}

export interface TamSummary {
  totalAccounts: number;
  totalEngineers: number;
  totalEmployees: number;
  monthlyTam: number;
  annualTam: number;
  byLicense: LicenseTamBreakdown[];
  byState: Record<AustralianState, { accounts: number; engineers: number; annualTam: number }>;
  byIndustry: Record<string, { accounts: number; engineers: number; annualTam: number }>;
  bySize: Record<CompanySize, { accounts: number; engineers: number; annualTam: number }>;
}
