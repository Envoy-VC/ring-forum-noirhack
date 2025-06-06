'use client';

import { cn } from '@repo/ui/lib/utils';
import { Link, useLocation } from '@tanstack/react-router';
import { AudioLinesIcon, HomeIcon, TrendingUpIcon, UsersIcon } from '../icons';

const navLinks = [
  {
    title: 'Home',
    href: '/',
    regex: /^\/$/,
    icon: HomeIcon,
  },
  {
    title: 'Communities',
    href: '/communities',
    // regex for /communities/*
    regex: /^\/communities\/(.*)$/,
    icon: UsersIcon,
  },
  {
    title: 'Podcasts',
    href: '/',
    regex: /^\/podcasts\/?$/,
    icon: AudioLinesIcon,
    disabled: true,
  },
  {
    title: 'Trending',
    href: '/',
    regex: /^\/trending\/?$/,
    icon: TrendingUpIcon,
    disabled: true,
  },
];

export const NavItems = () => {
  const path = useLocation();

  return (
    <div className='flex flex-row items-center gap-2 px-12'>
      {navLinks.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            to={link.href}
            type='button'
            key={link.title}
            className={cn(
              '!p-0 !m-0 !size-9 flex items-center justify-center rounded-lg transition-colors duration-200 hover:bg-accent',
              link.regex.test(path.pathname) && !link.disabled && 'bg-accent'
            )}
          >
            <Icon size={20} />
          </Link>
        );
      })}
    </div>
  );
};
