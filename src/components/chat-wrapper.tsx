"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ChatBubbleIcon, PlusIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Chat from "@/components/chat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "@/lib/database.types";
import { useEffect, useState } from "react";

type ChatWrapperProps = {
  schemaId: string;
};

export default function ChatWrapper({ schemaId }: ChatWrapperProps) {
  const supabase = createClientComponentClient<Database>();

  const [chats, setChats] = useState<any[] | null>([]);
  const [currentChat, setCurrentChat] = useState<any | null>(null);

  useEffect(() => {
    getSchemaChats();
  }, []);

  const getSchemaChats = async () => {
    const { data, error } = await supabase
      .from("chats")
      .select()
      .eq("schema_id", schemaId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setChats(data);
    setCurrentChat(data[0]);
  };

  const handleCreateChat = async () => {
    setCurrentChat(null);
  };

  return (
    <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
      <aside className='max-w-[350px] w-full h-[600px]'>
        <Card className='h-full'>
          <CardHeader className='p-6 border-b'>
            <CardTitle className='text-lg flex flex-row items-center'>
              <ChatBubbleIcon className='w-4 h-4 mr-2' />
              Your chats
            </CardTitle>
          </CardHeader>

          <CardContent className='p-6'>
            <nav
              className={cn(
                "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1"
              )}
            >
              <Button className='mb-6' onClick={handleCreateChat}>
                <PlusIcon className='h-4 w-4 mr-2' />
                New chat
              </Button>

              {chats
                ? chats.map((item) => (
                    <Button
                      key={item.id}
                      variant='ghost'
                      className={cn(
                        "justify-start",
                        currentChat?.id === item.id
                          ? "bg-muted hover:bg-muted"
                          : ""
                      )}
                      onClick={() => setCurrentChat(item)}
                    >
                      <span className='w-[280px] overflow-hidden whitespace-nowrap text-ellipsis text-left'>
                        {item.title}
                      </span>
                    </Button>
                  ))
                : null}
            </nav>
          </CardContent>
        </Card>
      </aside>

      <Chat
        schemaId={schemaId}
        chatId={currentChat?.id}
        chatName={currentChat?.title}
      />
    </div>
  );
}
