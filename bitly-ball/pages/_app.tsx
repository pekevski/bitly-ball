import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import { supabase } from '../lib/SupabaseConfig';
import { Auth } from '@supabase/ui';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Component {...pageProps} />
    </Auth.UserContextProvider>
  );
}
export default MyApp;
