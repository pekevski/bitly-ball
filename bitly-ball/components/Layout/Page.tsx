import React, { PropsWithChildren } from 'react';
import { NavBar } from './NavBar';
import Head from 'next/head';
import { ApiError } from '@supabase/supabase-js';

type PageProps = PropsWithChildren<{
  signOut: () => Promise<{ error: ApiError | null }>
  title?: string;
}>;

export const Page: React.FC<PageProps> = ({ signOut, title, children }) => {
  return (
    <>
      {/* Head content TODO: improve me for metadata tags... */}
      <Head>
        <title>{title || '⚽ Bitly Ball'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <NavBar signOut={signOut} />

      {/* Page content */}
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </>
  );
};
