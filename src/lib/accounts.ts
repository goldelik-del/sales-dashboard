import { FILTERED_ACCOUNTS } from "@/data/accounts";
import { TAM_SCENARIOS } from "@/data/pricing";
import { calculateAccountTam } from "@/lib/tam";
import type { Account, AccountTamSummary } from "@/types";

const DEFAULT_SCENARIO_ID = "base";

export function getTopAccounts(limit = 10, scenarioId = DEFAULT_SCENARIO_ID): AccountTamSummary[] {
  const scenario = TAM_SCENARIOS.find((s) => s.id === scenarioId) ?? TAM_SCENARIOS[1];

  return FILTERED_ACCOUNTS.map((account) => calculateAccountTam(account, scenario))
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

export function accountSlug(account: Account): string {
  return account.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
