import Link from "next/link";

export default function AccountNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0c0c14] text-white">
      <h1 className="text-2xl font-bold">Account not found</h1>
      <p className="mt-2 text-zinc-500">This account is not in the target list.</p>
      <Link
        href="/"
        className="mt-6 text-sm text-indigo-400 hover:underline"
      >
        ← Back to dashboard
      </Link>
    </div>
  );
}
