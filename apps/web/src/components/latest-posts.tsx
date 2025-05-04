'use client';

type Post = {
  content: string;
  tags: string[];
};

const LatestPost = ({ post }: { post: Post }) => {
  const truncatedContent =
    post.content.slice(0, 64) + (post.content.length > 100 ? '...' : '');
  return (
    <div className='relative flex flex-col gap-2 rounded-2xl border border-white/20 bg-primary px-4 py-2'>
      <div className='font-medium text-accent text-base'>r/Bitcoin</div>
      <div className='text-base text-foreground'>{truncatedContent}</div>
    </div>
  );
};

export const LatestPosts = ({ posts }: { posts: Post[] }) => {
  return (
    <div className='flex flex-col gap-2 rounded-3xl bg-primary px-2 py-3'>
      <div className='px-2 py-2 font-medium text-xl'>Latest Posts</div>
      <div className='flex flex-col gap-3'>
        {posts.map((post) => {
          return (
            <LatestPost
              post={post}
              key={post.content}
            />
          );
        })}
      </div>
    </div>
  );
};
