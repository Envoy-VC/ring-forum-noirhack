import { useMemo } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { Grumpkin } from '@aztec/foundation/crypto';
import { Fq, Point } from '@aztec/foundation/fields';
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
    const priv = Fq.random();
    const Curve = new Grumpkin();
    const pub = await Curve.mul(Grumpkin.generator, priv);

    setKeyPair({
      publicKey: pub.toString(),
      privateKey: priv.toString(),
    });

    await createUser({
      publicKey: pub.toString(),
    });
  };

  return { account, createAccount };
};
