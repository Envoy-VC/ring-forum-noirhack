import { generateKeyPair } from '@zkpersona/noir-ring-signatures';
import { useMemo } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { Fq, Point } from '@aztec/aztec.js';
import { useMutation } from 'convex/react';
import { api } from '~/convex/_generated/api';

interface Account {
  publicKey: string;
  privateKey: string;
}

export const useAccount = () => {
  const createUser = useMutation(api.functions.users.createUser);
  const [keyPair, setKeyPair] = useLocalStorage<Account | null>(
    'ring-forum-account',
    null
  );

  const account = useMemo(() => {
    if (!keyPair) return null;
    return {
      publicKey: Point.fromString(keyPair.publicKey),
      privateKey: Fq.fromHexString(keyPair.privateKey),
    };
  }, [keyPair]);

  const createAccount = async () => {
    const keyPair = await generateKeyPair();
    await createUser({
      publicKey: keyPair.publicKey.toString(),
    });
    setKeyPair({
      publicKey: keyPair.publicKey.toString(),
      privateKey: keyPair.privateKey.toString(),
    });
  };

  return { account, createAccount };
};
