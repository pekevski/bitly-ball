import { useStore } from "../lib/Store";
import Loader from './Loader';

type PlayersProps = {
  roomId: string;
};

const Players: React.FC<PlayersProps> = ({roomId}) => {
  
  const { players } = useStore({ roomId });

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