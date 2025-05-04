'use client';

import Avatar from 'avvvatars-react';
import { useAccount } from '~/hooks';

import { Button } from '@repo/ui/components/button';
export const CreateAccount = () => {
  const { account, createAccount } = useAccount();

  if (account) {
    return (
      <Avatar
        value={account.publicKey.toString()}
        size={36}
        style='shape'
      />
    );
  }

  return (
    <Button
      variant='secondary'
      onClick={createAccount}
    >
      Create Account
    </Button>
  );
};
