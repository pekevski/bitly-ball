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

  // Get the current player from local storage if we revisit this
  // page. Everytime we join a game as a user we store their info
  // in local storage. If we refresh the page / or navigate to the room
  // again, we can repurpose the player in local storage.
  useEffect(() => {
    const curr = getPlayerLocalStorage();
    if (curr?.roomId === roomId) {
      setCurrentPlayer(curr);
    }
  }, [roomId]);

  // When we revisit the room again, try and fetch all round information.
  useEffect(() => {
    // get latest round and do things...
  }, [rounds])

  return (
    <Page>
      <main className="h-full w-full">
        <div className="flex lg:flex-row flex-col h-full">
          <Container>
            <div className="flex flex-col">
              <div className="flex justify-between">
                {!!room && (
                  <div className="border-bottom-5">
                    <h2>Status: {room.status}</h2>
                    <h2>Rounds: {room.rounds}</h2>

                    {/* Show the players of the game and ordering */}
                    {currentPlayer && (
                      <Players
                        players={players}
                        currentPlayerId={currentPlayer.id}
                        playerTurnId={"20224db3-ff55-4e99-9e88-a55d4c7a2f69"}
                      />
                    )}
                  </div>
                )}
              </div>
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
