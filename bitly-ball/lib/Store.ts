import { useState, useEffect } from 'react';
import { Player } from '../types/Player';
import { Round } from '../types/Round';
import { Room } from '../types/Room';
import { supabase } from './SupbaseConfig';
import { fetchPlayers, fetchRoom, fetchRounds } from './Repository';

type StoreProps = {
  roomId: string | undefined;
};

export const useStore = (props: StoreProps) => {
  const [room, setRoom] = useState<Room | undefined>(undefined);
  const [players, setPlayers] = useState<Player[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);

  const [newRoom, handleNewRoom] = useState<Room | undefined>(undefined);
  const [updatedRoom, handleUpdatedRoom] = useState<Room | undefined>(
    undefined
  );
  const [deletedRoom, handleDeletedRoom] = useState<Room | undefined>(
    undefined
  );

  const [newPlayer, handleNewPlayer] = useState<Player | undefined>(undefined);
  const [deletedPlayer, handleDeletedPlayer] = useState<Player | undefined>(
    undefined
  );
  const [updatedPlayer, handleUpdatedPlayer] = useState<Player | undefined>(
    undefined
  );

  const [newRound, handleNewRound] = useState<Round | undefined>(undefined);
  const [deletedRound, handleDeletedRound] = useState<Round | undefined>(
    undefined
  );
  const [updatedRound, handleUpdatedRound] = useState<Round | undefined>(
    undefined
  );

  // Load initial data and set up listeners
  useEffect(() => {
    // Get Channels
    // fetchChannels(setChannels)

    // Listen for new and deleted rooms
    const roomListener = supabase
      .from<Room>('room') // TODO: improve listener `room:id=eq.${props.roomId}`)
      .on('INSERT', (payload) => handleNewRoom(payload.new))
      .on('UPDATE', (payload) => handleUpdatedRoom(payload.new))
      // .on('DELETE', (payload) => handleDeletedRoom(payload.old))
      .subscribe();

    // Listen for changes to our players
    const playerListener = supabase
      .from<Player>('player') // TODO: improve listener `player:roomId=eq.${props.roomId}`)
      .on('INSERT', (payload) => handleNewPlayer(payload.new))
      // .on('UPDATE', (payload) => handleUpdatedPlayer(payload.new))
      // .on('DELETE', (payload) => handleDeletedPlayer(payload.old))
      .subscribe();

    // Listen for new and deleted rounds
    const roundListener = supabase
      .from<Round>('round') // TODO: improve listener `round:roomId=eq.${props.roomId}`)
      // .on('INSERT', (payload) => handleNewRound(payload.new))
      .on('UPDATE', (payload) => handleUpdatedRound(payload.new))
      .on('DELETE', (payload) => handleDeletedRound(payload.old))
      .subscribe();

    // Cleanup on unmount
    return () => {
      roomListener.unsubscribe();
      playerListener.unsubscribe();
      roundListener.unsubscribe();
      console.log('unsubbed to listeners');
    };
  }, []);

  // Update when the room changes
  useEffect(() => {
    if (props?.roomId) {
      fetchRoom(props.roomId, setRoom);
      fetchPlayers(props.roomId, setPlayers);
      fetchRounds(props.roomId, setRounds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.roomId]);

  // New player received from Postgres
  useEffect(() => {
    if (newPlayer && newPlayer.roomId === props.roomId) {
      if (!players.find((p) => p.id === newPlayer.id)) {
        setPlayers(players.concat(newPlayer));
      }
      console.log('new player triggered', newPlayer, players);
    }
  }, [newPlayer]);

  // Updated room received from Postgres
  useEffect(() => {
    console.log('room triggered', updatedRoom);

    if (updatedRoom && updatedRoom.id === props.roomId) {
      setRoom(updatedRoom);
      console.log('updated room triggered', updatedRoom);
    }
  }, [updatedRoom]);

  useEffect(() => {
    console.log('new round triggered', newRound);

    if (newRound && newRound.roomId === props.roomId) {
      if (!rounds.find((r) => r.id === newRound.id)) {
        setRounds(rounds.concat(newRound));
      }
      console.log('new round triggered', newRound, rounds);
    }
  }, [newRound]);

  // Updated rounds received from Postgres
  useEffect(() => {
    console.log('round triggered', updatedRound);

    if (updatedRound && updatedRound.roomId === props.roomId) {
      // find the round in our list of rounds and update it
      const roundsCopy = [...rounds];
      let roundCopyIndex = roundsCopy.findIndex(
        (r) => (r.id = updatedRound.id)
      );

      if (roundCopyIndex > -1) {
        roundsCopy[roundCopyIndex] = updatedRound;
        setRounds(roundsCopy);
        console.log('updated round triggered', updatedRound);
      }
    }
  }, [updatedRound]);

  return {
    room,
    players,
    rounds
  };
};
