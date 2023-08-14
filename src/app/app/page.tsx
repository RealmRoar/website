import Link from "next/link";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { PlusIcon } from "@radix-ui/react-icons";
import { SchemaCard } from "@/components/schema-card";
import { Button } from "@/components/ui/button";

export default async function SchemasPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data: schemas } = await supabase.from("schemas").select();

  if (!schemas || !schemas.length) redirect("/app/schemas/new");

  return (
    <div className='w-full space-y-6'>
      <div className='flex justify-between'>
        <div className='mr-8'>
          <h3 className='text-2xl font-medium mb-2'>Schemas</h3>
          <p className='text-sm text-muted-foreground'>
            Dive into each schema to translate natural language questions into
            ready-to-use SQL queries.
          </p>
        </div>

        <Link href='/app/schemas/new'>
          <Button>
            <PlusIcon className='h-4 w-4' />
            <span className='ml-2 hidden lg:inline'>Create schema</span>
          </Button>
        </Link>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {schemas
          ? schemas.map((schema) => (
              <SchemaCard key={schema.id} id={schema.id} name={schema.name} />
            ))
          : null}
      </div>
    </div>
  );
}
