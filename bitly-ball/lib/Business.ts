// Handles all business logic
// Only interfaces with Repository.ts
import { Player } from '../types/Player';
import { RoomStatusEnum } from '../types/Room';
import { Round } from '../types/Round';
import * as database from './Repository';

// Starts a room for all players when the host is ready to begin
export const startRoom = async (roomId: string, rounds: number, players: Array<Player>): Promise<Array<Round> | null> => {
    
    try {
        // Put the room in an inprogress status
        await database.updateRoom({id: roomId, status: RoomStatusEnum.INPROGRESS});

        // Pick a player in the room
        // Initially lets pick the first player created in the room (the host)
        // TODO: maybe enhance this to be a random player. We will need to preserve
        // ordering of the rooms' players somehow between sessions / refreshes of 
        // the page
        // Randomly select a player
        // const startingPlayer = players[Math.floor(Math.random() * players.length)];

        // Create all the rounds for the game based on the rounds and players
        const roundsToCreate: Array<Partial<Round>> = new Array();

        for (let roundIndex = 0; roundIndex < rounds; roundIndex++) {
            players.forEach((player) => {
                const roundToCreate: Partial<Round> = {
                    roundIndex: roundIndex,
                    playerId: player.id,
                    roomId: roomId,
                    // provide date to enforce round ordering by createdDate
                    createdDate: new Date(), 
                }

                roundsToCreate.push(roundToCreate);
            });
        }

        return await database.createManyRounds(roundsToCreate);
    } catch (e) {
        console.error(e)
        throw e
    }
}

// Create a player for a room
export const createPlayer = async (player: Partial<Player>): Promise<Player | null> => {

    try {
        if (!player.userId) {
          throw new Error("Cannot create player without logging in to Bitly. Missing user")
        }
  
        if (!player.roomId) {
          throw new Error("Cannot create player without logging in to Bitly. Missing room")
        }
  
        const roomHasPlayer = await database.fetchPlayerByUserIdAndRoomId(player.userId, player.roomId);
  
        if (roomHasPlayer) {
          throw new Error(`User: ${player.userId} already exists in room: ${player.roomId}`)
        }
  
        let createdPlayer = await database.createPlayer(player)

        return createdPlayer;
    } catch (error) {
        console.log('error', error)
        throw error;
    }
}