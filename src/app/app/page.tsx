import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
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
