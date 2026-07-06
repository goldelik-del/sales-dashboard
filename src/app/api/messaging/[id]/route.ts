import { getAccountById } from "@/lib/accounts";
import { getAccountIntelligence } from "@/data/account-intelligence";
import { generateSalesMessage } from "@/lib/messaging";
import { calculateAccountTam } from "@/lib/tam";
import type { LicenseType } from "@/types";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const account = getAccountById(id);

  if (!account) {
    return NextResponse.json({ error: "Account not found" }, { status: 404 });
  }

  const intelligence = getAccountIntelligence(id);
  if (!intelligence) {
    return NextResponse.json(
      { error: "Messaging is available for top 10 accounts only" },
      { status: 404 }
    );
  }

  let body: { sku?: LicenseType; annualTam?: number } = {};
  try {
    body = await request.json();
  } catch {
    // use defaults
  }

  const sku = body.sku ?? "teams_standard";
  const tam = calculateAccountTam(account, sku);
  const annualTam = body.annualTam ?? tam.annualTam;

  // Brief delay so generation feels intentional
  await new Promise((r) => setTimeout(r, 800));

  const result = generateSalesMessage(account, intelligence, {
    sku,
    annualTam,
  });

  return NextResponse.json(result);
}
