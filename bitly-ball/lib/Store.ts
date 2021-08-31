import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Player } from '../types/Player';
import { Round } from '../types/Round';
import { Room } from '../types/Room';

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
  const [room, setRoom] = useState("")
  const [players, setPlayers] = useState<Player[]>([])
  const [newRoom, handleNewRoom] = useState<Room | undefined>(undefined)
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
      .from<Room>('room')
      .on('INSERT', (payload) => handleNewRoom(payload.new))
      .on('DELETE', (payload) => handleDeletedRoom(payload.old))
      .subscribe()

    // Listen for changes to our players
    const playerListener = supabase
      .from<Player>('player')
      .on('INSERT', (payload) => handleNewPlayer(payload.new))
      // .on('UPDATE', (payload) => handleUpdatedPlayer(payload.new))
      // .on('DELETE', (payload) => handleDeletedPlayer(payload.old))
      .subscribe()

    // Listen for new and deleted rounds
    const roundListener = supabase
      .from<Round>('game')
      .on('INSERT', (payload) => handleNewRound(payload.new))
      .on('DELETE', (payload) => handleDeletedRound(payload.old))
      .subscribe()

    // Cleanup on unmount
    return () => {
      roomListener.unsubscribe()
      playerListener.unsubscribe()
      roundListener.unsubscribe()
      console.log('un subbed to listeners')
    }
  }, [])

  // Update when the room changes
  useEffect(() => {
    if (props?.roomId) {
      fetchPlayers(props.roomId, setPlayers);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.roomId])

  // New player recieved from Postgres
  useEffect(() => {
    if (newPlayer && newPlayer.roomId === props.roomId) {
      if (!players.find(p => p.id === newPlayer.id)) {
        setPlayers(players.concat(newPlayer))
      }
      console.log('new player triggered', newPlayer, players)
    }
  }, [newPlayer])

  return {
    players
  }
}

/**
 * Fetch all messages and their authors
 * @param {number} channelId
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchPlayers = async (roomId: string, setState: any) => {
  try {
    let { body } = await supabase
      .from<Player>('player')
      .select(`id, name`)
      .eq('roomId', roomId)
      .order('name', {ascending: true});
      
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
export const createRoom = async () => {
  try {
    let { body } = await supabase.from<Room>('room').insert({}).single();
    return body
  } catch (error) {
    console.log('error', error)
  }
}

export const createPlayer = async (name: string, roomId: string) => {
  try {
    let { body } = await supabase.from<Player>('player').insert([{name, roomId}]).single();
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