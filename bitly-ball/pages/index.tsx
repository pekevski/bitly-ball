import Head from "next/head";
import React, { useState, useEffect } from "react";
import DashboardHeader from "../components/dashboard/Header";
import { Page } from "../components/Layout/Page";
import { useUser, Auth } from '@supabase/supabase-auth-helpers/react';
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import { useRouter } from "next/router";
import { Footer } from "../components/Layout/Footer";

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
    return <h1>⚽ Loading...</h1>
  }

  return (
    <Page>
      <main className="h-full w-full">
        <DashboardHeader />
        
        <div className="p-5 my-10 bg-white border w-full md:w-6/12">
          <Auth
            supabaseClient={supabaseClient}
            // providers={['google']}
            socialLayout="horizontal"
            socialButtonSize="xlarge"
            magicLink={true}
            />
          {error && <p>{error.message}</p>}
        </div>
      </main>

      <Footer />
    </Page>
  );
}
