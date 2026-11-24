"use client";

import { useInventory } from "@/hooks/useInventory";
import StatsCard from "@/components/overview/StatsCard";

export default function OverviewPage() {
  const { stats, isLoading, isError } = useInventory();

  if (isLoading) return <p className="text-center mt-10">Loading overview...</p>;
  if (isError) return <p className="text-center mt-10 text-[#4b4848]">Something went wrong.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard label="Total Products" value={stats.totalProducts} color="bg-[#fcf3ee] border-[#f0dcd0]" />
      <StatsCard label="In Stock" value={stats.inStock} color="bg-[#fdeeee] border-[#f5cfcf]" />
      <StatsCard label="Low Stock" value={stats.lowStock} color="bg-[#fefbea] border-[#f8f0c8]" />
      <StatsCard label="Sold Out" value={stats.soldOut} color="bg-[#f3f4f6] border-[#d1d5db]" />
    </div>
  );
}