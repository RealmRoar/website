import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";

export default async function ProfilePage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className='w-full space-y-6'>
      <h3 className='text-2xl font-medium'>Profile</h3>

      <Card className='z-10 mt-[16px] h-fit w-full overflow-hidden border border-slate-600 sm:rounded-2xl sm:shadow-xl'>
        <CardHeader className='border-b border-slate-600 py-6 text-center px-6'>
          <CardTitle className='text-md w-fit'>Your account</CardTitle>
        </CardHeader>

        <CardContent className='py-8 px-6'>
          <div>
            <span className='text-sm text-slate-500'>Email address</span>
            <Input disabled value={user?.email} className='mt-1' />
          </div>

          <div className='mt-6'>
            <span className='text-sm text-slate-500'>Provider</span>
            <Input
              disabled
              className='mt-1'
              value={user?.app_metadata.provider}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
