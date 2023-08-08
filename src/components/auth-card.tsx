"use client";

import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import supabase from "@/services/supabase";

interface IAuthCardProps {
  type: "login" | "signup";
}

export function AuthCard({ type }: IAuthCardProps) {
  const handleGithubAuth = async () => {
    try {
      const user = await supabase.auth.signInWithOAuth({
        provider: "github",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const authTexts = {
    login: {
      title: "Sign in to RoarSQL",
      description: "Your personal SQL assistant for queries.",
      footerQuestion: "Don't have an account?",
      footerAction: "Sign up",
    },
    signup: {
      title: "Create your account",
      description: "Get started for free. No credit card required.",
      footerQuestion: "Already have an account?",
      footerAction: "Sign in",
    },
  };

  return (
    <Card className='z-10 mt-[16px] h-fit w-full max-w-md overflow-hidden border border-slate-600 sm:rounded-2xl sm:shadow-xl'>
      <CardHeader className='flex flex-col items-center justify-center space-y-3 border-b border-slate-600 px-4 py-6 pt-8 text-center sm:px-16'>
        <CardTitle>{authTexts[type].title}</CardTitle>
        <CardDescription>{authTexts[type].description}</CardDescription>
      </CardHeader>

      <CardContent className='flex flex-col space-y-8 px-4 py-8 sm:px-16'>
        <Button onClick={handleGithubAuth}>
          <GitHubLogoIcon className='mr-2' />
          Continue with Github
        </Button>

        <p className='text-center text-sm text-slate-200'>
          {authTexts[type].footerQuestion}{" "}
          <Link
            className='font-semibold text-slate-200 transition-colors hover:text-slate-400'
            href={`/${type === "login" ? "signup" : "login"}`}
          >
            {authTexts[type].footerAction}
          </Link>
          .
        </p>
      </CardContent>
    </Card>
  );
}
