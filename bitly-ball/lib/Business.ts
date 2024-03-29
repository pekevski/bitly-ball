// Handles all business logic
// Only interfaces with Repository.ts
import { SupabaseClient } from '@supabase/supabase-js';
import { Player } from '../types/Player';
import { Room, RoomStatusEnum } from '../types/Room';
import { Round } from '../types/Round';
import { ScreenshotResponse } from '../types/ScreenshotResponse';
import * as database from './Repository';

// Starts a room for all players when the host is ready to begin
export const startRoom = async (
  supabaseClient: SupabaseClient,
  room: Room,
  players: Map<string, Player>
): Promise<Array<Round> | null> => {
  try {
    const existingRoom = await database.fetchRoom(
      supabaseClient,
      room.id,
      undefined
    );

    if (existingRoom && existingRoom.status !== RoomStatusEnum.CREATED) {
      throw new Error('Room is already in progress');
    }

    // Put the room in an inprogress status
    await database.updateRoom(supabaseClient, {
      id: room.id,
      status: RoomStatusEnum.INPROGRESS
    });

    // Create all the rounds for the game based on the rounds and players
    const roundsToCreate: Array<Partial<Round>> = new Array();

    for (let i = 0; i < room.rounds; i++) {
      players.forEach((player) => {
        const roundToCreate: Partial<Round> = {
          roundIndex: i,
          playerId: player.id,
          roomId: room.id,
          // provide date to enforce round ordering by createdDate
          createdDate: new Date()
        };

        roundsToCreate.push(roundToCreate);
      });
    }

    return await database.createManyRounds(supabaseClient, roundsToCreate);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const endRoom = async (
  supabaseClient: SupabaseClient,
  oldRoom: Room
): Promise<Room | null> => {
  try {
    if (oldRoom.status === RoomStatusEnum.COMPLETED) {
      return oldRoom;
    }

    const existingRoom = await database.fetchRoom(
      supabaseClient,
      oldRoom.id,
      undefined
    );

    if (existingRoom && existingRoom.status !== RoomStatusEnum.INPROGRESS) {
      throw new Error('Room has not started');
    }

    // Put the room in a completed status
    const newRoom = await database.updateRoom(supabaseClient, {
      id: oldRoom.id,
      status: RoomStatusEnum.COMPLETED
    });

    return newRoom;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const submitRound = async (
  supabaseClient: SupabaseClient,
  roundId: string,
  phrase: string,
  response: ScreenshotResponse
): Promise<Round> => {
  try {
    const newRound: Partial<Round> = {
      id: roundId,
      points: response.success ? phrase.length : -phrase.length,
      phrase: phrase,
      image: `data:image/jpeg;charset=utl-8;base64,${response.image}`,
      result: response.success,
      submitted: true
    };

    const result = await database.updateRound(supabaseClient, newRound);

    if (!result) {
      throw new Error(`Updating round ${newRound.id} failed`);
    }

    return result as Round;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// Create a player for a room
export const createPlayer = async (
  supabaseClient: SupabaseClient,
  player: Partial<Player>
): Promise<Player | null> => {
  try {
    if (!player.userId) {
      throw new Error(
        'Cannot create player without logging in to Bitly. Missing user'
      );
    }

    if (!player.roomId) {
      throw new Error(
        'Cannot create player without logging in to Bitly. Missing room'
      );
    }

    const roomHasPlayer = await database.fetchPlayerByUserIdAndRoomId(
      supabaseClient,
      player.userId,
      player.roomId
    );

    if (roomHasPlayer) {
      throw new Error(
        `User: ${player.userId} already exists in room: ${player.roomId}`
      );
    }

    let createdPlayer = await database.createPlayer(supabaseClient, player);

    return createdPlayer as Player | null;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};
