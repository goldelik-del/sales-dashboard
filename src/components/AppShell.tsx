"use client";

import { BillingToggle, SkuSelector } from "@/context/AppContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const NAV = [
  { href: "/", label: "Overview", icon: "◈" },
  { href: "/accounts", label: "Top 10 Accounts", icon: "★" },
  { href: "/tam", label: "TAM by SKU", icon: "▦" },
];

interface AppShellProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function AppShell({ children, title, subtitle }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#08080f] text-white">
      <aside className="fixed inset-y-0 left-0 z-30 flex w-60 flex-col border-r border-zinc-800/80 bg-[#0c0c14]">
        <div className="flex items-center gap-3 border-b border-zinc-800 px-5 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-lg font-bold shadow-lg shadow-indigo-500/20">
            C
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">Cursor TAM</p>
            <p className="text-[10px] text-zinc-500">Australia · ≤250 eng</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                  active
                    ? "bg-indigo-500/15 font-medium text-indigo-300"
                    : "text-zinc-400 hover:bg-zinc-800/60 hover:text-white"
                }`}
              >
                <span className="w-4 text-center text-xs opacity-70">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-zinc-800 p-4 space-y-3">
          <div>
            <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-wider text-zinc-500">
              License SKU
            </label>
            <SkuSelector className="w-full" />
          </div>
          <div>
            <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-wider text-zinc-500">
              Billing
            </label>
            <BillingToggle className="w-full" />
          </div>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col pl-60">
        <header className="sticky top-0 z-20 border-b border-zinc-800/80 bg-[#08080f]/90 backdrop-blur-md">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                {title ?? "Australia TAM Dashboard"}
              </h1>
              {subtitle && (
                <p className="mt-0.5 text-sm text-zinc-500">{subtitle}</p>
              )}
            </div>
            <div className="hidden items-center gap-3 md:flex">
              <span className="rounded-full border border-zinc-700 bg-zinc-800/50 px-3 py-1 text-xs text-zinc-400">
                TAM = SKU price × engineers
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 px-8 py-6">{children}</main>

        <footer className="border-t border-zinc-800 px-8 py-4 text-center text-xs text-zinc-600">
          Engineer counts are estimates · Pricing per{" "}
          <a
            href="https://cursor.com/docs/account/teams/pricing"
            className="text-indigo-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            cursor.com/docs
          </a>{" "}
          · July 2026
        </footer>
      </div>
    </div>
  );
}
