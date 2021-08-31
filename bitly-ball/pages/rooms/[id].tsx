import Head from "next/head";
import React, { ReactNode, useEffect, useState } from "react";
import BitlyImage from "../../components/BitlyImage";
import { useRouter } from "next/router";
import { createPlayer, useStore } from "../../lib/Store";
import BrowserWindow from "../../components/BrowserWindow";
import TextInput from "../../components/TextInput";
import Players from "../../components/Players";
import useSWR from "swr";
import { ScreenshotResponse } from "../../types/ScreenshotResponse";
import Loader from "../../components/Loader";

type RoomPageProps = {};


const RoomPage: React.FC<RoomPageProps> = (props) => {
  const router = useRouter();
  const query = router.query;
  const roomId = query.id as string;

  const [url, setUrl] = useState<string>("");
  const [response, setResponse] = useState<ScreenshotResponse | undefined>(undefined);
  
  const handleTryAgain = () => {
    setUrl("");
    setResponse(undefined);
  }

  return (
    <div className="flex flex-col min-h-screen h-screen items-center">
      <Head>
        <title>Bitly Ball</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-full w-full bg-gradient-to-r from-gray-100 to-gray-300">
          <div className="flex lg:flex-row flex-col h-full">
            <div className="flex-1 p-5 flex flex-col justify-between">
              <h1 className="font-bitlyTitle text-6xl pb-5">Bitly Ball</h1>
              { !!url.length && <BitlyImage url={url} handleSuccess={setResponse}/> }
              { !response && 
                <div className="align-bottom">
                  <TextInput handleSubmit={setUrl} />
                </div> 
              }
              { !!response && 
                <div>
                  <h4>{response.success ? 'SUCCESS' : 'FAILURE' }</h4>
                  <h4>Attempted {response.url}</h4>
                  <button onClick={handleTryAgain}>Try Again</button>
                </div>
              }
            </div>

            <div className="rounded-br-lg overflow-y-hidden">
              <div className="p-5 h-full overflow-y-auto bg-gray-200">
                <Players roomId={roomId} />
              </div>
            </div>
          </div>
      </main>
    </div>
  );
};

export default RoomPage;
