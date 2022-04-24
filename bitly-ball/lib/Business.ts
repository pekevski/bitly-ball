// Handles all business logic
// Only interfaces with Repository.ts
import { Player } from '../types/Player';
import { RoomStatusEnum } from '../types/Room';
import * as database from './Repository';

// Starts a room for all players when the host is ready to begin
export const startRoom = async (roomId: string): Promise<void> => {
    
    // Put the room in an inprogress status
    await database.updateRoomStatus(roomId, RoomStatusEnum.INPROGRESS);

    // Randomly pick a player in the room
    // TODO: xx

    // Create a round for that player
    // TODO: xx

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