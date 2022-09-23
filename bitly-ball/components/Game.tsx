import { Player } from '../types/Player';
import { Room, RoomStatusEnum } from '../types/Room';
import BitlyImage from './BitlyImage';
import Button from './Button';
import TextInput from './TextInput';
import { submitRound } from '../lib/Business';
import { startRoom } from '../lib/Business';
import React, { useEffect, useState } from 'react';
import { Round } from '../types/Round';
import { ScreenshotResponse } from '../types/ScreenshotResponse';

type GameProps = {
  currentPlayer: Player;
  room: Room;
  players: Map<string, Player>;
  rounds: Round[];
  currentRound?: Round;
  playerTurnId?: string;
  roundIndex?: number;
};

export const Game: React.FC<GameProps> = ({
  currentPlayer,
  playerTurnId,
  room,
  players,
  rounds,
  currentRound,
  roundIndex
}) => {
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [imageResponse, setImageResponse] = useState<ScreenshotResponse | undefined>(
    undefined
  );

  useEffect(() => {
    console.log('BITLY BALL => response changed..');
    // We got a image response lets update the current round
    // with the resulting data of the response.
    // Calculate points, calculate round.
    if (imageResponse && currentRound) {
      const _createRound = async (
        response: ScreenshotResponse
      ): Promise<void> => {
        try {

          console.log('BITLY BALL => called promise for update round');

          await submitRound(
            currentRound.id,
            url,
            response
          );

        } catch (e) {
          // TODO Handle error when we cant update the round, maybe we put the
          // phrase back and ask them to try again?
          console.log('Error creating round', e);
        }
      };

      console.log('BITLY BALL => response changed AND caused a create round');
      _createRound(imageResponse);
    } else {

      // Response is undefined, if we have a current round lets
      // move on to the next round in the game.
      console.log('BITLY BALL => response is undefined');
      // Do we need to do anything, replication should know this since rounds
      // have changed....
    }
  }, [imageResponse]);

  const handleNextRound = () => {
    console.log('BITLY => Handle Try Again');
    setUrl('');
    setImageResponse(undefined);
  };

  const handleStartGame = () => {
    console.log('BITLY => Starting Room');
    startRoom(room.id, room.rounds, players);
  };

  const gameInProgress = room?.status === RoomStatusEnum.INPROGRESS;
  const gameReadyToStart = room?.status === RoomStatusEnum.CREATED;
  const currentPlayerTurn = currentPlayer?.id === playerTurnId;
  const canStart = players.size > 1;

  if (gameInProgress) {
    return (
      <>
        {url && url.length && (
          <div className="p-5">
            <BitlyImage
              url={url}
              width={1000}
              height={600}
              handleSuccess={setImageResponse}
              handleLoading={setLoading}
            />
          </div>
        )}

        { !currentPlayerTurn && (
          <div>
            Hurry up {players.get(currentRound?.playerId || "none")?.name}! Waiting for you to take your turn
          </div>
        )}

        {!imageResponse && currentPlayerTurn && (
          <div className="p-5 align-bottom">
            <TextInput handleSubmit={setUrl} loading={loading} />
          </div>
        )}

        {!!imageResponse && (
          <div className="align-bottom bg-gray-100 p-5">
            <div className="flex sm:flex-row justify-between pb-5">
              <h4>
                {imageResponse.success ? '200 OK Success!' : '404 Fail!'}{' '}
                {imageResponse.success ? '+' : '-'}
                {url.length} points
              </h4>
              <h4>{imageResponse.url}</h4>
            </div>
            <Button
              width={'full'}
              handleClick={handleNextRound}
              disabled={false}
            >
              Next Round
            </Button>
          </div>
        )}
      </>
    );
  }

  if (gameReadyToStart) {
    return (
      <>
        {currentPlayer.isHost && (
          <div className="py-5 align-bottom">
            <Button
              width={'full'}
              handleClick={handleStartGame}
              disabled={!canStart}
            >
              {canStart ? 'Start Room' : 'Waiting for Players to Join'}
            </Button>
          </div>
        )}

        {!currentPlayer.isHost && (
          <div className="py-5 align-bottom">
            <h2>Have a drink while you wait...🍸🍻🥂🍷🥃</h2>
          </div>
        )}
      </>
    );
  }

  return <h1>Something is wrong with the game.</h1>;
};
