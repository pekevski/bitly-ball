import Head from "next/head";
import React from "react";
import Router from 'next/router'
import BrowserWindow from "../components/BrowserWindow";


export default function Home() {

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    Router.push('/rooms/1')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Bitly Ball</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">

        <div className="m-6">
          <BrowserWindow>
            <button onClick={(e) => handleCreateRoom(e)}>Create Room</button>
          </BrowserWindow>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Daniel
        </a>
      </footer>
    </div>
  );
}
