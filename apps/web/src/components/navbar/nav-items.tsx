'use client';

import { cn } from '@repo/ui/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AudioLinesIcon, HomeIcon, TrendingUpIcon, UsersIcon } from '../icons';

const navLinks = [
  {
    title: 'Home',
    href: '/',
    icon: HomeIcon,
  },
  {
    title: 'Communities',
    href: '/communities',
    icon: UsersIcon,
  },
  {
    title: 'Podcasts',
    href: '/',
    icon: AudioLinesIcon,
    disabled: true,
  },
  {
    title: 'Trending',
    href: '/',
    icon: TrendingUpIcon,
    disabled: true,
  },
];

export const NavItems = () => {
  const path = usePathname();

  return (
    <div className='flex flex-row items-center gap-2 px-12'>
      {navLinks.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            href={link.href}
            type='button'
            key={link.title}
            className={cn(
              '!p-0 !m-0 !size-9 flex items-center justify-center rounded-lg transition-colors duration-200 hover:bg-accent',
              path === link.href && !link.disabled && 'bg-accent'
            )}
          >
            <Icon size={20} />
          </Link>
        );
      })}
    </div>
  );
};
