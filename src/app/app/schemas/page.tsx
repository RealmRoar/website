import { Separator } from "@/components/ui/separator";

export default async function SchemasPage() {
  return (
    <div className='w-full space-y-6'>
      <div>
        <h3 className='text-2xl font-medium mb-2'>Schemas</h3>
        <p className='text-sm text-muted-foreground'>Register your schemas</p>
      </div>
      <Separator />
    </div>
  );
}
