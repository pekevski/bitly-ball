import Head from "next/head";
import React, { useEffect, useState } from "react";
import BitlyImage from "../../components/BitlyImage";
import { useRouter } from "next/router";
import { useStore } from "../../lib/Store";
import BrowserWindow from "../../components/BrowserWindow";

type RoomPageProps = {};

const RoomPage: React.FC<RoomPageProps> = (props) => {
  const router = useRouter();
  const query = router.query;
  const roomId = query.id as string;

  const { players } = useStore({ roomId });

  const [textInput, setTextInput] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("setting url...");

    if (textInput) {
      textInput.trim();
      setUrl(textInput);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Bitly Ball</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-2xl">Bitly Ball</h1>

        <div className="m-6">
          <BrowserWindow>
            {!url.length && <h1>Bitly Ball</h1>}
            {!!url.length && <BitlyImage url={url} />}

            <form className="m-5" onSubmit={(e) => handleSubmit(e)}>
              <div className="flex w-full flex-nowrap items-stretch border border-gray-200 rounded-lg">
                <label htmlFor="inline-url" className="font-bitlyTitle text-2xl text-center bg-transparent items-center justify-center p-3 border-r">
                  bit.ly/
                </label>
                <input 
                  id="inline-url"
                  type="text" 
                  placeholder="Aa" 
                  className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white bg-white focus:outline-none w-full"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  />
                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-4 hover:border-blue-500 rounded-r-lg">
                  Check
                </button>
              </div>
            </form>



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
};

export default RoomPage;
