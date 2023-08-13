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
  const { codesArr, withoutCodeArr } = parseCode(message);
  let result = withoutCodeArr.map((item, index) => {
    return codesArr[index] ? [item, codesArr[index]] : [item];
  });

  return (
    <div
      className={`${!isUser ? "py-7" : "py-1"} h-fit ${
        !isUser ? "dark:bg-neutral-900 bg-[rgba(33,33,33,0.5)]" : "bg-inherit"
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
          {isUser || !isNew ? (
            <>
              {result.flat().map((item: any, index: number) => {
                return (
                  <div key={id + index}>
                    {typeof item == "string" ? (
                      item
                    ) : (
                      <div className='mb-1 w-[94%] z-50'>
                        <Code language={item.language}>{item.code}</Code>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {result.flat().map((item: any) => {
                return (
                  <>
                    {typeof item == "string" ? (
                      <TypeOnce>{item}</TypeOnce>
                    ) : (
                      <div className='mb-1 w-[94%] z-50'>
                        <Code language={item.language}>{item.code}</Code>
                      </div>
                    )}
                  </>
                );
              })}
            </>
          )}
        </span>
      </div>
    </div>
  );
}

export function Skeleton() {
  return (
    <div className={`py-7 h-fit dark:bg-neutral-900 bg-[rgba(33,33,33,0.5)]`}>
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

function TypeOnce({ children }: { children: string }) {
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
