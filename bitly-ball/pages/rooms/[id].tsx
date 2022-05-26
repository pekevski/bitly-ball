import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Players from '../../components/Players';
import { useStore } from '../../lib/Store';
import Rounds from '../../components/Rounds';
import { Page } from '../../components/Layout/Page';
import { Container } from '../../components/Layout/Container';
import { getPlayerLocalStorage } from '../../lib/LocalStorage';
import { Player } from '../../types/Player';
import { Game } from '../../components/Game';
import { Round } from '../../types/Round';

type RoomPageProps = {};

const RoomPage: React.FC<RoomPageProps> = () => {
  const router = useRouter();
  const query = router.query;
  const roomId = query.id as string;

  const { room, players, rounds } = useStore({ roomId });

  const [currentPlayer, setCurrentPlayer] = useState<Player | undefined>(
    undefined
  );

  const [currentRound, setCurrentRound] = useState<Round | undefined>(
    undefined
  );

  const [playerTurnId, setPlayerTurnId] = useState<string | undefined>(
    undefined
  );

  const [roundIndex, setRoundIndex] = useState<number | undefined>(undefined);

  useEffect(() => {
    // Get the current player from local storage if we revisit this
    // page. Everytime we join a game as a user we store their info
    // in local storage. If we refresh the page / or navigate to the room
    // again, we can repurpose the player in local storage.
    const curr = getPlayerLocalStorage();
    if (curr?.roomId === roomId) {
      setCurrentPlayer(curr);
    }
  }, [roomId]);

  // When we revisit the room again, try and fetch all round information.
  useEffect(() => {
    console.log('BITLYBALL: rounds has changed working round stuff out...', rounds);

    // Get the current round and players turn from the list of rounds
    const currentRound = rounds.find((r) => r.submitted === false);
    setPlayerTurnId(currentRound?.playerId);
    setRoundIndex(currentRound?.roundIndex);
    setCurrentRound(currentRound);
  }, [rounds]);

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
                    {currentRound && (
                      <h2>Curent Round: {currentRound.roundIndex + 1}</h2>
                    )}

                    {/* Show the players of the game and ordering */}
                    {currentPlayer && playerTurnId && (
                      <Players
                        players={players}
                        currentPlayerId={currentPlayer.id}
                        playerTurnId={playerTurnId}
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
                currentRound={currentRound}
                currentPlayer={currentPlayer}
                playerTurnId={playerTurnId}
                roundIndex={roundIndex}
              />
            )}
          </Container>

          <div className="overflow-y-hidden">
            <div className="p-5 h-full overflow-y-auto bg-gray-200">
              <Rounds
                rounds={rounds}
                currentRound={currentRound}
                roundIndex={roundIndex}
              />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
};

export default RoomPage;
