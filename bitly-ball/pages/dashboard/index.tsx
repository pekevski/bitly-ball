import Head from "next/head";
import React, { useState } from "react";
import { Page } from "../../components/Layout/Page";
import CreateRoom from "../../components/dashboard/CreateRoom";
import DashboardHeader from "../../components/dashboard/Header";
import JoinRoom from "../../components/dashboard/JoinRoom";

export default function Dashboard() {


  return (
    <Page>
      <Head>
        <title>Bitly Ball</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
          <DashboardHeader />
          <div className="flex">
            <CreateRoom />
            <JoinRoom />
          </div>
      </div>

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
