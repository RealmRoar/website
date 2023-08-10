"use client";
import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

interface IAuthCardProps {
  type: "login" | "signup";
}

enum authProviders {
  github = "github",
  gitlab = "gitlab",
  bitbucket = "bitbucket",
}

export function AuthCard({ type }: IAuthCardProps) {
  const { toast } = useToast();
  const supabase = createClientComponentClient<Database>();

  const handleAuth = async (provider: authProviders) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: { redirectTo: `${location.origin}/auth/callback` },
      });

      if (error) {
        toast({
          duration: 5000,
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const authTexts = {
    login: {
      title: "Log in to RoarSQL",
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
        <Button className="bg-neutral-800 hover:bg-neutral-900 text-white" onClick={() => handleAuth(authProviders.github)}>
          <GitHubLogoIcon className='mr-2' color="white" />
          Continue with Github
        </Button>
        <Button
          className='bg-purple-600 hover:bg-purple-700 text-white'
          onClick={() => handleAuth(authProviders.gitlab)}
        >
          <svg
            className='mr-2'
            width='13'
            height='13'
            viewBox='0 0 13 13'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12.774 5.26761L12.7571 5.22284L11.1237 0.796452C11.0905 0.709697 11.0317 0.636103 10.9557 0.586228C10.8796 0.537201 10.7909 0.513587 10.7015 0.518577C10.6121 0.523566 10.5263 0.556918 10.4558 0.614128C10.386 0.672981 10.3354 0.752729 10.3108 0.84252L9.20796 4.34626H4.74216L3.6393 0.84252C3.61538 0.75224 3.56465 0.672092 3.49433 0.613479C3.42377 0.556269 3.33801 0.522917 3.24862 0.517928C3.15923 0.512939 3.07051 0.536552 2.99445 0.585579C2.91861 0.635655 2.85982 0.709185 2.82637 0.795803L1.18989 5.22024L1.17364 5.26501C0.938512 5.90296 0.909489 6.60299 1.09095 7.25955C1.27241 7.91612 1.65451 8.49363 2.17965 8.90501L2.18527 8.90955L2.20027 8.92058L4.68842 10.8554L5.91938 11.8228L6.66919 12.4107C6.7569 12.4798 6.864 12.5173 6.97412 12.5173C7.08424 12.5173 7.19134 12.4798 7.27905 12.4107L8.02887 11.8228L9.25982 10.8554L11.763 8.9089L11.7692 8.90371C12.2932 8.49225 12.6744 7.91534 12.8556 7.25966C13.0368 6.60398 13.0081 5.90495 12.774 5.26761Z'
              fill='white'
            />
          </svg>
          Continue with GitLab
        </Button>
        <Button
          className='bg-blue-600 hover:bg-blue-700 text-white'
          onClick={() => handleAuth(authProviders.bitbucket)}
        >
          <svg
            className='mr-2'
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clip-path='url(#clip0_10_10)'>
              <path
                d='M2.1485 11.5H9.978C10.1675 11.5025 10.3315 11.3625 10.3625 11.1715L11.995 0.958027C12.029 0.744527 11.887 0.544027 11.6775 0.509527C11.656 0.507027 11.6345 0.505027 11.6105 0.505027L0.3895 0.500027C0.178 0.497527 0.002 0.669027 0 0.887527C0 0.909527 0.0025 0.934027 0.0045 0.956027L1.637 11.054C1.678 11.3085 1.8945 11.4975 2.1485 11.5ZM7.868 4.19553L7.2625 7.79803H4.7625L4.0865 4.19553H7.868Z'
                fill='white'
              />
            </g>
            <defs>
              <clipPath id='clip0_10_10'>
                <rect width='12' height='12' fill='white' />
              </clipPath>
            </defs>
          </svg>
          Continue with Bitbucket
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
