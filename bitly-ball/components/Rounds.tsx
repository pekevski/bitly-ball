import { Round } from "../types/Round";
import Loader from './Loader';

type RoundsProps = {
  rounds: Array<Round>;
};

const Rounds: React.FC<RoundsProps> = ({rounds}) => {
  
  if (!rounds) {
    return <Loader />
  } else {
    return (
      <>
        <h3>Rounds:</h3>
        {
          rounds.map((round) => 
            <div key={round.id} className="border border-red p-5 my-2">
              <h1>{round.id}</h1>
              <p>Phrase: {round.phrase}</p>
              <p>Points: {round.points.toString()}</p>
              <p>Result: {round.result}</p>
            </div>
          )
        }
      </>
    )
  }

}

export default Rounds;