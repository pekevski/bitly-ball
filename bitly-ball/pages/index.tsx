import Head from "next/head";
import React, { useState } from "react";
import Router from "next/router";
import { createPlayer, createRoom, fetchRoom } from "../lib/Repository";
import NumberCounter from "../components/NumberCounter";
import Button from "../components/Button";
import { Room, RoomStatusEnum } from "../types/Room";
import { Page } from "../components/Layout/Page";
import { savePlayerLocalStorage } from "../lib/LocalStorage";

export default function Home() {
  const [mode, setMode] = useState<"create" | "join">("create");
  const [playerName, setPlayerName] = useState<string>("");
  const [rounds, setRounds] = useState<number>(3);
  const [roomId, setRoomId] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);

  const handleCreateRoom = async () => {
    console.log("BITLY => handle Create Room");

    try {
      if (!playerName) {
        throw new Error("Please provide a player name");
      } else if (playerName.length <= 2) {
        throw new Error("Player name must be more than 2 characters");
      }

      setError(undefined);

      const room = await createRoom(rounds);

      if (room) {
        const player = await createPlayer({ name: playerName, roomId: room.id, isHost: true });

        if (player) {
          await savePlayerLocalStorage(player);
        }
        // save player to localstorage
        Router.push(`/rooms/${room.id}`);
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  const handleJoinRoom = async () => {
    console.log("BITLY => handle Join Room");

    try {
      if (!roomId) {
        throw new Error("Please provide a room code");
      } else if (!playerName) {
        throw new Error("Please provide a player name");
      } else if (playerName.length <= 2) {
        throw new Error("Player name must be more than 2 characters");
      }

      const roomToJoin: Room | null | undefined = await fetchRoom(
        roomId,
        undefined
      );

      if (!roomToJoin) {
        throw new Error(
          `Room ${roomId} does not exist. Please try join another room`
        );
      } else if (roomToJoin?.status === RoomStatusEnum.INPROGRESS) {
        throw new Error(
          `Room ${roomId} is already in progress. It cannot be joined`
        );
      }

      setError(undefined);

      // Cant join room if it is not created or already inprogress
      const player = await createPlayer({
        name: playerName,
        roomId: roomId,
        isHost: false,
      });

      if (player) {
        await savePlayerLocalStorage(player);
      }

      Router.push(`/rooms/${roomId}`);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  const handleMode = (e: React.FormEvent, mode: "create" | "join") => {
    console.log("BITLY => handle Mode");

    e.preventDefault();

    if (mode === "create") {
      setRoomId("");
    }

    setError(undefined);
    setMode(mode);
  };

  return (
    <Page>
      <Head>
        <title>Bitly Ball</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="lg:p-10 h-full w-full">
        <div className="flex items-center p-4 lg:justify-center rounded">
          <div className="flex flex-col rounded shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
            <div className="p-5 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-between">
              <div className="text-4xl font-bold tracking-wider text-center">
                <a href="#">
                  <h1 className="font-bitlyTitle text-6xl p-5 text-center hover:animate-bounce">
                    Bitly Ball
                  </h1>
                </a>
              </div>

              <p className="font-normal text-justify text-gray-100">
                Verse your friends and get points for finding a{" "}
                <a href="https://bit.ly" className="underline">
                  bit.ly/
                </a>{" "}
                url that does not 404!
              </p>

              <p className="my-2 font-normal text-justify text-gray-100">
                Earn points per character in your bitly phrase. If you 404 then
                those points get deducted.
              </p>

              <div className="mt-2 flex w-full">
                <button
                  onClick={(e) => handleMode(e, "create")}
                  className={`${
                    mode === "create"
                      ? "bg-blue-600 text-gray-100 "
                      : "bg-white text-gray-700 "
                  } rounded-r-none border-0 px-4 py-2 rounded w-full hover:bg-blue-300 focus:outline-none text-lg font-semibold`}
                >
                  Create
                </button>
                <button
                  onClick={(e) => handleMode(e, "join")}
                  className={`${
                    mode === "join"
                      ? "bg-blue-600 text-gray-100 "
                      : "bg-white text-gray-700 "
                  } rounded-l-none border-0 border-l-0 px-4 py-2 rounded w-full hover:bg-blue-300 focus:outline-none text-lg font-semibold`}
                >
                  Join
                </button>
              </div>
            </div>

            {mode === "create" && (
              <div className="p-5 bg-white md:flex-1 flex flex-col justify-between space-y-5">
                <form action="#" className="flex flex-col space-y-5">
                  <h3 className="text-2xl font-semibold text-gray-700">
                    Create a room
                  </h3>
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="createPlayerName"
                      className="text-sm font-semibold text-gray-500"
                    >
                      Your Player Name
                    </label>
                    <input
                      type="text"
                      id="createPlayerName"
                      autoFocus={true}
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="numberOfRounds"
                      className="text-sm font-semibold text-gray-500"
                    >
                      Number of Rounds
                    </label>
                    <NumberCounter
                      id={"numberOfRounds"}
                      min={1}
                      max={5}
                      value={rounds}
                      onValueChange={(e) => setRounds(e)}
                    />
                  </div>
                </form>
                <Button handleClick={handleCreateRoom} disabled={false}>Create</Button>
                {error && (
                  <h1 className="text-red-400">
                    <span className="pr-2">🚫</span> {error}
                  </h1>
                )}
              </div>
            )}

            {mode === "join" && (
              <div className="p-5 bg-white md:flex-1 flex flex-col justify-between space-y-5">
                <form action="#" className="flex flex-col space-y-5">
                  <h3 className="text-2xl font-semibold text-gray-700">
                    Join a room
                  </h3>
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="joinRoom"
                      className="text-sm font-semibold text-gray-500"
                    >
                      Room Code
                    </label>
                    <input
                      type="text"
                      id="joinRoom"
                      autoFocus={true}
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value)}
                      className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="createPlayerName"
                      className="text-sm font-semibold text-gray-500"
                    >
                      Your Player Name
                    </label>
                    <input
                      type="text"
                      id="createPlayerName"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                  </div>
                </form>
                <Button handleClick={handleJoinRoom} disabled={false}>Join</Button>
                {error && (
                  <h1 className="text-red-400">
                    <span className="pr-2">🚫</span> {error}
                  </h1>
                )}{" "}
              </div>
            )}
          </div>
        </div>
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
