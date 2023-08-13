import { Onboarding } from "@/components/onboarding";

export default async function StartPage() {
  return (
    <div className='w-full space-y-6'>
      <div>
        <h3 className='text-2xl font-medium mb-2'>Create your schema</h3>
        <p className='text-sm text-muted-foreground'>
          Follow the steps below to help your personal assistant understand your
          database.
        </p>
      </div>

      <Onboarding />
    </div>
  );
}
