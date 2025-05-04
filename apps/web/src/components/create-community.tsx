'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/dialog';

import {} from '@repo/ui/components/select';

import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { Textarea } from '@repo/ui/components/textarea';
import { useState } from 'react';

export const CreateCommunity = () => {
  const [open, setOpen] = useState<boolean>(false);
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
          />
          <div className='h-24'>
            <Textarea
              className='!bg-white/10 mt-4 h-full w-full border-none outline-none placeholder:text-accent-foreground/50 placeholder:text-base focus-visible:ring-0'
              rows={6}
              placeholder='What is your community about?'
            />
          </div>

          <div className='mt-12 flex flex-row items-center justify-end'>
            <Button variant='secondary'>Create Community</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
