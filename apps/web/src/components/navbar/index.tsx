import Image from 'next/image';
import Link from 'next/link';

import { Input } from '@repo/ui/components/input';

import Logo from 'public/logo.png';
import { SearchIcon } from '../icons';
import { CreateAccount } from './create-account';
import { NavItems } from './nav-items';

export const Navbar = () => {
  return (
    <div className='flex h-[6vh] items-center justify-center bg-primary'>
      <div className='relative mx-auto flex w-full max-w-screen-2xl flex-row items-center justify-between gap-4 px-4'>
        <div className='flex flex-row items-center gap-4'>
          <Link
            href='/'
            className='flex flex-row items-center gap-2'
          >
            <Image
              src={Logo}
              alt='logo'
              width={48}
              height={48}
              className='size-10'
            />
            <div className='font-medium text-xl'>Ring Forum</div>
          </Link>
          <NavItems />
        </div>
        <div className='absolute right-1/2 w-full max-w-sm translate-x-1/2'>
          <div className='flex flex-row items-center justify-center gap-2 rounded-lg bg-white/10 px-3'>
            <Input
              className='!bg-transparent w-full max-w-sm border-none outline-none placeholder:text-accent-foreground/50 focus-visible:ring-0'
              placeholder='Search for communities'
            />
            <SearchIcon
              size={16}
              className='cursor-pointer'
            />
          </div>
        </div>
        <CreateAccount />
      </div>
    </div>
  );
};
