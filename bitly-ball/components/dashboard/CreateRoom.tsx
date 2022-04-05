import { Router, useRouter } from "next/router";
import { useState } from "react";
import { savePlayerLocalStorage } from "../../lib/LocalStorage";
import { createRoom, createPlayer } from "../../lib/Repository";
import Button from "../Button";
import NumberCounter from "../NumberCounter";

export default function CreateRoom() {
  const router = useRouter();
    
  const [playerName, setPlayerName] = useState<string>("");
  const [rounds, setRounds] = useState<number>(3);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleCreateRoom = async () => {
    console.log("BITLY => handle Create Room");

    try {
      if (!playerName) {
        throw new Error("Please provide a player name");
      } else if (playerName.length <= 2) {
        throw new Error("Player name must be more than 2 characters");
      }

      setError(undefined);

      const room = await createRoom(rounds);

      if (room) {
        const player = await createPlayer({
          name: playerName,
          roomId: room.id,
          isHost: true,
        });

        if (player) {
          await savePlayerLocalStorage(player);
        }
        // save player to localstorage
        router.push(`/rooms/${room.id}`);
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  return (

    <div className="p-5 my-10 bg-white border w-full md:w-6/12">
      <form action="#" className="flex flex-col space-y-5 mb-5">
        <h3 className="text-2xl font-semibold text-gray-700">Create a room</h3>
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="createPlayerName"
            className="text-sm font-semibold text-gray-500"
          >
            Your Player Name
          </label>
          <input
            type="text"
            id="createPlayerName"
            autoFocus={true}
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label
            htmlFor="numberOfRounds"
            className="text-sm font-semibold text-gray-500"
          >
            Number of Rounds
          </label>
          <NumberCounter
            id={"numberOfRounds"}
            min={1}
            max={5}
            value={rounds}
            onValueChange={(e) => setRounds(e)}
          />
        </div>
      </form>
      <Button handleClick={handleCreateRoom} disabled={false}>
        Create
      </Button>
      {error && (
        <h1 className="text-red-400 mt-5">
          <span className="pr-2">🚫</span> {error}
        </h1>
      )}
    </div>
  );
}