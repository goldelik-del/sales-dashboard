import type { CompanyProfile } from "@/types";

function logo(domain: string) {
  return `https://logo.clearbit.com/${domain}`;
}

export const COMPANY_PROFILES: CompanyProfile[] = [
  { accountId: "1", linkedinCompanyUrl: "https://www.linkedin.com/company/airwallex/", logoUrl: logo("airwallex.com") },
  { accountId: "64", linkedinCompanyUrl: "https://www.linkedin.com/company/technologyone/", logoUrl: logo("technologyonecorp.com") },
  { accountId: "68", linkedinCompanyUrl: "https://www.linkedin.com/company/wisetech-global/", logoUrl: logo("wisetechglobal.com") },
  { accountId: "69", linkedinCompanyUrl: "https://www.linkedin.com/company/rea-group/", logoUrl: logo("rea-group.com") },
  { accountId: "70", linkedinCompanyUrl: "https://www.linkedin.com/company/xero/", logoUrl: logo("xero.com") },
  { accountId: "2", linkedinCompanyUrl: "https://www.linkedin.com/company/culture-amp/", logoUrl: logo("cultureamp.com") },
  { accountId: "40", linkedinCompanyUrl: "https://www.linkedin.com/company/factory-ai/", logoUrl: logo("factory.ai") },
  { accountId: "71", linkedinCompanyUrl: "https://www.linkedin.com/company/afterpay/", logoUrl: logo("afterpay.com") },
  { accountId: "72", linkedinCompanyUrl: "https://www.linkedin.com/company/seek/", logoUrl: logo("seek.com.au") },
  { accountId: "77", linkedinCompanyUrl: "https://www.linkedin.com/company/cochlear/", logoUrl: logo("cochlear.com") },
];

export const PROFILES_BY_ACCOUNT_ID = Object.fromEntries(
  COMPANY_PROFILES.map((p) => [p.accountId, p])
) as Record<string, CompanyProfile>;

export function getCompanyProfile(accountId: string): CompanyProfile | undefined {
  return PROFILES_BY_ACCOUNT_ID[accountId];
}

export function getLogoUrl(website: string): string {
  const domain = website.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
  return `https://logo.clearbit.com/${domain}`;
}
