import type { CompiledCircuit } from '@noir-lang/noir_js';
import type { RingSignature } from '@zkpersona/noir-ring-signatures';
import { sagToNoirInputs, sign } from '@zkpersona/noir-ring-signatures/sag';

import { pedersenHashBuffer } from '@aztec/foundation/crypto';

import os from 'node:os';

import { Fq, Fr, Point } from '@aztec/aztec.js';
import { Prover, toCircuitInputs } from '@zkpersona/noir-helpers';
import sag8 from 'public/circuits/sag_8.json';
import sag16 from 'public/circuits/sag_16.json';
import sag32 from 'public/circuits/sag_32.json';
import sag64 from 'public/circuits/sag_64.json';
import sag128 from 'public/circuits/sag_128.json';

export interface SerializedRingSignature {
  c0: string;
  s: string[];
  publicKeys: string[];
}

export const serializeSignature = (signature: RingSignature) => {
  return {
    c0: signature.c0.toString(),
    s: signature.s.map((s) => s.toString()),
    publicKeys: signature.publicKeys.map((k) => k.toString()),
  };
};

export const deserializeSignature = (
  serializedSignature: SerializedRingSignature
): RingSignature => {
  return {
    c0: Fq.fromString(serializedSignature.c0),
    s: serializedSignature.s.map((s) => Fq.fromString(s)),
    publicKeys: serializedSignature.publicKeys.map((k) => Point.fromString(k)),
  };
};

export const getCircuit = (memberCount: number) => {
  if (memberCount <= 8) {
    return sag8 as CompiledCircuit;
  }
  if (memberCount <= 16) {
    return sag16 as CompiledCircuit;
  }
  if (memberCount <= 32) {
    return sag32 as CompiledCircuit;
  }
  if (memberCount <= 64) {
    return sag64 as CompiledCircuit;
  }
  if (memberCount <= 128) {
    return sag128 as CompiledCircuit;
  }
  throw new Error('Member count too large');
};

export const getMaxMemberCount = (totalMembers: number) => {
  if (totalMembers <= 8) {
    return 8;
  }
  if (totalMembers <= 16) {
    return 16;
  }
  if (totalMembers <= 32) {
    return 32;
  }
  if (totalMembers <= 64) {
    return 64;
  }
  if (totalMembers <= 128) {
    return 128;
  }
  throw new Error('Member count too large');
};

interface SignMessageOptions {
  message: string;
  publicKeys: string[];
  signer: {
    publicKey: Point;
    privateKey: Fq;
  };
}

export const signMessage = async ({
  message,
  publicKeys,
  signer,
}: SignMessageOptions) => {
  const signerIndex = publicKeys.indexOf(signer.publicKey.toString());
  if (signerIndex === -1) {
    throw new Error('User is not a member');
  }
  const messageFr = Fr.fromBuffer(
    await pedersenHashBuffer(Buffer.from(message))
  );

  const signature = await sign(
    messageFr,
    publicKeys.map((k) => Point.fromString(k)),
    signer.privateKey,
    signerIndex
  );

  return serializeSignature(signature);
};

export const verifyMembership = async (
  signature: SerializedRingSignature,
  message: string
) => {
  const circuit = getCircuit(signature.publicKeys.length);

  const prover = new Prover(circuit, {
    type: 'honk',
    options: { threads: os.cpus().length },
  });

  const messageFr = Fr.fromBuffer(
    await pedersenHashBuffer(Buffer.from(message))
  );

  const deserializedSignature = deserializeSignature(signature);
  const inputs = sagToNoirInputs(
    deserializedSignature,
    messageFr,
    getMaxMemberCount(signature.publicKeys.length)
  );

  const proof = await prover.fullProve(toCircuitInputs(inputs));

  return proof;
};
