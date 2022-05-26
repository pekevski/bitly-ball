export type Round = {
  id: string;
  roundIndex: number;
  playerId: string;
  roomId: string;
  points: number;
  phrase: string;
  createdDate: Date;
  result: boolean;
  image: string;
  submitted: boolean;
};
