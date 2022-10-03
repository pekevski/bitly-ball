import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { Player } from '../types/Player';
import { Round } from '../types/Round';
import Loader from './Loader';

type RoundsProps = {
  rounds: Array<Round>;
  players: Map<string, Player>;
  currentRound?: Round;
};

const Rounds: React.FC<RoundsProps> = ({
  rounds,
  players,
  currentRound,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState(new Map<number, Round[]>());
  const [totals, setTotals] = useState(new Map<string, number>());

  useMemo(() => {
    if (rounds) {
      const result = constructTable(rounds, players);
      setData(result.result);
      setTotals(result.totals);
      setLoading(false);
    }
  }, [rounds]);

  if (loading) {
    return <Loader />;
  }
  
  return (
    <>

      <table className={"table-auto w-full text-left"}>
          <tbody key={"total"}>
            <tr>
              <th colSpan={4}>Totals</th>
            </tr>
            {Array.from(totals.entries()).map((totalData) => (
                <tr key={"total"+ totalData[0]}>
                  <td colSpan={3}>
                    {players.get(totalData[0])?.isHost ? '👑' : '👤'} {players.get(totalData[0])?.name}
                  </td>
                  <td className='text-right'>{totalData[1].toString()}</td>
                </tr>
            ))}
          </tbody>
        {Array.from(data.entries()).map((playerData, index) => (
          <tbody key={playerData[0]}>
            <tr>
              <th colSpan={4}>Round {index + 1}</th>
            </tr>
            {playerData[1]
              .map((round) => (
                <tr key={round.id}>
                  <td>{currentRound?.id === round.id ? "✨" : ""} {players.get(round.playerId)?.isHost ? '👑' : '👤'} {players.get(round.playerId)?.name}</td>
                  <td>{round.phrase}</td>
                  <td className='text-center'>
                    {round.image && <img src={round.image} width={200} height={100} /> }
                  </td>
                  <td className='text-right'>{round.points.toString()}</td>
                </tr>
              )
            )}
          </tbody>
        ))}


      </table>
    </>
  );
  
};

interface DataResult {
  result: Map<number, Round[]>;
  totals: Map<string, number>;
}

const constructTable = (rounds: Round[], players: Map<string, Player>): DataResult => {

  const result = new Map<number, Round[]>()
  const totals = new Map<string, number>();

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

      if (!totals.has(r.playerId)) {
        totals.set(r.playerId, 0);
      }

      const oldPoints = totals.get(r.playerId) || 0
      totals.set(r.playerId, r.points + oldPoints);
    })

  return { result, totals };
}

export default Rounds;
