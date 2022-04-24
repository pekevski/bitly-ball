import { json } from 'stream/consumers';
import { Round } from '../types/Round';
import Loader from './Loader';

type RoundsProps = {
  rounds: Array<Round>;
  currentRound?: Round;
  roundIndex?: number;
};

const Rounds: React.FC<RoundsProps> = ({
  rounds,
  currentRound,
  roundIndex
}) => {
  if (!rounds) {
    return <Loader />;
  } else {
    return (
      <>
        <h4>Current Round</h4>
        <p>Index: {roundIndex}</p>
        <p>{JSON.stringify(currentRound, null, 2)}</p>

        <hr />

        <h3>Rounds:</h3>
        {rounds
          .filter((r) => r.result)
          .map((round) => (
            <div key={round.id} className="border border-red p-5 my-2">
              <h1>{round.id}</h1>
              <p>Phrase: {round.phrase}</p>
              <p>Points: {round.points.toString()}</p>
              <p>Result: {round.result}</p>
              <p>Index: {round.roundIndex}</p>
              <p>Player: {round.playerId}</p>
              <p>Created: {round.createdDate.toString()}</p>
            </div>
          ))}
      </>
    );
  }
};

export default Rounds;
