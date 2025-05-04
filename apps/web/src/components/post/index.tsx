import Avvvatars from 'avvvatars-react';
import type { PostWithCommunity } from '~/types';
import { VerifyPost } from './verify';

export const Post = ({ post }: { post: PostWithCommunity }) => {
  return (
    <div className='relative flex flex-col gap-2 rounded-2xl bg-primary px-4 py-3'>
      <div className='absolute right-4 bottom-4'>
        <VerifyPost post={post} />
      </div>
      <div className='flex flex-row items-center gap-2'>
        <Avvvatars
          value={post.community.name}
          size={16}
          style='shape'
        />
        <div className='font-medium text-base text-cyan-300'>
          r/{post.community.name}
        </div>
      </div>
      <div className='text-foreground text-lg'>{post.content}</div>
      <div className='flex flex-row items-center gap-2'>
        {post.tags.map((tag) => (
          <div
            className='flex flex-row items-center gap-2 rounded-lg bg-white/10 px-2 py-[2px]'
            key={tag}
          >
            <div className='font-medium text-sm'>#{tag}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
