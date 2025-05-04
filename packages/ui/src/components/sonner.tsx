'use client';

import { Loader } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group !rounded-3xl'
      icons={{
        loading: <Loader className='size-4 animate-spin text-white' />,
      }}
      toastOptions={{
        className: '!border-none !rounded-lg',
      }}
      style={
        {
          '--normal-bg': 'var(--secondary)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
