import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, TrashIcon } from "@radix-ui/react-icons";
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
import Link from "next/link";
import Chat from "@/components/chat";

export default function SchemaPage({ params }: { params: { id: string } }) {
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
            Pingback
          </h3>
          <p className='text-sm text-muted-foreground'>
            Engage in natural language conversations with our SQL assistant in
            the integrated chat.
          </p>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='outline' className='hover:bg-red-700'>
              <TrashIcon className='h-4 w-4' />
              <span className='ml-2 hidden lg:inline'>Delete schema</span>
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
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Chat />
    </div>
  );
}
