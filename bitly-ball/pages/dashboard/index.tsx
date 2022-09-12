import React from 'react';
import { Page } from '../../components/Layout/Page';
import CreateRoom from '../../components/dashboard/CreateRoom';
import DashboardHeader from '../../components/dashboard/Header';
import JoinRoom from '../../components/dashboard/JoinRoom';
import { Footer } from '../../components/Layout/Footer';
import { supabase } from '../../lib/SupabaseConfig';

export default function Dashboard() {
  return (
    <Page signOut={supabase.auth.signOut}>
      <DashboardHeader />

      <div className="flex">
        <CreateRoom />
        <JoinRoom />
      </div>

      <Footer />
    </Page>
  );
}
