"use client";

import { useEffect, useState } from "react";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { useToast } from "@/components/ui/use-toast";

export function UserNav() {
  const { toast } = useToast();
  const supabase = createClientComponentClient<Database>();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    handleGetUser();
  }, []);

  const handleGetUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  };

  const redirectToHome = () => {
    location.href = "/home";
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast({
        duration: 5000,
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }

    location.href = "/";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage
              src={user?.user_metadata.avatar_url}
              alt={user?.user_metadata.user_name}
            />
            <AvatarFallback>{user?.user_metadata.avatar_url[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>
              {user?.user_metadata.user_name}
            </p>
            <p className='text-xs leading-none text-muted-foreground'>
              {user?.user_metadata.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={redirectToHome}>
          RoarSQL Homepage
          <DropdownMenuShortcut>
            <ExternalLinkIcon />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
