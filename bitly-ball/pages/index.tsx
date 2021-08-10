import Head from "next/head";
import React from "react";
import Router from 'next/router'
import BrowserWindow from "../components/BrowserWindow";
import { createPlayer, createRoom } from "../lib/Store";


export default function Home() {

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    const room = await createRoom();

    if (room) {
      const player = await createPlayer("test2", room.id)
      Router.push(`/rooms/${room.id}`)
    }

  }

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    Router.push(`/rooms/92db247f-8632-41b9-be67-8169afef24cb`)
  }

  return (
    <div className="flex flex-col min-h-screen h-screen items-center">
      <Head>
        <title>Bitly Ball</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4 lg:p-10 h-full w-full">

          <BrowserWindow>
            <h1 className="font-bitlyTitle text-6xl p-5 text-center">Bitly Ball</h1>

            <button onClick={(e) => handleCreateRoom(e)} className="m-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              Create Room
            </button>

            <button onClick={(e) => handleJoinRoom(e)}  className="m-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              Join Room
            </button>
          </BrowserWindow>
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
    </div>
  );
}
