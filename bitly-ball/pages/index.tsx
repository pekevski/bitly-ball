import React, { useEffect } from 'react';
import DashboardHeader from '../components/dashboard/Header';
import { Page } from '../components/Layout/Page';
import { supabase } from '../lib/SupabaseConfig';
import { useRouter } from 'next/router';
import { Footer } from '../components/Layout/Footer';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';

export default function LoginPage() {
  const { user } = Auth.useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      console.log("user is logged in", user)
      // route to dashboard
      router.push(`/dashboard`);
      console.log("is this working?")
    }
    console.log("user is", user)
  }, [user, router]);

  return (
    <Page signOut={supabase.auth.signOut}>
      <main className="h-full w-full">
        <DashboardHeader />

        <div className="p-5 my-10 bg-white border w-full md:w-6/12">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            socialLayout="horizontal"
            magicLink={true}
            // providers={['google']}
          />
        </div>
      </main>

      <Footer />
    </Page>
  );
}
