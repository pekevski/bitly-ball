import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useStore } from '../../lib/Store';
import Rounds from '../../components/Rounds';
import { Page } from '../../components/Layout/Page';
import { Container } from '../../components/Layout/Container';
import { getPlayerLocalStorage } from '../../lib/LocalStorage';
import { Player } from '../../types/Player';
import { Game } from '../../components/Game';
import { Round } from '../../types/Round';
import { endRoom } from '../../lib/Business';
import { Room } from '../../types/Room';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

type RoomPageProps = {};

const RoomPage: React.FC<RoomPageProps> = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const query = router.query;
  const roomId = query.id as string;

  const { room, players, rounds } = useStore({ roomId });

  const [currentPlayer, setCurrentPlayer] = useState<Player | undefined>(
    undefined
  );

  const [currentRound, setCurrentRound] = useState<Round | undefined>(
    undefined
  );

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
    console.log(
      'BITLYBALL: rounds has changed working round stuff out...',
      rounds
    );

    // Get the current round and players turn from the list of rounds
    const currentRound = rounds.find((r) => r.submitted === false);

    if (currentRound) {
      setCurrentRound(currentRound);
      console.log('results ->', { currentRound });
    } else if (rounds.length) {
      // All rounds are submitted, the game is over.
      const _endGame = async (room: Room): Promise<void> => {
        try {
          await endRoom(supabaseClient, room);
        } catch (e) {
          // TODO Handle error when we cant update the room, maybe we put the
          // phrase back and ask them to try again?
          console.log('Error ending room', e);
        }
      };

      if (room) {
        _endGame(room);
      }
    }
  }, [rounds]);

  return (
    <Page>
      <main className="h-full w-full">
        <div className="flex lg:flex-row flex-col h-full">
          <Container>
            {room && currentPlayer && (
              <Game
                room={room}
                players={players}
                currentRound={currentRound}
                currentPlayer={currentPlayer}
              />
            )}
          </Container>

          <div className="overflow-y-hidden">
            <div className="p-5 h-full overflow-y-auto bg-gray-200">
              <Rounds
                rounds={rounds}
                players={players}
                currentRound={currentRound}
              />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
};

export default RoomPage;
