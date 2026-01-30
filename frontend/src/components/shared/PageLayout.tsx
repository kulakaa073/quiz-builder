"use client";

import Link from "next/link";

type Props = {
  backHref: string;
  backLabel: string;
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
};

export default function PageLayout({ backHref, backLabel, title, children, action }: Props) {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center gap-4 flex-wrap">
          <Link
            href={backHref}
            className="text-slate-600 hover:text-slate-900 transition-colors"
            aria-label={`Back to ${backLabel}`}
          >
            ← {backLabel}
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          {action != null && <div className="ml-auto">{action}</div>}
        </div>
        {children}
      </div>
    </main>
  );
}
