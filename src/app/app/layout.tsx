import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Toaster } from "@/components/ui/toaster";
import { Separator } from "@/components/ui/separator";
import { UserNav } from "@/components/user-nav";

export const metadata: Metadata = {
  title: "RoarSQL",
  description:
    "Elevate Query Writing: RoarSQL's Natural Language AI Assistant for Developers",
};

export const dynamic = "force-dynamic";

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
      <head>
        <Script src='https://www.googletagmanager.com/gtag/js?id=G-8LCD453H7R' />
        <Script id='google-analytics'>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-8LCD453H7R');
        `}
        </Script>
      </head>

      <body>
        <div className='space-y-6 p-10 pb-16 md:block'>
          <div className='flex items-center justify-between space-y-0.5'>
            <Link href='/app'>
              <h2 className='text-lg w-fit font-extrabold tracking-tight text-center text-transparent bg-clip-text bg-gradient-to-br from-slate-600 to-slate-100 hover:from-slate-700 hover:to-slate-200'>
                RoarSQL
              </h2>
            </Link>

            <UserNav />
          </div>
          <Separator className='my-6' />
          <div className='flex w-full'>{children}</div>
          <Toaster />
        </div>
      </body>
    </>
  );
}
