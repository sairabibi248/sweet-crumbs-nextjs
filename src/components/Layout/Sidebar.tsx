"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Overview", path: "/" },
  { name: "Inventory", path: "/inventory" },
  { name: "Orders", path: "/orders" },
  { name: "Recipes", path: "/recipes" },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#1F2937] p-5 dark:bg-[#0B0C0E]">
      <div className="flex items-center gap-3 mb-8">
        <Image
          src="/favicon.png"
          alt="Sweet Crumbs Logo"
          width={48}
          height={48}
          className="w-12 h-12 rounded-full bg-white"
        />
        <h1 className="text-[20px] font-bold text-white">Sweet Crumbs</h1>
      </div>

      <ul className="flex flex-col gap-4 mt-6">
        {links.map((link) => {
          const isActive =
            link.path === "/" ? pathname === "/" : pathname.startsWith(link.path);

          return (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`block ml-6 mr-6 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "bg-[#C2416C] text-white"
                    : "text-[#D1D5DB] hover:bg-[#374151] hover:text-white hover:pl-6"
                }`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;