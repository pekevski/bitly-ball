import Head from "next/head";
import React, { useState, useEffect } from "react";
import DashboardHeader from "../components/dashboard/Header";
import { Page } from "../components/Layout/Page";
import { useUser, Auth } from '@supabase/supabase-auth-helpers/react';
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import { useRouter } from "next/router";

export default function LoginPage() {
  const { user, isLoading, error } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // route to dashboard
      router.push(`/dashboard`);
    }
  }, [user, router]);

  if (isLoading) {
    return <h1>LOADING...</h1>
  }

  return (
    <Page>
      <Head>
        <title>Bitly Ball</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-full w-full">
        <DashboardHeader />
        
        <Auth
          supabaseClient={supabaseClient}
          // providers={['google']}
          socialLayout="horizontal"
          socialButtonSize="xlarge"
          magicLink={true}
        />
        {error && <p>{error.message}</p>}
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://pekevski.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by Daniel Pekevski
        </a>
      </footer>
    </Page>
  );
}
