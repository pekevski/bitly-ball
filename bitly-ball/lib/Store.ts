import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { createClient, SupbaseEv } from '@supabase/supabase-js'
import { Player } from '../types/Player';
import { Round } from '../types/Round';
import { Room, RoomStatusEnum } from '../types/Room';

const SUPABASE_URL: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY: string = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";


export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
)

type StoreProps = {
  roomId: string | undefined;
}

export const useStore = (props: StoreProps) => {
  const [room, setRoom] = useState<Room | undefined>(undefined);
  const [players, setPlayers] = useState<Player[]>([])
  const [newRoom, handleNewRoom] = useState<Room | undefined>(undefined)
  const [updatedRoom, handleUpdatedRoom] = useState<Room>();
  const [deletedRoom, handleDeletedRoom] = useState(null)
  const [deletedPlayer, handleDeletedPlayer] = useState<any>(null)
  const [updatedPlayer, handleUpdatedPlayer] = useState(null)
  const [newPlayer, handleNewPlayer] = useState<Player | undefined>(undefined)
  const [newRound, handleNewRound] = useState<Round | undefined>(undefined)
  const [deletedRound, handleDeletedRound] = useState(null)

  // Load initial data and set up listeners
  useEffect(() => {
    // Get Channels
    // fetchChannels(setChannels)

    // Listen for new and deleted rooms
    const roomListener = supabase
      .from<Room>('room') //`room:id=eq.${props.roomId}`)
      .on('INSERT', (payload) => handleNewRoom(payload.new))
      .on('UPDATE', (payload) => { 
        console.log('UPDATED A ROOM', payload); 
        handleUpdatedRoom(payload.new)
      })
      // .on('DELETE', (payload) => handleDeletedRoom(payload.old))
      .subscribe()

    // Listen for changes to our players
    const playerListener = supabase
      .from<Player>('player') // `player:roomId=eq.${props.roomId}`)
      .on('INSERT', (payload) => handleNewPlayer(payload.new))
      // .on('UPDATE', (payload) => handleUpdatedPlayer(payload.new))
      // .on('DELETE', (payload) => handleDeletedPlayer(payload.old))
      .subscribe()

    // Listen for new and deleted rounds
    const roundListener = supabase
      .from<Round>('round') //`round:roomId=eq.${props.roomId}`)
      .on('INSERT', (payload) => handleNewRound(payload.new))
      .on('DELETE', (payload) => handleDeletedRound(payload.old))
      .subscribe()

    // Cleanup on unmount
    return () => {
      roomListener.unsubscribe()
      playerListener.unsubscribe()
      roundListener.unsubscribe()
      console.log('unsubbed to listeners')
    }
  }, [])
  

  // Update when the room changes
  useEffect(() => {
    if (props?.roomId) {
      fetchRoom(props.roomId, setRoom);
      fetchPlayers(props.roomId, setPlayers);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.roomId])

  // New player received from Postgres
  useEffect(() => {
    if (newPlayer && newPlayer.roomId === props.roomId) {
      if (!players.find(p => p.id === newPlayer.id)) {
        setPlayers(players.concat(newPlayer))
      }
      console.log('new player triggered', newPlayer, players)
    }
  }, [newPlayer])

  // Updated room received from Postgres
  useEffect(() => {
    console.log('room triggered', updatedRoom);

    if (updatedRoom && updatedRoom.id === props.roomId) {
      setRoom(updatedRoom);
      console.log('updated room triggered', updatedRoom);
    }
  }, [updatedRoom])

  return {
    room,
    players
  }
}

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
 * Insert a new channel into the DB
 * @param {string} slug The channel name
 * @param {number} user_id The channel creator
 */
export const createRoom = async (rounds: number) => {
  try {
    let { body } = await supabase.from<Room>('room').insert({rounds}).single();
    return body
  } catch (error) {
    console.log('error', error)
  }
}

export const createPlayer = async (player: Partial<Player>) => {
  try {
    let { body } = await supabase.from<Player>('player').insert(player).single();
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