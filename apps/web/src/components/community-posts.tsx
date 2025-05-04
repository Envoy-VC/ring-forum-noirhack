import { useQuery } from 'convex/react';
import { api } from '~/convex/_generated/api';
import { Post } from './post';

interface CommunityPostsProps {
  communityId: string & { __tableName: 'communities' };
}

export const CommunityPosts = ({ communityId }: CommunityPostsProps) => {
  const posts = useQuery(api.functions.communities.getPostsForCommunity, {
    communityId,
  });

  return (
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
  );
};
