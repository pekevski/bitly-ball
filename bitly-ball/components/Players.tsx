import { Player } from '../types/Player';
import Loader from './Loader';

type PlayersProps = {
  players: Array<Player>;
  playerTurnId: string;
  currentPlayerId: string;
};

const Players: React.FC<PlayersProps> = ({
  players,
  currentPlayerId,
  playerTurnId
}) => {
  if (!players) {
    return <Loader />;
  } else {
    return (
      <>
        <div className="flex flex-col">
          <h4 className="">Players: {players.length}</h4>
          {players.map((player) => (
            <div key={player.id} className="border p-1 my-1">
              <h1>
                {player?.isHost ? '👑' : '👤'} {player.name}{' '}
                {currentPlayerId === player.id ? '⬅️ (me)' : ''}
              </h1>
              {playerTurnId && player.id === playerTurnId && (
                <h5>✨ (current turn)</h5>
              )}
            </div>
          ))}
        </div>
      </>
    );
  }
};

export default Players;
