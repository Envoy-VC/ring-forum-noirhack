import { convexQuery } from '@convex-dev/react-query';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { JoinLeaveCommunity, Post } from '~/components';
import { api } from '~/convex/_generated/api';

const CommunityPage = () => {
  const { communityName } = Route.useParams();

  const { data: community, isLoading } = useQuery(
    convexQuery(api.functions.communities.getCommunity, { communityName })
  );

  return (
    <div className='mx-auto my-12 max-w-screen-xl px-3 py-12'>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-row items-center justify-between'>
          <div className='font-medium text-5xl'>
            {community?.name ? `r/${community.name}` : 'Loading...'}
          </div>
          <JoinLeaveCommunity communityId={community?._id ?? null} />
        </div>
        <div className='text-foreground/60'>{community?.description}</div>
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

export const Route = createFileRoute('/communities/$communityName')({
  component: CommunityPage,
});
