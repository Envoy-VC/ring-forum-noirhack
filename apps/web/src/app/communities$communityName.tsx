import { Button } from '@repo/ui/components/button';
import { createFileRoute } from '@tanstack/react-router';
import { Post } from '~/components/post';

const CommunityPage = () => {
  const { communityName } = Route.useParams();
  return (
    <div className='mx-auto my-12 max-w-screen-xl px-3 py-12'>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-row items-center justify-between'>
          <div className='font-medium text-5xl'>r/Bitcoin</div>
          <Button variant='secondary'>Join Community</Button>
        </div>
        <div className='text-foreground/60'>
          All things related to the Bitcoin ecosystem, including news, analysis,
          token prices, BIPs, and more.
        </div>
      </div>
      <div className='pt-12 pb-4 font-medium text-3xl'>Posts</div>
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
        <Post
          post={{
            content:
              'Bitcoin rises to $1,000,000 in one day! what is going on?\n\nWhat do you think is going on? Is it a bubble?',
            tags: ['web3', 'crypto'],
          }}
        />
      </div>
    </div>
  );
};

export const Route = createFileRoute('/communities$communityName')({
  component: CommunityPage,
});
