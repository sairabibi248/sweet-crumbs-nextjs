"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

const titles: Record<string, string> = {
  "/": "Overview",
  "/inventory": "Inventory",
  "/orders": "Orders",
  "/recipes": "Recipes",
};

const Header = () => {
  const pathname = usePathname();
  const title = titles[pathname] ?? "Sweet Crumbs";

  const router = useRouter();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-10 flex justify-between items-center bg-white py-4 px-6 border-b border-[#E5E7EB] dark:bg-[#18191C] dark:border-[#2A2B30]">
      <h1 className="text-2xl font-bold text-[#111827] dark:text-[#F4F4F5]">{title}</h1>

      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={toggleTheme} className="cursor-pointer hover:border-[#C2416C]">
          {theme === "light" ? "Dark" : "Light"}
        </Button>

        <Button onClick={handleLogout} className="cursor-pointer  hover:bg-[#A8345B]">
          Log Out
        </Button>
      </div>
    </header>
  );
};

export default Header;