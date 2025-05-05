import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/dialog';

import { concat } from 'uint8arrays';

import { Fr } from '@aztec/foundation/fields';
import { Button } from '@repo/ui/components/button';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { verifyMembership } from '~/helpers/noir';
import type { PostWithCommunity } from '~/types';
import { ShieldCheckIcon } from '../icons/check';

interface VerifyPostProps {
  post: PostWithCommunity;
}

export const VerifyPost = ({ post }: VerifyPostProps) => {
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [proof, setProof] = useState<string>();

  const onVerify = async () => {
    const id = toast.loading('Verifying signature...');
    try {
      setIsVerifying(true);
      const res = await verifyMembership(post.signature, post.content);
      const proofHex = Buffer.from(res.proof).toString('hex');
      const remainingLength = proofHex.length - 512;
      setProof(`0x${proofHex.slice(0, 512)}... ${remainingLength} more`);
      toast.success('Membership verified', { id });
    } catch (error) {
      toast.error('Membership verification failed', { id });
    } finally {
      setIsVerifying(false);
    }
  };

  const signature = useMemo(() => {
    const c0 = Fr.fromHexString(post.signature.c0).toBuffer();
    const s = post.signature.s.map((_s) => {
      return Fr.fromHexString(_s).toBuffer();
    });
    const merged = concat([c0, ...s]);

    return `0x${Buffer.from(merged).toString('hex')}`;
  }, [post]);

  return (
    <Dialog>
      <DialogTrigger asChild={true}>
        <Button
          variant='ghost'
          className='!size-6 !p-0 !m-0 !rounded-sm'
        >
          <ShieldCheckIcon
            size={16}
            className='text-green-300'
          />
        </Button>
      </DialogTrigger>
      <DialogContent className='!rounded-3xl !w-full !max-w-xl flex border-none'>
        <DialogHeader>
          <DialogTitle>Verify Membership</DialogTitle>
          <DialogDescription>
            Verify the post belongs to a member of the community.
          </DialogDescription>
          <div className='flex flex-col gap-1'>
            <div className='px-1 font-medium text-lg'>Signature: </div>
            <div className='!w-full !max-w-xl mt-1 break-all rounded-xl bg-white/10 p-2'>
              {signature}
            </div>
          </div>
          {proof && (
            <div className='mt-2 flex flex-col gap-1'>
              <div className='px-1 font-medium text-lg'>Proof: </div>
              <div className='!w-full !max-w-xl mt-1 break-all rounded-xl bg-white/10 p-2'>
                {proof}
              </div>
            </div>
          )}
          <div className='mt-4 flex justify-end'>
            <Button
              variant='secondary'
              onClick={onVerify}
              disabled={isVerifying}
            >
              {isVerifying ? 'Verifying...' : 'Verify Signature'}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
