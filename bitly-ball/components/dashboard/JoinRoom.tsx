import { useState } from 'react';
import { savePlayerLocalStorage } from '../../lib/LocalStorage';
import {
  fetchRoom,
  createPlayer,
  fetchPlayerByUserIdAndRoomId
} from '../../lib/Repository';
import { Room, RoomStatusEnum } from '../../types/Room';
import { useRouter } from 'next/router';
import Button from '../Button';
import { UserProvider, useUser } from '@supabase/supabase-auth-helpers/react';

export default function JoinRoom() {
  const router = useRouter();
  const { user } = useUser();

  const [playerName, setPlayerName] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const [error, setError] = useState<string | undefined>(undefined);

  const handleJoinRoom = async () => {
    console.log('BITLY => handle Join Room');

    try {
      if (!roomId) {
        throw new Error('Please provide a room code');
      } else if (!playerName) {
        throw new Error('Please provide a player name');
      } else if (playerName.length <= 2) {
        throw new Error('Player name must be more than 2 characters');
      } else if (!user?.id) {
        throw new Error('Something went wrong. Please login to Bitly Ball');
      }

      const roomToJoin = await fetchRoom(roomId, undefined);

      // Cant join room if it is not created or already inprogress
      if (!roomToJoin) {
        throw new Error(
          `Room ${roomId} does not exist. Please try join another room`
        );
      } else if (roomToJoin?.status === RoomStatusEnum.INPROGRESS) {
        throw new Error(
          `Room ${roomId} is already in progress. It cannot be joined`
        );
      }

      setError(undefined);

      let player = await fetchPlayerByUserIdAndRoomId(user.id, roomToJoin.id);

      if (!player) {
        player = await createPlayer({
          name: playerName,
          roomId: roomId,
          userId: user.id,
          isHost: false
        });
      }

      if (player) {
        await savePlayerLocalStorage(player);
      }

      router.push(`/rooms/${roomId}`);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  return (
    <div className="p-5 my-10 bg-white border w-full md:w-6/12">
      <form action="#" className="flex flex-col space-y-5 mb-5">
        <h3 className="text-2xl font-semibold text-gray-700">Join a room</h3>
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="joinRoom"
            className="text-sm font-semibold text-gray-500"
          >
            Room Code
          </label>
          <input
            type="text"
            id="joinRoom"
            autoFocus={true}
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
          />
        </div>

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
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
          />
        </div>
      </form>
      <Button width={'full'} handleClick={handleJoinRoom} disabled={false}>
        Join
      </Button>
      {error && (
        <h1 className="text-red-400 mt-5">
          <span className="pr-2">🚫</span> {error}
        </h1>
      )}{' '}
    </div>
  );
}
