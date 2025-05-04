import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/dialog';

import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { Textarea } from '@repo/ui/components/textarea';
import { useMutation } from 'convex/react';
import { useState } from 'react';
import { api } from '~/convex/_generated/api';

import { toast } from 'sonner';

export const CreateCommunity = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const createCommunity = useMutation(
    api.functions.communities.createCommunity
  );

  const onCreateCommunity = async () => {
    const id = toast.loading('Creating community...');
    try {
      setLoading(true);
      if (!(name && description)) {
        throw new Error('Name and description are required');
      }
      await createCommunity({
        name,
        description,
      });
      toast.success('Community created', { id });
      setName('');
      setDescription('');
    } catch (error) {
      toast.error((error as Error).message, { id });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild={true}>
        <Button
          variant='link'
          className='!text-foreground'
        >
          Create Community
        </Button>
      </DialogTrigger>
      <DialogContent className='!rounded-3xl !w-full !max-w-xl flex border-none'>
        <DialogHeader>
          <DialogTitle>Create Community</DialogTitle>
          <DialogDescription>
            Create a community of like-minded people to share your thoughts with
            the community. Community can range from a small group of friends to
            a large group of people with a shared interest.
          </DialogDescription>
          <Input
            className='!bg-white/10 mt-4 h-10 w-full max-w-xl border-none outline-none placeholder:text-accent-foreground/50 placeholder:text-base focus-visible:ring-0'
            placeholder='Community Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className='h-24'>
            <Textarea
              className='!bg-white/10 mt-4 h-full w-full border-none outline-none placeholder:text-accent-foreground/50 placeholder:text-base focus-visible:ring-0'
              rows={6}
              placeholder='What is your community about?'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className='mt-12 flex flex-row items-center justify-end'>
            <Button
              variant='secondary'
              onClick={onCreateCommunity}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Community'}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
