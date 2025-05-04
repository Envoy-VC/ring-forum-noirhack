import { generateKeyPair } from '@zkpersona/noir-ring-signatures';
import { useMemo } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { Fr, Point } from '@aztec/aztec.js';

interface Account {
  publicKey: string;
  privateKey: string;
}

export const useAccount = () => {
  const [keyPair, setKeyPair] = useLocalStorage<Account | null>(
    'ring-forum-account',
    null
  );

  const account = useMemo(() => {
    if (!keyPair) return null;
    return {
      publicKey: Fr.fromHexString(keyPair.publicKey),
      privateKey: Point.fromString(keyPair.privateKey),
    };
  }, [keyPair]);

  const createAccount = async () => {
    const keyPair = await generateKeyPair();
    setKeyPair({
      publicKey: keyPair.publicKey.toString(),
      privateKey: keyPair.privateKey.toString(),
    });
  };

  return { account, createAccount };
};
