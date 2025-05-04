'use client';

import Avatar from 'avvvatars-react';
import { useQuery } from 'convex/react';
import { useMemo } from 'react';
import { api } from '~/convex/_generated/api';

export const PopularTags = () => {
  const { start, end } = useMemo(() => {
    const now = new Date();
    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0
    ).getTime();
    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      1,
      0
    ).getTime();

    return { start: today, end: tomorrow };
  }, []);
  const tags = useQuery(api.functions.tags.getTrendingTags, {
    startTime: start,
    endTime: end,
  });
  return (
    <div className='flex flex-col gap-2 rounded-3xl bg-primary px-4 py-3'>
      <div className='py-4 font-medium text-xl'>Popular Tags</div>
      <div className='flex flex-col gap-3'>
        {tags?.map((tag) => {
          const formattedCount = tag.count.toLocaleString('en-US');
          return (
            <div
              className='flex flex-row items-center gap-2'
              key={tag.tag}
            >
              <Avatar
                value={tag.tag}
                size={42}
                style='shape'
                radius={12}
              />
              <div className='flex flex-col'>
                <div className='font-medium text-base'>#{tag.tag}</div>
                <div className='text-foreground/50 text-sm'>
                  {formattedCount} posts today.
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
