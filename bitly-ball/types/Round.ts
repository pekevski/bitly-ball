export type Round = {
    id: string,
    round: number,
    playerId: string,
    roomId: string,
    points: number,
    phrase: string,
    created_at: Date,
    result: boolean,
    image: string;
}