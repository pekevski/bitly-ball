import { Player } from "../types/Player";
import { Room, RoomStatusEnum } from "../types/Room";
import { Round } from "../types/Round";
import { supabase } from "./SupbaseConfig";

// Api for calls made to the supabase db


/**
 * Fetch all players for a room
 * @param {number} roomId
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
 export const fetchPlayers = async (roomId: string, setState: any) => {
    try {
      console.log('Fetching players....')
  
      let { body } = await supabase
        .from<Player>('player')
        .select("*")
        .eq('roomId', roomId)
        .order('name', {ascending: true});
        
      if (setState) setState(body)
      return body
    } catch (error) {
      console.log('error', error)
    }
  }
  
  
  /**
   * Fetch all rounds for a room
   * @param {number} roomId
   * @param {function} setState Optionally pass in a hook or callback to set the state
   */
   export const fetchRounds = async (roomId: string, setState: any) => {
    try {
      console.log('Fetching rounds....')
  
      let { body } = await supabase
        .from<Round>('round')
        .select("*")
        .eq('roomId', roomId)
        .order('created_at', {ascending: true});
        
      if (setState) setState(body)
      return body
    } catch (error) {
      console.log('error', error)
    }
  }
  
  
  /**
   * Fetch the room
   * @param {number} roomId
   * @param {function} setState Optionally pass in a hook or callback to set the state
   */
  export const fetchRoom = async (roomId: string, setState: any) => {
    try {
      console.log('Fetching room....')
      let { body } = await supabase
        .from<Room>('room')
        .select()
        .eq('id', roomId)
        .single();
        
      if (setState) setState(body)
      return body
    } catch (error) {
      console.log('error', error)
    }
  }
  
  /**
   * Insert a new room into the DB
   * @param {string} rounds The number of rounds in the room
   */
  export const createRoom = async (rounds: number) => {
    try {
      let { body } = await supabase.from<Room>('room').insert({rounds}).single();
      return body
    } catch (error) {
      console.log('error', error)
    }
  }
  
  /**
   * Insert a new player into the DB
   * @param {Player} player The player to create
   */
  export const createPlayer = async (player: Partial<Player>) => {
    try {
      let { body } = await supabase.from<Player>('player').insert(player).single();
      return body
    } catch (error) {
      console.log('error', error)
    }
  }
  
  /**
   * Insert a new player into the DB
   * @param {Player} player The player to create
   */
  export const createRound = async (round: Partial<Round>) => {
    try {
      let { body } = await supabase.from<Round>('round').insert(round).single();
      return body
    } catch (error) {
      console.log('error', error)
    }
  }
  
  export const startRoom = async (roomId: string) => {
    try {
      let { body } = await supabase
        .from<Room>('room')
        .update({status: RoomStatusEnum.INPROGRESS})
        .match({ id: roomId })
  
      return body
    } catch (error) {
      console.log('error', error)
    }
  }
  
  
  /**
   * Delete a channel from the DB
   * @param {number} channel_id
   */
  // export const deleteRoom = async (roomId: string) => {
  //   try {
  //     let { body: playerBody } = await supabase.from<Player>('player').delete().match({ roomId: roomId })
  //     let { body: gameBody } = await supabase.from<Round>('game').delete().match({ playerId: [playerBody?.map(p => p.id)] })
  //     let { body: roomBody } = await supabase.from<Room>('room').delete().match({ id: roomId })
  //     return roomBody
  //   } catch (error) {
  //     console.log('error', error)
  //   }
  // }