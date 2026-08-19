import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-8">
        <span className="text-[#FF6B00]">❇</span>
        <span>404 - PAGE NOT FOUND</span>
      </div>
      <h1 className="font-sora font-black text-6xl md:text-8xl tracking-tight mb-4">
        404
      </h1>
      <p className="text-gray-400 text-base md:text-lg max-w-md mb-8">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-white text-black font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-gray-200 transition-all shadow-lg"
      >
        Back to Home
      </Link>
    </div>
  );
}
