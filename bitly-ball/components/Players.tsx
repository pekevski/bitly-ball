import { Player } from "../types/Player";
import Loader from './Loader';

type PlayersProps = {
  players: Array<Player>;
};

const Players: React.FC<PlayersProps> = ({players}) => {
  
  if (!players) {
    return <Loader />
  } else {
    return (
      <>
        {
          players.map((player) => 
            <div key={player.id} className="border border-black p-5 m-2">
              <h1>{player.name}</h1>
              <p>Host: {player.isHost.toString()}</p>
            </div>
          )
        }
      </>
    )
  }

}

export default Players;