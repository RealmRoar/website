import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Separator } from "@/components/ui/separator";
import { TopbarNav } from "@/components/topbar-nav";
import { UserNav } from "@/components/user-nav";

export const metadata: Metadata = {
  title: "RoarSQL",
  description:
    "Elevate Query Writing: RoarSQL's Natural Language AI Assistant for Developers",
};

export const dynamic = "force-dynamic";

const sidebarNavItems = [
  {
    title: "Queries",
    href: "/app",
  },
  {
    title: "Schemas",
    href: "/app/schemas",
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/");

  return (
    <>
      <div className='space-y-6 p-10 pb-16 md:block'>
        <div className='flex items-center justify-between space-y-0.5'>
          <h2 className='text-lg w-fit font-extrabold tracking-tight text-center text-transparent bg-clip-text bg-gradient-to-br from-slate-600 to-slate-100'>
            RoarSQL
          </h2>

          <UserNav />
        </div>
        <TopbarNav items={sidebarNavItems} />
        <Separator className='my-6' />
        <div className='flex w-full'>{children}</div>
      </div>
    </>
  );
}
