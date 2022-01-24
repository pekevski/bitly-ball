import { Player } from "../types/Player";


const BITLY_BALL_PLAYER_KEY = "Bitly_Ball_Player"

export const savePlayerLocalStorage = (player: Player): void => {
    localStorage.setItem(BITLY_BALL_PLAYER_KEY, JSON.stringify(player))
}

export const getPlayerLocalStorage = (): Player | undefined => {
    const playerJson = localStorage.getItem(BITLY_BALL_PLAYER_KEY);
    
    if (playerJson) {
        return JSON.parse(playerJson)
    }

    return undefined;
}