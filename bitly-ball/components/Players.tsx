import { Player } from "../types/Player";
import Loader from "./Loader";

type PlayersProps = {
  players: Array<Player>;
  playerTurnId: string;
  currentPlayerId: string;
};

const Players: React.FC<PlayersProps> = ({
  players,
  currentPlayerId,
  playerTurnId,
}) => {
  if (!players) {
    return <Loader />;
  } else {
    return (
      <>
        <div className="m-2 flex items-center">
          <h4 className="mx-4">{players.length} Players</h4>
          {players.map((player) => (
            <div
              key={player.id}
              className="border rounded-lg border-black p-1 m-1"
            >
              <h1>{player.name}</h1>
              <p>Host: {player?.isHost ? "Host" : "Guest"}</p>
              {playerTurnId && player.id === playerTurnId && (
                <h5 className="text-green">Current Turn</h5>
              )}
              {currentPlayerId && player.id === currentPlayerId && (
                <h5 className="font-green">ME</h5>
              )}
            </div>
          ))}
        </div>
      </>
    );
  }
};

export default Players;
