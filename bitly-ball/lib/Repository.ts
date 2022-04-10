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
      throw error;
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
      throw error;
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
      throw error;
    }
  }

    /**
     * Fetch the room
     */
     export const fetchPlayerByUserIdAndRoomId = async (userId: string, roomId: string) => {
      try {
        console.log('Fetching player in room....')
        
        let { body } = await supabase
          .from<Player>('player')
          .select("*")
          .eq('roomId', roomId)
          .eq('userId', userId)
          .single();

        return body
      } catch (error) {
        console.log('error', error)
        throw error;
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
      throw error;
    }
  }
  
  /**
   * Insert a new player into the DB
   * @param {Player} player The player to create
   */
  export const createPlayer = async (player: Partial<Player>) => {
    
    try {
      // TODO: put me into a business service.
      if (!player.userId) {
        throw new Error("Cannot create player without logging in to Bitly. Missing user")
      }

      if (!player.roomId) {
        throw new Error("Cannot create player without logging in to Bitly. Missing room")
      }

      const roomHasPlayer = await fetchPlayerByUserIdAndRoomId(player.userId, player.roomId);

      if (roomHasPlayer) {
        throw new Error(`User: ${player.userId} already exists in room: ${player.roomId}`)
      }

      let { body } = await supabase.from<Player>('player').insert(player).single();
      return body
    } catch (error) {
      console.log('error', error)
      throw error;
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
      throw error;
    }
  }

  export const updateRound = async (round: Partial<Round>) => {
    try {
      let { body } = await supabase
        .from<Round>('round')
        .update(round)
        .match({id: round.id})
        .single();

      return body
    } catch (error) {
      console.log('error', error)
      throw error;
    }
  }
  
  export const startRoom = async (roomId: string) => {
    try {
      let { body } = await supabase
        .from<Room>('room')
        .update({status: RoomStatusEnum.INPROGRESS})
        .match({ id: roomId })
        .single();
  
      return body
    } catch (error) {
      console.log('error', error)
      throw error;
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