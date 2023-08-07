import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";

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

      <div className='max-w-7xl min-h-screen mx-auto px-6 sm:px-8'>
        <Navbar />
        <main>
          <div className='pt-20 sm:pt-24 mx-auto max-w-6xl px-6'>
            <div className='mx-auto max-w-4xl mt-12'>
              <h2 className='text-4xl font-extrabold tracking-tight sm:text-7xl text-center text-transparent bg-clip-text bg-gradient-to-br from-slate-300 to-slate-100'>
                Your personal SQL assistant.
              </h2>
              <p className='mt-8 text-lg leading-8 text-slate-300 mx-auto text-center max-w-2xl'>
                RoarSQL gives developers the ability to write queries faster and
                more efficiently by using natural language processing.
              </p>

              <div className='mt-16 flex items-center justify-center space-x-4 animate-hero-heading-slide-up-fade'>
                <Link href='/signup'>
                  <Button>Get early access</Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
