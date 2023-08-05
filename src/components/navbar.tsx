import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center h-24'>
      <div className='flex justify-start'>
        <div className='hidden lg:block'>
          <Link aria-label='RoarSQ Home Link' href='/'>
            <div className='-mt-1'>
              <span className='text-2xl font-extrabold tracking-tight sm:text-3xl text-center text-transparent bg-clip-text bg-gradient-to-br from-slate-600 to-slate-100'>
                RoarSQL
              </span>
            </div>
          </Link>
        </div>
        <div className='lg:hidden'>
          <Link aria-label='RoarSQL Home Link' href='/'>
            <div className='-mt-1'>
              <span className='text-2xl font-extrabold tracking-tight sm:text-3xl text-center text-transparent bg-clip-text bg-gradient-to-br from-slate-600 to-slate-100'>
                RoarSQL
              </span>
            </div>
          </Link>
        </div>
      </div>

      <div className='flex items-center space-x-8'>
        <div
          id='menu-items'
          className='relative lg:flex justify-center text-base font-medium space-x-4'
        >
          <Link href='/login'>
            <Button variant='outline'>Login</Button>
          </Link>
          <Link href='/signup'>
            <Button>Sign Up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

Navbar.displayName = "Navbar";

export default Navbar;
