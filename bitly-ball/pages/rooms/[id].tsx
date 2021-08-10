import Head from "next/head";
import React, { ReactNode, useEffect, useState } from "react";
import BitlyImage from "../../components/BitlyImage";
import { useRouter } from "next/router";
import { createPlayer, useStore } from "../../lib/Store";
import BrowserWindow from "../../components/BrowserWindow";
import TextInput from "../../components/TextInput";
import Players from "../../components/Players";

type RoomPageProps = {};

const RoomPage: React.FC<RoomPageProps> = (props) => {
  
  const router = useRouter();
  const query = router.query;
  const roomId = query.id as string;
  
  const [url, setUrl] = useState<string>("");
  const { players } = useStore({ roomId });
  
  const handleAddPlayer = async (event: React.FormEvent) => {
    event.preventDefault();
    const player = await createPlayer("test101", roomId)
  }

  return (
    <div className="flex flex-col min-h-screen h-screen items-center">
      <Head>
        <title>Bitly Ball</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4 lg:p-10 h-full w-full bg-gradient-to-r from-green-400 to-blue-500">
          <BrowserWindow>

            <div className="relative flex flex-row h-full">
              <div className="flex-1 p-5 flex flex-col justify-center text-center">
                <h1 className="font-bitlyTitle text-6xl pb-5">Bitly Ball</h1>
                {!!url.length && <BitlyImage url={url} />}
                <TextInput handleSubmit={setUrl} />
              </div>

              <div className="relative rounded-br-lg overflow-y-hidden">
                <div className="p-5 h-full overflow-y-auto bg-gray-50">
                  <Players players={players} />
                  <button onClick={(e) => handleAddPlayer(e)} className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    Add Player (Debug)
                  </button>
                </div>
              </div>
            </div>
          </BrowserWindow> 
      </main>
    </div>
  );
};

export default RoomPage;
