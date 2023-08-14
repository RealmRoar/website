import Link from "next/link";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ArrowLeftIcon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Chat from "@/components/chat";
import DeleteSchemaDialog from "./components/delete-schema-dialog";

export default async function SchemaPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("schemas")
    .select()
    .eq("id", params.id);
  const schema = data ? data[0] : null;

  if (!schema || error) return null;

  return (
    <div className='w-full space-y-6'>
      <div className='flex justify-between'>
        <div className='mr-8'>
          <h3 className='text-2xl font-medium mb-2 flex items-center'>
            <Link href='/app'>
              <Button variant='link' className='px-0 py-0 mr-2'>
                <ArrowLeftIcon className='h-6 w-6' />
              </Button>
            </Link>
            {schema.name}
          </h3>
          <p className='text-sm text-muted-foreground'>
            Engage in natural language conversations with our SQL assistant in
            the integrated chat.
          </p>
        </div>

        <DeleteSchemaDialog schemaId={schema.id} />
      </div>

      <Chat schemaId={schema.id} />
    </div>
  );
}
