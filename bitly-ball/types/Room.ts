export type Room = {
    id: string,
    createdDate: Date,
    rounds: number,
    status: RoomStatusEnum
}

export enum RoomStatusEnum {
    CREATED = 'created',
    INPROGRESS = 'inprogress',
}