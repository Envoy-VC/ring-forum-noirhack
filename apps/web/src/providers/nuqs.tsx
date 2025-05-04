import { NuqsAdapter } from 'nuqs/adapters/react';
import type { PropsWithChildren } from 'react';

export const NuqsProvider = ({ children }: PropsWithChildren) => {
  return <NuqsAdapter>{children}</NuqsAdapter>;
};
