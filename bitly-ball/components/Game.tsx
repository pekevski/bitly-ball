import { Player } from "../types/Player";
import { Room, RoomStatusEnum } from "../types/Room";
import BitlyImage from "./BitlyImage";
import Button from "./Button";
import TextInput from "./TextInput";
import { createRound } from "../lib/Repository";
import { startRoom } from "../lib/Business";
import React, { useEffect, useState } from "react";
import { Round } from "../types/Round";
import { ScreenshotResponse } from "../types/ScreenshotResponse";

type GameProps = {
  currentPlayer: Player;
  room: Room;
  players: Player[];
  rounds: Round[];
};

export const Game: React.FC<GameProps> = ({
  currentPlayer,
  room,
  players,
  rounds,
}) => {
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<ScreenshotResponse | undefined>(
    undefined
  );

  useEffect(() => {
    console.log("BITLY BALL => response changed..");
    // TODO: check if round for this data already exists?
    if (response) {
      const _createRound = async (
        response: ScreenshotResponse
      ): Promise<void> => {
        try {
          const currentRound: Partial<Round> = {
            playerId: "1f274bc7-a4bb-44c2-b180-6c4b054e36fe",
            roomId: room.id,
            points: url.length,
            phrase: url,
            image: `data:image/jpeg;charset=utl-8;base64,${response.image}`,
            result: !!response.success,
          };

          await createRound(currentRound);
        } catch (e) {
          console.log("Error creating round", e);
        }
      };

      console.log("BITLY BALL => response changed AND cause a create round");
      _createRound(response);
    }
  }, [response]);

  const handleNextRound = () => {
    console.log("BITLY => Handle Try Again");
    setUrl("");
    setResponse(undefined);
  };

  const handleStartGame = () => {
    console.log("BITLY => Starting Room");
    startRoom(room.id);
  };

  const gameInProgress = room?.status === RoomStatusEnum.INPROGRESS;
  const gameReadyToStart = room?.status === RoomStatusEnum.CREATED;
  const canStart = players.length > 1;

  if (gameInProgress) {
    return (
      <>
        {url && url.length && (
          <div className="p-5">
            <BitlyImage
              url={url}
              width={1000}
              height={600}
              handleSuccess={setResponse}
              handleLoading={setLoading}
            />
          </div>
        )}

        {!response && (
          <div className="p-5 align-bottom">
            <TextInput handleSubmit={setUrl} loading={loading} />
          </div>
        )}

        {!!response && (
          <div className="align-bottom bg-gray-100 p-5">
            <div className="flex sm:flex-row justify-between pb-5">
              <h4>
                {response.success ? "200 OK Success!" : "404 Fail!"}{" "}
                {response.success ? "+" : "-"}
                {url.length} points
              </h4>
              <h4>{response.url}</h4>
            </div>
            <Button width={'full'} handleClick={handleNextRound} disabled={false}>
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
            <Button width={'full'} handleClick={handleStartGame} disabled={!canStart}>
              {canStart ? "Start Room" : "Waiting for Players to Join"}
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
