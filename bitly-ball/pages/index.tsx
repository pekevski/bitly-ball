import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";

interface WebsiteSnapshotResponse {
  url: string;
  image: string;
  success: boolean;
}

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    url.trim();
    setLoading(true);
    console.log("Checking url.", url);
    const response: Response = await fetch(
      `${process.env.NEXT_PUBLIC_SNAPSHOT_LAMBDA_ENDPOINT}?url=https://bit.ly/${url}`
    );

    console.log(response);
    const json: WebsiteSnapshotResponse = await response.json();

    setResult(json.success);

    if (json.image) {
      setImage("data:image/jpeg;charset=utl-8;base64, " + json.image);
    } else {
      setImage("");
    }

    setLoading(false);
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
          <div className="border border-b-0 rounded-b-none border-gray-200 rounded-lg">
            <div className="flex p-1">
              <div className="flex">
                <div className="rounded-full m-0.5 bg-red-500 w-3 h-3"></div>
                <div className="rounded-full m-0.5 bg-yellow-500 w-3 h-3"></div>
                <div className="rounded-full m-0.5 bg-green-500 w-3 h-3"></div>
              </div>

              <form className="w-full" onSubmit={(e) => handleSubmit(e)}>
                <div className="flex items-center">
                  <div className="sm:w-1/4">
                    <label
                      className="text-2xl block text-gray-500 font-bold sm:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-url"
                    >
                      bit.ly/
                    </label>
                  </div>
                  <div className="sm:w-2/4">
                    <input
                      className="bg-gray-200 appearance-none border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                      id="inline-url"
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>
                  <div className="sm:w-1/4">
                    <button className="bg-blue-500 hover:bg-blue-400 text-white align-left font-bold py-1 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                      Check
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg rounded-t-none">
            {loading ? (
              <h1 style={{ height: "400px" }}>loading...</h1>
            ) : image && image.length ? (
              <img
                className="object-contain rounded-lg rounded-t-none"
                alt="Bitly Image Result"
                style={{ pointerEvents: "none" }}
                src={image}
              />
            ) : (
              <h1 style={{ height: "400px" }}>enter an image</h1>
            )}
          </div>
        </div>

        <h1>{result ? "HIT A BIT!" : "NO BIT"}</h1>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  );
}
