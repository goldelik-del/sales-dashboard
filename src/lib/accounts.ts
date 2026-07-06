import { FILTERED_ACCOUNTS } from "@/data/accounts";
import { DEFAULT_SKU } from "@/data/pricing";
import { calculateAccountTam } from "@/lib/tam";
import type { Account, AccountTamSummary, LicenseType } from "@/types";

export function getTopAccounts(
  limit = 10,
  sku: LicenseType = DEFAULT_SKU
): AccountTamSummary[] {
  return FILTERED_ACCOUNTS.map((account) => calculateAccountTam(account, sku))
    .sort((a, b) => {
      if (b.account.engineers !== a.account.engineers) {
        return b.account.engineers - a.account.engineers;
      }
      return b.annualTam - a.annualTam;
    })
    .slice(0, limit)
    .map((summary, index) => ({ ...summary, rank: index + 1 }));
}

export function getAccountById(id: string): Account | undefined {
  return FILTERED_ACCOUNTS.find((a) => a.id === id);
}

export function getTopAccountIds(): string[] {
  return getTopAccounts().map((a) => a.account.id);
}

export function isTopAccount(id: string): boolean {
  return getTopAccountIds().includes(id);
}
