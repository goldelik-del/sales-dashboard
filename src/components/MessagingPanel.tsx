"use client";

import { skuLabel } from "@/lib/tam";
import { useApp } from "@/context/AppContext";
import type { Account, AccountTamSummary } from "@/types";
import { useState } from "react";

interface MessagingPanelProps {
  account: Account;
  summary: AccountTamSummary;
}

export function MessagingPanel({ account, summary }: MessagingPanelProps) {
  const { selectedSku } = useApp();
  const [message, setMessage] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [sources, setSources] = useState<{ label: string; url: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGo() {
    setLoading(true);
    setError(null);
    setCopied(false);

    try {
      const res = await fetch(`/api/messaging/${account.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sku: selectedSku,
          annualTam: summary.annualTam,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Failed to generate message");
      }

      const data = await res.json();
      setMessage(data.message);
      setWordCount(data.wordCount);
      setSources(data.sources ?? []);
      setGenerated(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!message) return;
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white">Sales Messaging</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Draft a personalised outreach email for {account.name} based on recent news and annual
          report themes. Max 200 words · tailored for {skuLabel(selectedSku)}.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 py-12">
        <button
          type="button"
          onClick={handleGo}
          disabled={loading}
          className="group relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-700 text-3xl font-black tracking-widest text-white shadow-lg shadow-red-900/50 transition-all hover:scale-105 hover:from-red-500 hover:to-red-600 hover:shadow-red-700/60 disabled:scale-100 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-white" />
          ) : (
            "GO"
          )}
        </button>
        <p className="text-sm text-zinc-500">
          {loading ? "Drafting from recent news & annual reports…" : "Click to generate outreach copy"}
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {generated && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white">Draft message</h3>
              <p className="text-xs text-zinc-500">{wordCount} / 200 words · ready to paste into Gmail</p>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
            >
              {copied ? "Copied!" : "Copy to clipboard"}
            </button>
          </div>

          <textarea
            readOnly
            value={message}
            rows={14}
            className="w-full resize-y rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 font-sans text-sm leading-relaxed text-zinc-200 focus:border-indigo-500 focus:outline-none"
            onClick={(e) => (e.target as HTMLTextAreaElement).select()}
          />

          {sources.length > 0 && (
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 px-4 py-3">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
                Sources referenced
              </p>
              <ul className="space-y-1">
                {sources.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-indigo-400 hover:underline"
                    >
                      {s.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
