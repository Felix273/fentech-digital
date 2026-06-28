import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white text-slate-950 flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <p className="text-blue-400 font-bold uppercase tracking-[0.3em] text-xs mb-6">404</p>
        <h1 className="text-5xl font-bold mb-6">That page could not be found.</h1>
        <p className="text-slate-600 text-lg mb-10">
          The address may have changed, or the page may no longer exist.
        </p>
        <Link href="/" className="inline-flex bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-xl font-bold transition-colors">
          Return home
        </Link>
      </div>
    </main>
  );
}
