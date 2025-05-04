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

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreatePostDialog = ({
  open,
  onOpenChange,
}: CreatePostDialogProps) => {
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
              placeholder={`Let's share what going on your mind...`}
            />
          </div>
          <div className='mt-12 flex flex-row items-center justify-between'>
            <div>
              <Select>
                <SelectTrigger className='!bg-primary !text-foreground/60 w-[180px] border-none'>
                  <SelectValue placeholder='Theme' />
                </SelectTrigger>
                <SelectContent className='border-white/30'>
                  <SelectItem value='light'>Light</SelectItem>
                  <SelectItem value='dark'>Dark</SelectItem>
                  <SelectItem value='system'>System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Button variant='secondary'>Create Post</Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
