import { convexQuery } from '@convex-dev/react-query';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { CommunityPosts, JoinLeaveCommunity } from '~/components';
import { api } from '~/convex/_generated/api';

const CommunityPage = () => {
  const { communityName } = Route.useParams();

  const { data: community } = useQuery(
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
      {community && <CommunityPosts communityId={community?._id} />}
    </div>
  );
};

export const Route = createFileRoute('/communities/$communityName')({
  component: CommunityPage,
});
