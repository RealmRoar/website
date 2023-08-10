import { Separator } from "@/components/ui/separator";

export default async function QueriesPage() {
  return (
    <div className='w-full space-y-6'>
      <div>
        <h3 className='text-2xl font-medium mb-2'>Queries</h3>
        <p className='text-sm text-muted-foreground'>
          Write your first query with RoarSQL
        </p>
      </div>
      <Separator />
    </div>
  );
}
