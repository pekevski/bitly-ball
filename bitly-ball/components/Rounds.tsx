import { useEffect, useState } from 'react';
import { Player } from '../types/Player';
import { Round } from '../types/Round';
import Loader from './Loader';

type RoundsProps = {
  rounds: Array<Round>;
  players: Map<string, Player>;
  currentRound?: Round;
  playerTurnId?: string;
};

const Rounds: React.FC<RoundsProps> = ({
  rounds,
  players,
  currentRound,
  playerTurnId
}) => {
  const [data, setData] = useState(new Map<number, Round[]>());

  useEffect(() => {
    if (rounds) {
      const d = constructTable(rounds, players);
      setData(d);
    }
  }, [rounds]);

  if (!rounds) {
    return <Loader />;
  } else {
    return (
      <>

        <table className={"table-auto w-full text-left"}>
          {Array.from(data.entries()).map((playerData, index) => (
            <tbody key={playerData[0]}>
              <tr>
                <th colSpan={4}>Round {index + 1}</th>
              </tr>
              {playerData[1]
                // .filter((r) => r.result)
                .map((round, index) => (
                  <tr key={round.id}>
                    <td>{currentRound?.id === round.id ? "✨" : ""} {players.get(round.playerId)?.isHost ? '👑' : '👤'} {players.get(round.playerId)?.name}</td>
                    <td>{round.phrase}</td>
                    <td>{round.points.toString()}</td>
                  </tr>
                )
              )}
            </tbody>
          ))}
        </table>
      </>
    );
  }
};


const constructTable = (rounds: Round[], players: Map<string, Player>) => {

  const result = new Map<number, Round[]>()

  rounds
    .sort((a,b) => {
      const cp = b.roundIndex - a.roundIndex
      if (cp === 0) {
        const p = players.get(a.playerId)

        if (p?.isHost) {
          return -1
        } else {
          return 1
        }
      }

      return cp
      
    })
    .forEach(r => {
      if (!result.has(r.roundIndex)) {
        result.set(r.roundIndex, [])
      }

      result.get(r.roundIndex)?.push(r);
    })

  return result;
}

export default Rounds;
