import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#F8FAFC]">
      <h1 className="text-6xl font-bold text-[#C2416C]">404</h1>
      <p className="text-[#6B7280]">This page does not exist.</p>
      <Button asChild>
        <Link href="/">Back to Overview</Link>
      </Button>
    </div>
  );
}