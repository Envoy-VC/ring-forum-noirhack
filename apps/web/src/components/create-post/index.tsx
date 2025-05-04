'use client';

import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import Avatar from 'avvvatars-react';
import { useState } from 'react';
import { CreatePostDialog } from './create-dialog';

export const CreatePost = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <CreatePostDialog
        open={open}
        onOpenChange={setOpen}
      />
      <div className='flex w-full flex-row items-center justify-start gap-4 rounded-2xl bg-primary px-4 py-4'>
        <div className='flex size-10 items-center justify-center'>
          <Avatar
            value='envoy1084'
            size={36}
            style='shape'
          />
        </div>
        <Input
          className='!rounded-lg !bg-white/10 h-10 w-full max-w-xl border-none outline-none placeholder:text-accent-foreground/50 placeholder:text-base focus-visible:ring-0'
          placeholder={`Let's share what going on your mind...`}
          onClick={() => setOpen(true)}
        />
        <Button
          variant='secondary'
          className='w-fit'
          onClick={() => setOpen(true)}
        >
          Create Post
        </Button>
      </div>
    </>
  );
};
