import Head from "next/head";
import React from "react";
import Router from 'next/router'


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
        <h1 className="text-2xl">Bitly Ball</h1>

        <div className="m-6">
          <div className="border border-b-0 rounded-b-none border-gray-200 rounded-lg">
            <div className="flex p-1">
              <div className="flex">
                <div className="rounded-full m-0.5 bg-red-500 w-3 h-3"></div>
                <div className="rounded-full m-0.5 bg-yellow-500 w-3 h-3"></div>
                <div className="rounded-full m-0.5 bg-green-500 w-3 h-3"></div>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg rounded-t-none">
            <button onClick={(e) => handleCreateRoom(e)}>Create Room</button>
          </div>
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
