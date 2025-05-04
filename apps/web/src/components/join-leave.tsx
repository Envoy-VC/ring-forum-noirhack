import { Button } from '@repo/ui/components/button';
import { useMutation, useQuery } from 'convex/react';
import { toast } from 'sonner';
import { api } from '~/convex/_generated/api';
import { useAccount } from '~/hooks';

interface JoinLeaveCommunityProps {
  communityId: (string & { __tableName: 'communities' }) | null;
}

export const JoinLeaveCommunity = ({
  communityId,
}: JoinLeaveCommunityProps) => {
  const { account } = useAccount();
  const hasJoined = useQuery(
    api.functions.users.isPartOfCommunity,
    account && communityId
      ? { publicKey: account.publicKey.toString(), communityId }
      : 'skip'
  );

  const joinCommunity = useMutation(api.functions.communities.joinCommunity);
  const leaveCommunity = useMutation(api.functions.communities.leaveCommunity);

  const onJoinCommunity = async () => {
    try {
      const pub = account?.publicKey.toString();
      if (!pub) {
        throw new Error('No account found');
      }
      if (!communityId) {
        throw new Error('No community found');
      }
      await joinCommunity({ communityId: communityId, publicKey: pub });
      toast.success('Joined community');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const onLeaveCommunity = async () => {
    try {
      const pub = account?.publicKey.toString();
      if (!pub) {
        throw new Error('No account found');
      }
      if (!communityId) {
        throw new Error('No community found');
      }
      await leaveCommunity({ communityId: communityId, publicKey: pub });
      toast.success('Left community');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  if (hasJoined) {
    return (
      <Button
        variant='secondary'
        onClick={onLeaveCommunity}
      >
        Leave Community
      </Button>
    );
  }

  return (
    <Button
      variant='secondary'
      onClick={onJoinCommunity}
    >
      Join Community
    </Button>
  );
};
