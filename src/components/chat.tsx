"use client";
import { useEffect, useState, useRef } from "react";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { RocketIcon } from "@radix-ui/react-icons";
import { v4 as idGen } from "uuid";
import { Database } from "@/lib/database.types";
import Message, { Skeleton, TypeOnce } from "@/components/chat-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Message = {
  id: string;
  message: string;
  isUser: boolean;
  isNew?: boolean;
};

type ChatProps = {
  schemaId: string;
  chatId?: string;
  chatName?: string;
};

export default function Chat({ schemaId, chatName, chatId }: ChatProps) {
  const { toast } = useToast();
  const supabase = createClientComponentClient<Database>();

  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    updateScroll();
  }, [messages]);

  useEffect(() => {
    handleGetUser();
  }, []);

  useEffect(() => {
    if (chatId) getQuestions();
  }, [chatId]);

  const getQuestions = async () => {
    const { data, error } = await supabase
      .from("questions")
      .select()
      .eq("chat_id", chatId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    // setMessages(data);
  };

  const handleGetUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  };

  const handleEmit = async () => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { id: idGen(), isUser: true, message }]);

    // ADD QUESTION
    if (chatId) {
      const data = await supabase.functions.invoke("AddQuestions", {
        body: {
          chatId,
          prompt: message,
        },
      });

      setMessages((prev) => [
        ...prev,
        { id: idGen(), isUser: false, message: data as unknown as string },
      ]);

      setMessage("");
      setIsLoading(false);
      return;
    }

    const data = supabase.functions.invoke("AddChat", {
      body: {
        schemaId,
        prompt: message,
      },
    });

    setMessage("");
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleEmit();
  };

  const updateScroll = () => {
    const element = scrollRef.current;
    if (!element) return;

    element.scrollTop = element.scrollHeight;
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Card className='w-full max-w-[1280px] mx-auto h-[600px]'>
      <CardHeader className='p-6 border-b'>
        <CardTitle className='text-lg'>
          {chatName ? (
            chatName
          ) : (
            <div className='flex flex-row items-center'>
              <RocketIcon className='w-4 h-4 mr-2' />
              <TypeOnce>New question</TypeOnce>
            </div>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className='p-0 h-[432px]'>
        <div
          ref={scrollRef}
          className='w-full mx-auto h-full mb-4 overflow-auto flex flex-col gap-10 pt-10 max-[900px]:pt-20 scroll-smooth'
        >
          {messages.map((message) => (
            <Message
              user={user}
              key={message.id}
              id={message.id}
              isUser={message.isUser}
              message={message.message}
              isNew={message.isNew ?? false}
            />
          ))}
          {isLoading ? <Skeleton /> : null}
        </div>
      </CardContent>

      <CardFooter className='p-6 border-t flex flex-row justify-between items-center gap-4'>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Ask a question about your database...'
        />
        <Button disabled={!message} onClick={handleEmit}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
