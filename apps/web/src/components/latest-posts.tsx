'use client';

import { useQuery } from 'convex/react';
import { api } from '~/convex/_generated/api';
import type { PostWithCommunity } from '~/types';

const LatestPost = ({ post }: { post: PostWithCommunity }) => {
  const truncatedContent =
    post.content.slice(0, 64) + (post.content.length > 100 ? '...' : '');
  return (
    <div className='relative flex flex-col gap-2 rounded-2xl border border-white/20 bg-primary px-4 py-2'>
      <div className='font-medium text-accent text-base'>
        r/{post.community.name}
      </div>
      <div className='text-base text-foreground'>{truncatedContent}</div>
    </div>
  );
};

export const LatestPosts = () => {
  const posts = useQuery(api.functions.posts.getLatestPosts, {});
  return (
    <div className='flex flex-col gap-2 rounded-3xl bg-primary px-2 py-3'>
      <div className='px-2 py-2 font-medium text-xl'>Latest Posts</div>
      <div className='flex flex-col gap-3'>
        {posts?.map((post) => {
          return (
            <LatestPost
              post={post}
              key={post._id}
            />
          );
        })}
      </div>
    </div>
  );
};
