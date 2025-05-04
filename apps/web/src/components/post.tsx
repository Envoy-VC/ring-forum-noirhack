import { Button } from '@repo/ui/components/button';
import { ShieldCheckIcon } from './icons/check';

type Post = {
  content: string;
  tags: string[];
};

export const Post = ({ post }: { post: Post }) => {
  return (
    <div className='relative flex flex-col gap-2 rounded-2xl bg-primary px-4 py-3'>
      <div className='absolute right-4 bottom-4'>
        <Button
          variant='ghost'
          className='!size-6 !p-0 !m-0 !rounded-sm'
        >
          <ShieldCheckIcon
            size={16}
            className='text-green-300'
          />
        </Button>
      </div>
      <div className='font-medium text-accent text-base'>r/Bitcoin</div>
      <div className='text-base text-foreground'>{post.content}</div>
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
