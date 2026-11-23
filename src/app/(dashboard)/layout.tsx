import Sidebar from "@/components/Layout/Sidebar";
import Header from "@/components/Layout/Header";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-[#F8FAFC] text-[#111827] dark:bg-[#111214] dark:text-[#F4F4F5]">
          {children}
        </main>
      </div>
    </div>
  );
}