import Head from "next/head";
import React, { useState } from "react";
import BitlyImage from "../../components/BitlyImage";
import { useRouter } from "next/router";
import TextInput from "../../components/TextInput";
import Players from "../../components/Players";
import { ScreenshotResponse } from "../../types/ScreenshotResponse";
import Button from "../../components/Button";
import { startRoom, useStore } from "../../lib/Store";
import { RoomStatusEnum } from "../../types/Room";

type RoomPageProps = {};

const RoomPage: React.FC<RoomPageProps> = () => {
  const router = useRouter();
  const query = router.query;
  const roomId = query.id as string;

  const { room, players } = useStore({ roomId });
  const [url, setUrl] = useState<string>("");
  const [response, setResponse] = useState<ScreenshotResponse | undefined>(undefined);
  
  const handleTryAgain = () => {
    setUrl("");
    setResponse(undefined);
  }

  const handleStartGame = () => {
    startRoom(roomId)
  }

  return (
    <div className="flex flex-col min-h-screen h-screen items-center">
      <Head>
        <title>Bitly Ball</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-full w-full">
          <div className="flex lg:flex-row flex-col h-full">
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex justify-between">
                <h1 className="font-bitlyTitle text-6xl p-5">Bitly Ball</h1>

                { !!room && 
                  <div className="p-5">
                    <h2>Status: {room.status}</h2>
                    <h2>Rounds: {room.rounds}</h2>
                  </div>
                }
              </div>

              { !!room && room.status === RoomStatusEnum.CREATED &&
                <>
                  <h1>CREATED</h1>
                  <Button handleClick={handleStartGame}>Start Room</Button>
                </>
              }

              { !!room && room.status === RoomStatusEnum.INPROGRESS &&
                <>
                  <h1>IN PROGRESS</h1>
                </>
              }

              { !!url.length && 
                <div className="p-5">
                  <BitlyImage url={url} handleSuccess={setResponse}/>
                </div> 
              }
              { !response && 
                <div className="p-5 align-bottom bg-gray-100">
                  <TextInput handleSubmit={setUrl} />
                </div> 
              }
              { !!response && 
                <div className="align-bottom bg-gray-100 p-5">
                  <div className="flex sm:flex-row justify-between pb-5">
                    <h4>{response.success ? '200 OK Success!' : '404 Fail!' } {response.success ? '+' : '-'}{url.length} points</h4>
                    <h4>{response.url}</h4>
                  </div>
                  <Button handleClick={handleTryAgain}>Try Again</Button>
                </div>
              }
            </div>

            <div className="rounded-br-lg overflow-y-hidden">
              <div className="p-5 h-full overflow-y-auto bg-gray-200">
                <Players players={players} />
              </div>
            </div>
          </div>
      </main>
    </div>
  );
};

export default RoomPage;
