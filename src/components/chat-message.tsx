"use client";
import { useState } from "react";
import Typewriter from "typewriter-effect";
import { PersonIcon } from "@radix-ui/react-icons";
import { User } from "@supabase/auth-helpers-nextjs";
import { parseCode } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Code from "@/components/chat-code-block";

type MessageProps = {
  user: User | null;
  message: string;
  id: string;
  isUser: boolean;
  isNew?: boolean;
};

export default function Message({
  id,
  user,
  isUser,
  message,
  isNew = false,
}: MessageProps) {
  return (
    <div
      className={`${!isUser ? "py-7" : "py-1"} h-fit ${
        !isUser ? "dark:bg-neutral-900 bg-[rgba(20,20,20,0.5)]" : "bg-inherit"
      }`}
    >
      <div className='flex flex-row gap-6 w-[50%] max-[900px]:w-[88%]  mx-auto items-start'>
        {isUser ? (
          <>
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
          </>
        ) : (
          <Avatar className='h-8 w-8'>
            <AvatarImage src='/roar-icon.png' alt='RoarSQL Assistant' />
          </Avatar>
        )}
        <span className='leading-8 w-[97%]'>
          {isUser ? (
            <>
              <TypeOnce>{message}</TypeOnce>
            </>
          ) : (
            <>
              {/* @ts-ignore */}
              <TypeOnce>{message.data}</TypeOnce>
            </>
          )}
        </span>
      </div>
    </div>
  );
}

export function Skeleton() {
  return (
    <div className={`py-7 h-fit dark:bg-neutral-900 bg-[rgba(20,20,20,0.5)]`}>
      <div className='flex flex-row gap-6 w-[50%] max-[900px]:w-[88%]  mx-auto items-start'>
        <Avatar className='h-8 w-8'>
          <AvatarImage src='/roar-icon.png' alt='RoarSQL Assistant' />
        </Avatar>
        <span className='leading-8'>
          <Typewriter
            options={{
              delay: 85,
              loop: true,
              autoStart: true,
            }}
            onInit={(typewriter) => {
              typewriter.typeString("...").start();
            }}
          />
        </span>
      </div>
    </div>
  );
}

export function TypeOnce({ children }: { children: string }) {
  const [on, setOn] = useState(true);
  return on ? (
    <Typewriter
      options={{
        delay: 45,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString(children)
          .start()
          .callFunction(() => {
            setOn(false);
          });
      }}
    />
  ) : (
    children
  );
}
