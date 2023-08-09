import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Separator } from "@/components/ui/separator";

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/");

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Query</h3>
        <p className='text-sm text-muted-foreground'>
          Write your first query with RoarSQL
        </p>
      </div>
      <Separator />
    </div>
  );
}
