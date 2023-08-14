"use client";
import { useState } from "react";
import { redirect } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { TrashIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Database } from "@/lib/database.types";
import { useToast } from "@/components/ui/use-toast";
import { Spinner } from "@/components/spinner";

export default function DeleteSchemaDialog({ schemaId }: { schemaId: string }) {
  const { toast } = useToast();
  const supabase = createClientComponentClient<Database>();

  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    const { error } = await supabase
      .from("schemas")
      .delete()
      .eq("id", schemaId);

    if (error) {
      toast({
        title: "🚨 Error",
        description: error.message,
      });
      setIsLoading(false);
      return;
    }

    toast({
      title: "🎉 Schema deleted",
      description: "Your schema has been deleted.",
    });
    setIsLoading(false);
    redirect("/app");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='outline' className='hover:bg-red-700' disabled={isLoading}>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <TrashIcon className='h-4 w-4' />
              <span className='ml-2 hidden lg:inline'>Delete schema</span>
            </>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            schema and history.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
