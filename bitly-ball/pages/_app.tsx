import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import { supabase } from '../lib/SupabaseConfig';
import { UserProvider } from '@supabase/auth-helpers-react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <UserProvider supabaseClient={supabase}>
        <Component {...pageProps} />
    // </UserProvider>
  );
}
export default MyApp;
