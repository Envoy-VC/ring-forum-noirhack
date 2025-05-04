import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/dialog';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/select';

import { Button } from '@repo/ui/components/button';
import { Textarea } from '@repo/ui/components/textarea';
import Avvvatars from 'avvvatars-react';
import { useMutation, useQuery } from 'convex/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { api } from '~/convex/_generated/api';
import { signMessage } from '~/helpers/noir';
import { useAccount } from '~/hooks';
import { convex } from '~/providers/convex';

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreatePostDialog = ({
  open,
  onOpenChange,
}: CreatePostDialogProps) => {
  const { account } = useAccount();
  const [message, setMessage] = useState<string>('');
  const [community, setCommunity] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createPost = useMutation(api.functions.posts.createPost);

  const userCommunities = useQuery(
    api.functions.users.getUserCommunities,
    account ? { publicKey: account.publicKey.toString() } : 'skip'
  );

  const onPostMessage = async () => {
    if (message.trim() === '') return;
    const id = toast.loading('Checking Community Membership...');
    try {
      setIsLoading(true);
      if (!account) {
        throw new Error('No account found');
      }
      const members = await convex.query(
        api.functions.communities.getMembersInCommunity,
        {
          communityId: community as string & { __tableName: 'communities' },
        }
      );

      const signature = await signMessage({
        message,
        publicKeys: members.map((m) => m.publicKey),
        signer: account,
      });

      await createPost({
        content: message,
        publicKey: account.publicKey.toString(),
        communityId: community as string & { __tableName: 'communities' },
        signature,
      });

      setMessage('');

      toast.success('Post created', { id });
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      toast.dismiss(id);
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className='!rounded-3xl !w-full !max-w-xl flex border-none'>
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>
            Create a post to share your thoughts with the community. You must be
            part of a community to create a post.
          </DialogDescription>
          <div className='h-42'>
            <Textarea
              className='!bg-white/10 mt-4 h-full w-full border-none outline-none placeholder:text-accent-foreground/50 placeholder:text-base focus-visible:ring-0'
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Let's share what going on your mind...`}
            />
          </div>
          <div className='mt-12 flex flex-row items-center justify-between'>
            <div>
              <Select
                value={community}
                onValueChange={setCommunity}
              >
                <SelectTrigger className='!bg-primary !text-foreground/60 w-[180px] border-none'>
                  <SelectValue placeholder='Select Community' />
                </SelectTrigger>
                <SelectContent className='border-white/30'>
                  {userCommunities?.map((community) => {
                    return (
                      <SelectItem
                        key={community._id}
                        value={community._id}
                        className='flex flex-row items-center gap-2'
                      >
                        <Avvvatars
                          value={community.name}
                          size={16}
                          style='shape'
                        />
                        r/{community.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Button
                variant='secondary'
                onClick={onPostMessage}
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Post'}
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
