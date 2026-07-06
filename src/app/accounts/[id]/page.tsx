"use client";

import { AccountDashboard } from "@/components/AccountDashboard";
import { AppShell } from "@/components/AppShell";
import { getAccountById, getTopAccounts } from "@/lib/accounts";
import { calculateAccountTam } from "@/lib/tam";
import { useApp } from "@/context/AppContext";
import { useMemo } from "react";
import { useParams } from "next/navigation";

export default function AccountPage() {
  const params = useParams();
  const id = params.id as string;
  const { selectedSku, annualBilling } = useApp();

  const account = getAccountById(id);

  const summary = useMemo(() => {
    if (!account) return null;
    const tam = calculateAccountTam(account, selectedSku, annualBilling);
    const rank = getTopAccounts(10, selectedSku).findIndex((a) => a.account.id === id) + 1;
    return { ...tam, rank: rank || 0 };
  }, [account, selectedSku, annualBilling, id]);

  if (!account || !summary) {
    return (
      <AppShell title="Account not found">
        <p className="text-zinc-500">This account is not in the target list.</p>
      </AppShell>
    );
  }

  return (
    <AppShell
      title={account.name}
      subtitle={`${account.city}, ${account.state} · ${account.engineers} engineers`}
    >
      <AccountDashboard summary={summary} showBackLink />
    </AppShell>
  );
}
