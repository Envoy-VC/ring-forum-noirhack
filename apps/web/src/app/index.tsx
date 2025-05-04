import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from 'convex/react';

import {
  CategorySelect,
  CreatePost,
  LatestPosts,
  PopularTags,
  Post,
} from '~/components';
import { api } from '~/convex/_generated/api';

const Home = () => {
  const posts = useQuery(api.functions.posts.getLatestPosts, { limit: 50 });

  return (
    <div className='mx-auto flex max-w-screen-2xl flex-col-reverse gap-6 px-4 py-12 lg:flex-row'>
      <div className='flex w-full basis-1/4'>
        <div className='mx-auto flex w-full max-w-xs flex-col gap-8'>
          <CategorySelect />
          <PopularTags />
        </div>
      </div>
      <div className='flex h-fit w-full basis-2/4 flex-col gap-4'>
        <CreatePost />
        <div className='flex flex-col gap-4'>
          {posts?.map((post) => {
            return (
              <Post
                post={post}
                key={post._id}
              />
            );
          })}
        </div>
      </div>
      <div className='flex w-full basis-1/4'>
        <div className='mx-auto flex w-full max-w-sm flex-col gap-8'>
          <LatestPosts />
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/')({
  component: Home,
});
