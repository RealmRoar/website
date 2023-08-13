"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PersonIcon,
  HomeIcon,
  ExitIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Database } from "@/lib/database.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserNav() {
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    handleGetUser();
  }, []);

  const handleGetUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
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
            <AvatarFallback>
              {user?.user_metadata?.name ? (
                user?.user_metadata?.name[0]
              ) : (
                <PersonIcon />
              )}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>
              {user?.user_metadata.user_name || user?.user_metadata.name}
            </p>
            <p className='text-xs leading-none text-muted-foreground'>
              {user?.user_metadata.email || user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.push("/app/profile")}
            className='cursor-pointer'
          >
            <PersonIcon className='w-4 h-4 mr-2' />
            Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push("/home")}
          className='cursor-pointer'
        >
          <HomeIcon className='w-4 h-4 mr-2' />
          Homepage
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer' onClick={handleSignOut}>
          <ExitIcon className='w-4 h-4 mr-2' />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
