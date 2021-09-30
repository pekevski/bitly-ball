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
            <div key={player.id}>
              <h1>{player.name}</h1>
            </div>
          )
        }
      </>
    )
  }

}

export default Players;