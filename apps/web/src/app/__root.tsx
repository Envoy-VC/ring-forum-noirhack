import { Outlet, createRootRoute } from '@tanstack/react-router';
import { ProviderTree } from '~/providers';

import '@repo/ui/globals.css';
import { Navbar } from '~/components';

const RootComponent = () => {
  return (
    <ProviderTree>
      <Navbar />
      <Outlet />
    </ProviderTree>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
