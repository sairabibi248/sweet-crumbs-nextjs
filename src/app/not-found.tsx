import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#F8FAFC]">
      <h1 className="text-6xl font-bold text-[#C2416C]">404</h1>
      <p className="text-[#6B7280]">This page does not exist.</p>
      <Link
        href="/"
        className="px-4 py-2 rounded-lg bg-[#C2416C] text-white text-sm font-medium hover:bg-[#A8345B]"
      >
        Back to Overview
      </Link>
    </div>
  );
}