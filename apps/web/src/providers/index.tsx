import type { PropsWithChildren } from 'react';
import { ConvexClientProvider } from './convex';
import { NuqsProvider } from './nuqs';

export const ProviderTree = ({ children }: PropsWithChildren) => {
  return (
    <NuqsProvider>
      <ConvexClientProvider>{children}</ConvexClientProvider>
    </NuqsProvider>
  );
};
