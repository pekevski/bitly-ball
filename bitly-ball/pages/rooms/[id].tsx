import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Players from "../../components/Players";
import { useStore } from "../../lib/Store";
import Rounds from "../../components/Rounds";
import { Page } from "../../components/Layout/Page";
import { Container } from "../../components/Layout/Container";
import { getPlayerLocalStorage } from "../../lib/LocalStorage";
import { Player } from "../../types/Player";
import { Game } from "../../components/Game";

type RoomPageProps = {};

const RoomPage: React.FC<RoomPageProps> = () => {
  const router = useRouter();
  const query = router.query;
  const roomId = query.id as string;

  const { room, players, rounds } = useStore({ roomId });
  const [currentPlayer, setCurrentPlayer] = useState<Player | undefined>(
    undefined
  );

  useEffect(() => {
    const curr = getPlayerLocalStorage();
    if (curr?.roomId === roomId) {
      setCurrentPlayer(curr);
    }
  }, [roomId]);

  return (
    <Page>
      <Head>
        <title>Bitly Ball</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-full w-full">
        <div className="flex lg:flex-row flex-col h-full">
          <Container>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <h1 className="font-bitlyTitle text-6xl p-5">Bitly Ball</h1>

                {!!room && (
                  <div className="p-5 border-bottom-5">
                    <h2>Status: {room.status}</h2>
                    <h2>Rounds: {room.rounds}</h2>
                  </div>
                )}
              </div>

              {currentPlayer && (
                <Players
                  players={players}
                  currentPlayerId={currentPlayer.id}
                  playerTurnId={"20224db3-ff55-4e99-9e88-a55d4c7a2f69"}
                />
              )}
            </div>

            {room && currentPlayer && (
              <Game
                room={room}
                players={players}
                rounds={rounds}
                currentPlayer={currentPlayer}
              />
            )}
          </Container>

          <div className="overflow-y-hidden">
            <div className="p-5 h-full overflow-y-auto bg-gray-200">
              <Rounds rounds={rounds} />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
};

export default RoomPage;
