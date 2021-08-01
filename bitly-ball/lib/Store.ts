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

/**
 * @param {number} channelId the currently selected Channel
 */
export const useStore = (props: StoreProps) => {
  const [room, setRoom] = useState("")
  const [players, setPlayers] = useState(new Map())
  const [newRoom, handleNewRoom] = useState(null)
  const [deletedRoom, handleDeletedRoom] = useState(null)
  const [deletedPlayer, handleDeletedPlayer] = useState<any>(null)
  const [updatedPlayer, handleUpdatedPlayer] = useState(null)
  const [newPlayer, handleNewPlayer] = useState<any>(null)
  const [newRound, handleNewRound] = useState(null)
  const [deletedRound, handleDeletedRound] = useState(null)

  // Load initial data and set up listeners
  useEffect(() => {
    // Get Channels
    // fetchChannels(setChannels)

    // Listen for new and deleted rooms
    const roomListener = supabase
      .from('room')
      .on('INSERT', (payload) => handleNewRoom(payload.new))
      .on('DELETE', (payload) => handleDeletedRoom(payload.old))
      .subscribe()

    // Listen for changes to our players
    const playerListener = supabase
      .from('player')
      .on('INSERT', (payload) => handleNewPlayer(payload.new))
      .on('UPDATE', (payload) => handleUpdatedPlayer(payload.new))
      .on('DELETE', (payload) => handleDeletedPlayer(payload.old))
      .subscribe()

    // Listen for new and deleted rounds
    const channelListener = supabase
      .from('game')
      .on('INSERT', (payload) => handleNewRound(payload.new))
      .on('DELETE', (payload) => handleDeletedRound(payload.old))
      .subscribe()

    // Cleanup on unmount
    return () => {
      roomListener.unsubscribe()
      playerListener.unsubscribe()
      channelListener.unsubscribe()
    }
  }, [])

  // Update when the route changes
  useEffect(() => {
    if (props?.roomId) {
      fetchPlayers(props.roomId, (players: {id: string, name: string}[]) => {
        const users = new Map()
        players.forEach((p) => users.set(p.id, p.name))
        setPlayers(users)
      })
    }
  }, [props.roomId])

  // New message recieved from Postgres
  // useEffect(() => {
  //   if (newMessage && newMessage.channel_id === Number(props.channelId)) {
  //     const handleAsync = async () => {
  //       let authorId = newMessage.user_id
  //       if (!users.get(authorId)) await fetchUser(authorId, (user) => handleNewOrUpdatedUser(user))
  //       setMessages(messages.concat(newMessage))
  //     }
  //     handleAsync()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [newMessage])

  // New player recieved from Postgres
  useEffect(() => {
    if (newPlayer) setPlayers(players.set(newPlayer.id, newPlayer.name))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPlayer])

  // // Deleted player received from postgres
  // useEffect(() => {
  //   if (deletedPlayer) {
  //     players.delete(deletedPlayer.id);
  //     setPlayers(players)
  //   }
  // }, [deletedPlayer])

  return {
    players,
  }
}

// /**
//  * Fetch all channels
//  * @param {function} setState Optionally pass in a hook or callback to set the state
//  */
// export const fetchChannels = async (setState) => {
//   try {
//     let { body } = await supabase.from('channels').select('*')
//     if (setState) setState(body)
//     return body
//   } catch (error) {
//     console.log('error', error)
//   }
// }


/**
 * Fetch all messages and their authors
 * @param {number} channelId
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchPlayers = async (roomId: string, setState: any) => {
  try {
    let { body } = await supabase
      .from('player')
      .select(`id, name`)
      .eq('roomId', roomId)
      .order('inserted_at', {ascending: true});
      
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
    let { body } = await supabase.from('room').insert([])
    return body
  } catch (error) {
    console.log('error', error)
  }
}

/**
 * Insert a new player into the DB
 * @param {string} name The message text
 * @param {number} roomId
 */
// export const addPlayer = async (name: string, roomId: string) => {
//   try {
//     let { body } = await supabase.from('player').insert([{ name, roomId }])
//     return body
//   } catch (error) {
//     console.log('error', error)
//   }
// }

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