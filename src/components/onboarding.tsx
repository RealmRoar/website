"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { ClipboardCopyIcon, MagicWandIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SQL_SCHEMAS_COMMAND } from "@/constants/generateSchemaCommand";
import { Database } from "@/lib/database.types";
import { Spinner } from "./spinner";

const databaseFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  schema: z
    .string({
      required_error: "Please provide a schema",
    })
    .nonempty({
      message: "Please provide a schema",
    }),
});

type DatabaseFormValues = z.infer<typeof databaseFormSchema>;

export function Onboarding() {
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const [hasCompletedFirstStep, setHasCompletedFirstStep] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<DatabaseFormValues>({
    resolver: zodResolver(databaseFormSchema),
    defaultValues: {
      name: "",
      schema: "",
    },
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(SQL_SCHEMAS_COMMAND);

    toast({
      title: "🎉 Copied to clipboard!",
      description: "Run the command in your SQL editor.",
    });

    setHasCompletedFirstStep(true);
  };

  const handleSubmit = async (values: DatabaseFormValues) => {
    try {
      setIsLoading(true);
      const { name, schema } = values;

      if (!name || !schema) {
        toast({
          title: "🚨 Missing required fields",
          description: "Please fill in name and schema.",
        });
        return;
      }

      const body = {
        schema: {
          name,
          database_name: "Postgres",
        },
        tables: JSON.parse(schema),
      };

      const { data, error } = await supabase.functions.invoke("AddSchema", {
        body,
      });

      if (error) throw error;

      toast({
        title: "🎉 Schema created!",
        description: "Your schema has been created.",
      });

      router.push(`/app/schemas/${data}`);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast({
        variant: "destructive",
        title: "🚨 Something went wrong!",
        description: "Please try again later.",
      });
    }
  };

  return (
    <div className='relative mt-24'>
      <div className='bg-gradient-to-r from-slate-700 to-slate-900 absolute top-0 h-[600px] w-px' />

      <div className='flex flex-col gap-6'>
        <div className='relative pl-6 transition duration-200 ease-in-out'>
          <div className='absolute -left-[9.5px] top-7 z-10 block h-5 w-5 rounded-full bg-root'>
            <div
              className={`ml-1 mt-1 h-3 w-3 rounded-full border-2 transition duration-200 ease-in-out ${
                hasCompletedFirstStep
                  ? "border-[rgba(98,255,179,.74)]"
                  : "border-white"
              }`}
            />
          </div>

          <div
            className={`rounded-xl bg-gradient-to-r via-root to-root p-0.5 transition duration-200 ease-in-out ${
              hasCompletedFirstStep
                ? "from-[rgba(51,254,179,.105)] to-transparent"
                : ""
            }`}
          >
            <div className='rounded-[10px] bg-root'>
              <div className='rounded-[10px] p-6'>
                <div className='flex items-center gap-2'>
                  <h3 className='mb-1 text-xl tracking-[-0.16px] text-slate-12 font-bold'>
                    Generate your database schema
                  </h3>
                </div>
                <p className='mb-6 text-sm text-muted-foreground font-normal'>
                  Copy and run the following command to generate your database
                  schema.
                </p>

                <Card>
                  <CardContent className='px-4 py-6 overflow-hidden'>
                    <code className='text-sm font-mono'>
                      {SQL_SCHEMAS_COMMAND}
                    </code>
                  </CardContent>

                  <CardFooter className='border-t p-4'>
                    <Button onClick={handleCopy}>
                      <ClipboardCopyIcon className='w-4 h-4 mr-2' />
                      Copy
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`relative pl-6 transition duration-200 ease-in-out ${
            !hasCompletedFirstStep
              ? "pointer-events-none select-none opacity-50"
              : ""
          }`}
        >
          <div className='absolute -left-[9.5px] top-7 z-10 block h-5 w-5 rounded-full bg-root'>
            <div className='ml-1 mt-1 h-3 w-3 rounded-full border-2 transition duration-200 ease-in-out border-white'></div>
          </div>

          <div className='rounded-xl bg-gradient-to-r via-root to-root p-0.5 transition duration-200 ease-in-out'>
            <div className='rounded-[10px] bg-root'>
              <div className='rounded-[10px] bg-gradient-to-r via-green-1 to-green-1 p-6'>
                <div className='flex items-center gap-2'>
                  <h3 className='mb-1 text-xl tracking-[-0.16px] text-slate-12 font-bold'>
                    Give a name and paste your schema
                  </h3>
                </div>
                <p className='mb-6 text-sm text-muted-foreground font-normal'>
                  Once you have generated your database schema, paste it here
                  and give it a name.
                </p>

                <Card>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                      <CardContent className='grid gap-6 px-4 py-6'>
                        <div className='grid gap-2'>
                          <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Schema name</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder='Eg. Supabase Project'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className='grid gap-2'>
                          <FormField
                            control={form.control}
                            name='schema'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Database schema</FormLabel>
                                <FormControl>
                                  <Textarea
                                    {...field}
                                    placeholder='Paste your database schema here'
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                      <CardFooter className='border-t p-4'>
                        <Button
                          type='submit'
                          disabled={!hasCompletedFirstStep || isLoading}
                        >
                          {!isLoading ? (
                            <>
                              <MagicWandIcon className='w-4 h-4 mr-2' />
                              Submit
                            </>
                          ) : (
                            <Spinner />
                          )}
                        </Button>
                      </CardFooter>
                    </form>
                  </Form>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
