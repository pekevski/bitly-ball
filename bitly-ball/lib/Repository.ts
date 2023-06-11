import {
  SupabaseClient,
  useSupabaseClient
} from '@supabase/auth-helpers-react';
import { Player } from '../types/Player';
import { Room } from '../types/Room';
import { Round } from '../types/Round';
import { Database } from './database.types';

// Api for calls made to the supabase db

/**
 * Fetch all players for a room
 * @param {number} roomId
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchPlayers = async (
  supabaseClient: SupabaseClient,
  roomId: string,
  setState: any
) => {
  try {
    console.log('Fetching players....');

    let { data } = await supabaseClient
      .from<Player>('player')
      .select()
      .eq('roomId', roomId)
      .order('name', { ascending: true });

    if (setState) setState(data);
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

/**
 * Fetch all rounds for a room
 * @param {number} roomId
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchRounds = async (
  supabaseClient: SupabaseClient,
  roomId: string,
  setState: any
) => {
  try {
    console.log('Fetching rounds....');

    let { data } = await supabaseClient
      .from<Round>('round')
      .select()
      .eq('roomId', roomId)
      .order('roundIndex', { ascending: true });

    if (setState) setState(data);
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

/**
 * Fetch the room
 * @param {number} roomId
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchRoom = async (
  supabaseClient: SupabaseClient,
  roomId: string,
  setState: any
) => {
  try {
    console.log('Fetching room....');
    let { data } = await supabaseClient
      .from<Room>('room')
      .select()
      .eq('id', roomId)
      .maybeSingle();

    if (setState) setState(data);
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

/**
 * Fetch the room
 */
export const fetchPlayerByUserIdAndRoomId = async (
  supabaseClient: SupabaseClient,
  userId: string,
  roomId: string
) => {
  try {
    console.log('Fetching player in room....');

    let { data } = await supabaseClient
      .from<Player>('player')
      .select()
      .eq('roomId', roomId)
      .eq('userId', userId)
      .maybeSingle();

    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

/**
 * Insert a new room into the DB
 * @param {string} rounds The number of rounds in the room
 */
export const createRoom = async (
  supabaseClient: SupabaseClient,
  rounds: number
) => {
  try {
    let { data, error } = await supabaseClient
      .from<Room>('room')
      .insert({ rounds })
      .select()
      .maybeSingle();

    console.log('room data', data);
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

/**
 * Insert a new player into the DB
 * @param {Player} player The player to create
 */
export const createPlayer = async (
  supabaseClient: SupabaseClient,
  player: Partial<Player>
) => {
  try {
    let { data } = await supabaseClient
      .from<Player>('player')
      .insert(player)
      .select()
      .maybeSingle();
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

/**
 * Insert a new round into the DB
 * @param {Round} round The round to create
 */
export const createRound = async (
  supabaseClient: SupabaseClient,
  round: Partial<Round>
) => {
  try {
    let { data } = await supabaseClient
      .from<Round>('round')
      .insert(round)
      .select()
      .maybeSingle();
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

/**
 * Insert a many new rounds into the DB
 * @param {Round[]} rounds The rounds to create
 */
export const createManyRounds = async (
  supabaseClient: SupabaseClient,
  rounds: Array<Partial<Round>>
) => {
  try {
    let { data } = await supabaseClient.from<Round>('round').insert(rounds);
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

export const updateRound = async (
  supabaseClient: SupabaseClient,
  round: Partial<Round>
) => {
  try {
    let { data } = await supabaseClient
      .from<Round>('round')
      .update(round)
      .match({ id: round.id })
      .select()
      .maybeSingle();

    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

export const updateRoom = async (
  supabaseClient: SupabaseClient,
  room: Partial<Room>
) => {
  try {
    let { data } = await supabaseClient
      .from<Room>('room')
      .update(room)
      .match({ id: room.id })
      .select()
      .maybeSingle();

    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

/**
 * Delete a channel from the DB
 * @param {number} channel_id
 */
// export const deleteRoom = async (supabaseClient: SupabaseClient, roomId: string) => {
//   try {
//     let { data: playerBody } = await supabaseClient.from<Player>('player').delete().match({ roomId: roomId })
//     let { data: gameBody } = await supabaseClient.from<Round>('game').delete().match({ playerId: [playerBody?.map(p => p.id)] })
//     let { data: roomBody } = await supabaseClient.from<Room>('room').delete().match({ id: roomId })
//     return roomBody
//   } catch (error) {
//     console.log('error', error)
//   }
// }
