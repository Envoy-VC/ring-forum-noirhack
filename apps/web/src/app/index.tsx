import { createFileRoute } from '@tanstack/react-router';

import {
  CategorySelect,
  CreatePost,
  LatestPosts,
  PopularTags,
} from '~/components';
import { Post } from '~/components/post';

const Home = () => {
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
          <Post
            post={{
              content:
                'Bitcoin rises to $1,000,000 in one day! what is going on?\n\nWhat do you think is going on? Is it a bubble?',
              tags: ['web3', 'crypto'],
            }}
          />
          <Post
            post={{
              content:
                'Bitcoin rises to $1,000,000 in one day! what is going on?\n\nWhat do you think is going on? Is it a bubble?',
              tags: ['web3', 'crypto'],
            }}
          />
        </div>
      </div>
      <div className='flex w-full basis-1/4'>
        <div className='mx-auto flex w-full max-w-sm flex-col gap-8'>
          <LatestPosts
            posts={[
              {
                content:
                  'Bitcoin rises to $1,000,000 in one day! what is going on?\n\nWhat do you think is going on? Is it a bubble?',
                tags: ['web3', 'crypto'],
              },
              {
                content:
                  'Bitcoin rises to $1,000,000 in one day! what is going on?\n\nWhat do you think is going on? Is it a bubble?',
                tags: ['web3', 'crypto'],
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/')({
  component: Home,
});
