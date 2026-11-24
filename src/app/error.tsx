'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application route error:', error);
  }, [error]);

  return (
    <main className="min-h-screen w-full bg-[#080808] text-white flex items-center justify-center px-6 py-24">
      <div className="max-w-lg w-full border border-white/10 bg-[#111111] p-8 sm:p-10 space-y-6">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#9CFF00] block">
          [RUNTIME RECOVERY]
        </span>

        <h1 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-white">
          Something interrupted this view.
        </h1>

        <p className="font-body text-sm text-zinc-400 leading-relaxed">
          An unexpected error occurred while rendering this page. You can retry safely or return to the homepage.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={reset}
            className="chamfer-btn bg-[#9CFF00] hover:bg-[#B4FF3D] text-black font-mono font-bold text-xs tracking-[0.16em] uppercase px-6 py-3.5 transition-colors cursor-pointer"
          >
            TRY AGAIN &gt;
          </button>

          <Link
            href="/"
            className="border border-white/20 hover:border-[#9CFF00] text-white hover:text-[#9CFF00] font-mono text-xs tracking-[0.16em] uppercase px-6 py-3.5 transition-colors"
          >
            BACK HOME
          </Link>
        </div>
      </div>
    </main>
  );
}
