import React from 'react';
import { Page } from '../../components/Layout/Page';
import CreateRoom from '../../components/dashboard/CreateRoom';
import DashboardHeader from '../../components/dashboard/Header';
import JoinRoom from '../../components/dashboard/JoinRoom';
import { Footer } from '../../components/Layout/Footer';

export default function Dashboard() {
  return (
    <Page>
      <DashboardHeader />

      <div className="flex">
        <CreateRoom />
        <JoinRoom />
      </div>

      <Footer />
    </Page>
  );
}
