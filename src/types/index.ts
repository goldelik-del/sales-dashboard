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

export type LeadershipLevel = "director" | "senior_director" | "head" | "vp" | "svp" | "cto";

export interface LeadershipContact {
  id: string;
  accountId: string;
  name: string;
  title: string;
  linkedinUrl: string;
  level: LeadershipLevel;
  location?: string;
}

export interface CompanyProfile {
  accountId: string;
  linkedinCompanyUrl: string;
  logoUrl: string;
}

export interface LicensePricing {
  type: LicenseType;
  name: string;
  monthlyPrice: number;
  annualMonthlyPrice: number;
  description: string;
  targetSegment: string;
}

export interface LicenseTamBreakdown {
  type: LicenseType;
  name: string;
  seats: number;
  unitPrice: number;
  monthlyRevenue: number;
  annualRevenue: number;
  percentage: number;
}

export interface TamSummary {
  totalAccounts: number;
  totalEngineers: number;
  totalEmployees: number;
  selectedSku: LicenseType;
  monthlyTam: number;
  annualTam: number;
  bySku: LicenseTamBreakdown[];
  byState: Record<AustralianState, { accounts: number; engineers: number; annualTam: number }>;
  byIndustry: Record<string, { accounts: number; engineers: number; annualTam: number }>;
  bySize: Record<CompanySize, { accounts: number; engineers: number; annualTam: number }>;
}

export interface AccountTamSummary {
  account: Account;
  rank: number;
  engineers: number;
  selectedSku: LicenseType;
  bySku: LicenseTamBreakdown[];
  monthlyTam: number;
  annualTam: number;
  engineerRatio: number;
  headcount: { engineers: number; other: number };
}

export type AppView = "overview" | "top-accounts" | "all-accounts" | "sku-tam";
