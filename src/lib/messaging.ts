import type { Account } from "@/types";
import type { AccountIntelligence } from "@/data/account-intelligence";
import { getAccountIntelligence } from "@/data/account-intelligence";
import { skuLabel } from "@/lib/tam";
import type { LicenseType } from "@/types";

const MAX_WORDS = 200;

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function truncateToWords(text: string, maxWords: number): string {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return text.trim();
  return words.slice(0, maxWords).join(" ") + "…";
}

export interface GeneratedMessage {
  message: string;
  wordCount: number;
  sources: { label: string; url: string }[];
}

export function generateSalesMessage(
  account: Account,
  intelligence: AccountIntelligence,
  options?: { sku?: LicenseType; annualTam?: number }
): GeneratedMessage {
  const sku = options?.sku ?? "teams_standard";
  const newsHook = intelligence.recentNews[0];
  const reportHook = intelligence.annualReportHighlights[0];
  const angle = intelligence.cursorAngles[0];
  const tamLine =
    options?.annualTam && options.annualTam > 0
      ? ` With ~${account.engineers} engineers, a ${skuLabel(sku)} rollout is a focused investment in measurable velocity.`
      : ` With ~${account.engineers} engineers in Australia, the ROI case is straightforward.`;

  const draft = `Hi team,

I've been following ${account.name}'s momentum — ${newsHook.charAt(0).toLowerCase() + newsHook.slice(1)} Your ${reportHook.charAt(0).toLowerCase() + reportHook.slice(1)}

That trajectory is exactly where Cursor Teams helps: ${angle}. Cursor gives your engineers AI-native IDE workflows with Composer agents, repo-aware context, and enterprise controls (SSO, admin dashboards, spend limits) — so you scale AI-assisted development without losing governance.${tamLine}

Companies at your stage typically see faster shipping on integrations, less boilerplate toil, and better consistency across squads — especially as agent-driven development becomes the default.

Would you be open to a 20-minute walkthrough with your engineering leadership? Happy to share how similar AU scale-ups are rolling out Teams Standard and Premium seats.

Best,
[Your name]`;

  const message = truncateToWords(draft, MAX_WORDS);

  return {
    message,
    wordCount: countWords(message),
    sources: intelligence.sources,
  };
}

export function generateSalesMessageForAccount(
  account: Account,
  options?: { sku?: LicenseType; annualTam?: number }
): GeneratedMessage | null {
  const intelligence = getAccountIntelligence(account.id);
  if (!intelligence) return null;
  return generateSalesMessage(account, intelligence, options);
}
