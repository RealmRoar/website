import { PlusIcon } from "@radix-ui/react-icons";
import { SchemaCard } from "@/components/schema-card";
import { Button } from "@/components/ui/button";

export default async function SchemasPage() {
  return (
    <div className='w-full space-y-6'>
      <div className='flex justify-between'>
        <div>
          <h3 className='text-2xl font-medium mb-2'>Schemas</h3>
          <p className='text-sm text-muted-foreground'>
            Dive into each schema to translate natural language questions into
            ready-to-use SQL queries.
          </p>
        </div>

        <Button>
          <PlusIcon className='h-4 w-4 mr-2' />
          Create schema
        </Button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <SchemaCard id='1' name='Pingback' />
        <SchemaCard id='2' name='Vercel' />
        <SchemaCard id='3' name='Supabase' />
        <SchemaCard id='4' name='Resend' />
        <SchemaCard id='5' name='Upstash' />
        <SchemaCard id='6' name='Linear' />
      </div>
    </div>
  );
}
