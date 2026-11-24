'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#080808] text-white font-sans antialiased min-h-screen flex items-center justify-center px-6">
        <div className="max-w-lg w-full border border-white/10 bg-[#111111] p-8 sm:p-10 space-y-6">
          <span className="font-mono text-xs tracking-[0.18em] uppercase text-[#9CFF00] block">
            [SYSTEM ERROR]
          </span>
          <h1 className="text-3xl font-medium tracking-tight text-white">
            Unexpected application error.
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed">
            The application hit an unexpected state. Reload to recover cleanly.
          </p>
          <button
            type="button"
            onClick={reset}
            className="bg-[#9CFF00] hover:bg-[#B4FF3D] text-black font-mono font-bold text-xs tracking-[0.16em] uppercase px-6 py-3.5 transition-colors cursor-pointer"
          >
            RELOAD SITE &gt;
          </button>
        </div>
      </body>
    </html>
  );
}
