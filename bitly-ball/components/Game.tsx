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
import { ImageMetadataResults } from './ImageMetadataResults';

type GameProps = {
  currentPlayer: Player;
  room: Room;
  players: Map<string, Player>;
  currentRound?: Round;
  playerTurnId?: string;
};

export const Game: React.FC<GameProps> = ({
  currentPlayer,
  playerTurnId,
  room,
  players,
  currentRound,
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
      const _submitRound = async (
        response: ScreenshotResponse
      ): Promise<void> => {
        try {
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
      _submitRound(imageResponse);
    } else {

      // Response is undefined, if we have a current round lets
      // move on to the next round in the game.
      console.log('BITLY BALL => response is undefined');
      // Do we need to do anything, replication should know this since rounds
      // have changed....
    }
  }, [imageResponse]);

  const handleStartGame = () => {
    startRoom(room.id, room.rounds, players);
  };

  const gameInProgress = room?.status === RoomStatusEnum.INPROGRESS;
  const gameReadyToStart = room?.status === RoomStatusEnum.CREATED;
  const gameHasEnded = room?.status === RoomStatusEnum.COMPLETED;

  const currentPlayerTurn = currentPlayer?.id === playerTurnId;
  const canStart = players.size > 1;

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

  if (gameInProgress) {
    return (
      <>
        {!currentPlayerTurn && (
          <div>
            <h3>
              Waiting for {players.get(currentRound?.playerId || "none")?.name} to take their turn.
            </h3>
          </div>
        )}

        {currentPlayerTurn && (
          <div className="p-5 align-bottom">
            <TextInput handleSubmit={setUrl} loading={loading} />
          </div>
        )}

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

        {imageResponse && (
          <ImageMetadataResults 
            url={url}
            imageResponse={imageResponse} 
          />
        )}
      </>
    );
  }

  if (gameHasEnded) {
    return <h1>GAME OVER</h1>
  }

  return <h1>Something is wrong with the game. Please refresh.</h1>;
};
