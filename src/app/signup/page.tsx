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

export default function Home() {
  return (
    <div className='relative isolate overflow-hidden'>
      <svg
        className='absolute inset-0 -z-10 h-full w-full stroke-slate-800 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]'
        aria-hidden='true'
      >
        <defs>
          <pattern
            id='0787a7c5-978c-4f66-83c7-11c213f99cb7'
            width='200'
            height='200'
            x='50%'
            y='-1'
            patternUnits='userSpaceOnUse'
          >
            <path d='M.5 200V.5H200' fill='none'></path>
          </pattern>
        </defs>
        <rect
          width='100%'
          height='100%'
          strokeWidth='0'
          fill='url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)'
        ></rect>
      </svg>

      <div className='max-w-7xl min-h-screen mx-auto px-6 flex h-screen w-screen justify-center'>
        <main>
          <Card className='z-10 mt-[calc(30vh)] h-fit w-full max-w-md overflow-hidden border border-slate-600 sm:rounded-2xl sm:shadow-xl'>
            <CardHeader className='flex flex-col items-center justify-center space-y-3 border-b border-slate-600 px-4 py-6 pt-8 text-center sm:px-16'>
              <CardTitle>Create your account</CardTitle>
              <CardDescription>
                Get started for free. No credit card required.
              </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col space-y-8 px-4 py-8 sm:px-16'>
              <Button>
                <GitHubLogoIcon className='mr-2' />
                Continue with Github
              </Button>
              <p className='text-center text-sm text-slate-200'>
                Already have an account?{" "}
                <Link
                  className='font-semibold text-slate-200 transition-colors hover:text-slate-400'
                  href='/login'
                >
                  Sign in
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
