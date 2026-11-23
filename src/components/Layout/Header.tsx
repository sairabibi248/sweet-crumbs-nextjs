"use client";

import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/": "Overview",
  "/inventory": "Inventory",
  "/orders": "Orders",
  "/recipes": "Recipes",
};

const Header = () => {
  const pathname = usePathname();
  const title = titles[pathname] ?? "Sweet Crumbs";

  return (
    <header className="sticky top-0 z-10 flex justify-between items-center bg-white py-4 px-6 border-b border-[#E5E7EB] dark:bg-[#18191C] dark:border-[#2A2B30]">
      <h1 className="text-2xl font-bold text-[#111827] dark:text-[#F4F4F5]">{title}</h1>
    </header>
  );
};

export default Header;