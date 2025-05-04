'use client';

import Avatar from 'avvvatars-react';

const data = [
  {
    tag: 'web3',
    count: 12214,
  },
  {
    tag: 'crypto',
    count: 11601,
  },
  {
    tag: 'nft',
    count: 12214,
  },
  {
    tag: 'blockchain',
    count: 10214,
  },
  {
    tag: 'ethereum',
    count: 90214,
  },
  {
    tag: 'noir',
    count: 80214,
  },
  {
    tag: 'aztec',
    count: 70214,
  },
];

export const PopularTags = () => {
  return (
    <div className='flex flex-col gap-2 rounded-3xl bg-primary px-4 py-3'>
      <div className='py-4 font-medium text-xl'>Popular Tags</div>
      <div className='flex flex-col gap-3'>
        {data.map((tag) => {
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
