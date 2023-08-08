import { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/sidebar-nav";
import { UserNav } from "@/components/user-nav";

export const metadata: Metadata = {
  title: "RoarSQL - App",
  description:
    "Elevate Query Writing: RoarSQL's Natural Language AI Assistant for Developers",
};

const sidebarNavItems = [
  {
    title: "Query",
    href: "/app",
  },
  {
    title: "History",
    href: "/app/history",
  },
  {
    title: "Schemas",
    href: "/app/schemas",
  },
  {
    title: "Settings",
    href: "/app/settings",
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <div className='space-y-6 p-10 pb-16 md:block'>
        <div className='flex items-center justify-between space-y-0.5'>
          <h2 className='text-lg w-fit font-extrabold tracking-tight text-center text-transparent bg-clip-text bg-gradient-to-br from-slate-600 to-slate-100'>
            RoarSQL
          </h2>

          <UserNav />
        </div>
        <Separator className='my-6' />
        <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <aside className='-mx-4 lg:w-1/5'>
            <SidebarNav items={sidebarNavItems} />
          </aside>

          <div className='flex-1 lg:max-w-2xl'>{children}</div>
        </div>
      </div>
    </>
  );
}
