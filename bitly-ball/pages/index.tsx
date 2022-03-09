import Head from "next/head";
import React, { useState } from "react";
import { Page } from "../components/Layout/Page";

export default function Home() {

  return (
    <Page>
      <Head>
        <title>Bitly Ball</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="lg:p-10 h-full w-full">
        Supabase auth goes here.
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
