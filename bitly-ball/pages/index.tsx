import Head from 'next/head';
import React, { useEffect } from 'react';
import DashboardHeader from '../components/dashboard/Header';
import { Page } from '../components/Layout/Page';
import { useRouter } from 'next/router';
import { Footer } from '../components/Layout/Footer';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Database } from '../types/database';

export default function LoginPage() {
  const supabaseClient = useSupabaseClient<Database>();
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // route to dashboard
      router.push(`/dashboard`);
    }
  }, [user, router]);

  return (
    <Page>
      <main className="h-full w-full">
        <DashboardHeader />

        <div className="p-5 my-10 bg-white border w-full md:w-6/12">
          <Auth
            appearance={{ theme: ThemeSupa }}
            supabaseClient={supabaseClient}
            // providers={['google', 'github']}
            // socialLayout="horizontal"
            magicLink={true}
          />
        </div>
      </main>

      <Footer />
    </Page>
  );
}
