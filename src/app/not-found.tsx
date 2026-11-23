import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center px-6 py-24 text-center">
      <span className="inline-block bg-[#E5E5E5] text-black font-mono text-[10px] font-bold tracking-[0.16em] uppercase px-3 py-1 mb-8">
        [404 / NOT FOUND]
      </span>
      <h1 className="font-display font-medium text-7xl sm:text-9xl tracking-[-0.04em] leading-none mb-4">
        404<span className="text-[#9CFF00]">_</span>
      </h1>
      <p className="font-body text-zinc-400 text-sm sm:text-base max-w-md mb-10">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="chamfer-btn inline-flex items-center gap-2 bg-[#9CFF00] hover:bg-[#B4FF3D] text-black font-mono font-bold text-xs uppercase tracking-[0.14em] px-8 py-4 transition-colors"
      >
        <span>BACK TO HOME</span>
        <span>&gt;</span>
      </Link>
    </div>
  );
}
