import Head from "next/head";
import React, { useState } from "react";
import Router from 'next/router'
import BrowserWindow from "../components/BrowserWindow";
import { createPlayer, createRoom } from "../lib/Store";


export default function Home() {

  const [mode, setMode] = useState<'create' | 'join'>('create');
  const [playerName, setPlayerName] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    const room = await createRoom();

    if (room) {
      const player = await createPlayer(playerName, room.id)
      Router.push(`/rooms/${room.id}`)
    }

  }

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: validate if room even exists...

    const player = await createPlayer(playerName, roomId)

    Router.push(`/rooms/${roomId}`)
  }

  const handleMode = (e: React.FormEvent, mode: 'create' | 'join') => {
    e.preventDefault();

    if (mode === 'create') {
      setRoomId("");
    }

    setMode(mode);
  }

  return (
    <div className="flex flex-col min-h-screen h-screen items-center">
      <Head>
        <title>Bitly Ball</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4 lg:p-10 h-full w-full bg-gradient-to-r from-gray-100 to-gray-200">

          {/* <BrowserWindow> */}
 
            <div className="flex items-center p-4 lg:justify-center">
                  <div
                    className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md"
                  >
                    <div
                      className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly"
                    >
                      <div className="my-3 text-4xl font-bold tracking-wider text-center">
                        <a href="#">
                          <h1 className="font-bitlyTitle text-6xl p-5 text-center">Bitly Ball</h1>
                        </a>
                      </div>
                      <p className="mt-2 font-normal text-center text-gray-100">
                        Verse your friends and get points for finding a bit.ly/ url that does not 404!
                      </p>
                      <p className="mt-2 font-normal text-center text-gray-100">
                        Earn points per character in your bitly phrase. If you 404 then those points get deducted.
                      </p>

                      <div className="flex mt-6 w-full">
                        <button 
                          onClick={(e) => handleMode(e, 'create')}
                          className={`${mode === 'create' ? 'bg-blue-600 text-gray-100 ' : 'bg-white text-gray-700 '} text-base rounded-r-none border-0 px-4 py-2 rounded w-full hover:bg-blue-300 focus:outline-none `}>
                            Create
                        </button>
                        <button 
                          onClick={(e) => handleMode(e, 'join')}
                          className={`${mode === 'join' ? 'bg-blue-600 text-gray-100 ' : 'bg-white text-gray-700 '} rounded-l-none border-0 border-l-0 px-4 py-2 rounded w-full hover:bg-blue-300 focus:outline-none `}>
                            Join
                        </button>
                    </div>
                    </div>

                    { mode === 'create' && 
                      <div className="p-5 bg-white md:flex-1">
                        <h3 className="my-4 text-2xl font-semibold text-gray-700">Create a room</h3>
                        <form action="#" className="flex flex-col space-y-5">
                          <div className="flex flex-col space-y-1">
                            <label htmlFor="createPlayerName" className="text-sm font-semibold text-gray-500">Your player name</label>
                            <input
                              type="text"
                              id="createPlayerName"
                              autoFocus={true}
                              value={playerName}
                              onChange={(e) => setPlayerName(e.target.value)}
                              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                            />
                          </div>
                          
                          <div>
                            <button
                              type="submit"
                              onClick={(e) => handleCreateRoom(e)}
                              className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                            >
                              Create
                            </button>
                          </div>
                          
                        </form>
                      </div>
                    }

                    { mode === 'join' && 
                      <div className="p-5 bg-white md:flex-1">
                        <h3 className="my-4 text-2xl font-semibold text-gray-700">Join a room</h3>
                        <form action="#" className="flex flex-col space-y-5">

                        <div className="flex flex-col space-y-1">
                            <label htmlFor="roomCode" className="text-sm font-semibold text-gray-500">Room code</label>
                            <input
                              type="text"
                              id="roomCode"
                              autoFocus={true}
                              value={roomId}
                              onChange={(e) => setRoomId(e.target.value)}
                              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                            />
                          </div>

                          <div className="flex flex-col space-y-1">
                            <label htmlFor="createPlayerName" className="text-sm font-semibold text-gray-500">Your player name</label>
                            <input
                              type="text"
                              id="createPlayerName"
                              value={playerName}
                              onChange={(e) => setPlayerName(e.target.value)}
                              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                            />
                          </div>
                          
                          <div>
                            <button
                              type="submit"
                              onClick={(e) => handleJoinRoom(e)}
                              className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                            >
                              Join
                            </button>
                          </div>
                          
                        </form>
                      </div>
                    }
                  </div>
                </div>

          {/* </BrowserWindow> */}
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
