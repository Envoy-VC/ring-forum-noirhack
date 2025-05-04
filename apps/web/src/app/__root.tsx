import { Outlet, createRootRoute } from '@tanstack/react-router';
import { ProviderTree } from '~/providers';

import '@repo/ui/globals.css';
import { Toaster } from '@repo/ui/components/sonner';
import { Navbar } from '~/components';

const RootComponent = () => {
  return (
    <ProviderTree>
      <Navbar />
      <Outlet />
      <Toaster className='!border-none' />
    </ProviderTree>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
