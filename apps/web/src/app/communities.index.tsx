import { Link, createFileRoute } from '@tanstack/react-router';
import Avvvatars from 'avvvatars-react';
import { useQuery } from 'convex/react';

import { api } from '~/convex/_generated/api';

const Home = () => {
  const communities = useQuery(api.functions.communities.getCommunities, {
    limit: 50,
  });

  return (
    <div className='mx-auto flex max-w-screen-2xl flex-col gap-6 px-4 py-12'>
      <div className='font-medium text-3xl'>Communities</div>
      <div className='flex flex-row items-center justify-start gap-4'>
        {communities?.map((community) => {
          return (
            <Link
              to='/communities/$communityName'
              params={{ communityName: community.name }}
              className='flex h-36 w-full max-w-sm flex-col rounded-3xl border border-primary px-4 py-5'
              key={community._id}
            >
              <div className='flex flex-row items-center gap-2'>
                <Avvvatars
                  value={community.name}
                  size={28}
                  style='shape'
                />
                <div className='font-medium text-2xl text-cyan-300'>
                  r/{community.name}
                </div>
              </div>
              <p className='pt-5 text-sm text-white/60'>
                {(community.description?.length ?? 0) > 128
                  ? `${community.description?.slice(0, 128)}...`
                  : community.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export const Route = createFileRoute('/communities/')({
  component: Home,
});
