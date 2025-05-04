'use client';

import { cn } from '@repo/ui/lib/utils';
import { ChartColumnDecreasingIcon, SparklesIcon } from './icons';

import { parseAsStringLiteral, useQueryState } from 'nuqs';
import type { Category } from '~/types';

const categoriesArray = ['newest', 'popular'] as const;

const categories = [
  {
    title: 'Newest and Recent',
    id: 'newest',
    subtitle: 'Find the latest update',
    icon: ChartColumnDecreasingIcon,
    iconCls: 'text-green-400',
  },
  {
    title: 'Popular of the Day',
    id: 'popular',
    subtitle: 'Shots featured today by curators',
    icon: SparklesIcon,
    iconCls: 'text-secondary',
  },
];

export const CategorySelect = () => {
  const [currentCategory, setCategory] = useQueryState(
    'category',
    parseAsStringLiteral(categoriesArray).withDefault('newest')
  );

  return (
    <div className='flex w-full flex-col items-center gap-2 rounded-3xl bg-primary p-3'>
      {categories.map((category) => (
        // biome-ignore lint/nursery/noStaticElementInteractions: <explanation>
        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
        <div
          key={category.title}
          onClick={() => {
            setCategory(category.id as Category);
          }}
          className={cn(
            'flex w-full cursor-pointer flex-row items-start gap-2 rounded-2xl px-3 py-3',
            category.id === currentCategory ? 'bg-white/10' : ''
          )}
        >
          <div
            className={cn(
              'flex size-10 items-center justify-center rounded-sm',
              category.iconCls,
              category.id === currentCategory ? '' : 'bg-white/10'
            )}
          >
            <category.icon
              size={24}
              className='pt-1'
            />
          </div>
          <div className='flex flex-col'>
            <div className='font-medium text-base'>{category.title}</div>
            <div className='text-foreground/50 text-xs'>
              {category.subtitle}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
