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

const Rounds: React.FC<RoundsProps> = ({ rounds, players, currentRound }) => {
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
      <table className={'table-auto w-full text-left'}>
        <tbody key={'total'}>
          <tr>
            <th colSpan={4}>Totals</th>
          </tr>
          {Array.from(totals.entries()).map(([playerId, score]) => (
            <tr key={'total' + playerId}>
              <td colSpan={3}>
                <div className={'flex flex-row items-center gap-x-2'}>
                  <h1 className={'text-xl text-gray-900 leading-tight'}>
                    {players.get(playerId)?.name}
                  </h1>
                  {players.get(playerId)?.isHost && (
                    <Pill label="Host" color="bg-blue-500" />
                  )}
                </div>
              </td>
              <td className="text-right">{score.toString()}</td>
            </tr>
          ))}
        </tbody>
        {Array.from(data.entries()).map(([playerId, rounds], index) => (
          <tbody key={playerId}>
            <tr>
              <th colSpan={4}>Round {index + 1}</th>
            </tr>
            <tr>
              <td className="flex flex-row flex-wrap basis-1/2">
                {rounds.map((round) => (
                  <RoundResultItem
                    key={round.id}
                    round={round}
                    player={players.get(round.playerId)}
                  />
                ))}
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
};

interface PillProps {
  label: string;
  color: string;
}

const Pill = (props: PillProps) => {
  return (
    <span
      className={'px-2 py-1 text-white text-sm rounded-full ' + props.color}
    >
      {props.label}
    </span>
  );
};

interface RoundResultItemProps {
  round: Round;
  player?: Player;
}

const RoundResultItem = (props: RoundResultItemProps) => {
  const { round, player } = props;

  if (!player) {
    return null;
  }

  return (
    <div
      className={
        'rounded-lg shadow-lg bg-gray-600 w-full h-64 p-3 antialiased bg-no-repeat bg-cover'
      }
      style={{
        backgroundImage: `url(${round.image})`,
        backgroundBlendMode: 'overlay'
      }}
    >
      <Pill label={player.name} color={'bg-gray-600'} />
      <div className={'w-full p-3 flex flex-col'}>
        {round.submitted && (
          <h2 className={'text-2xl text-gray-900 leading-tight'}>
            {round.phrase}
          </h2>
        )}
        {round.submitted && (
          <h2 className={'text-2xl text-gray-900 leading-tight'}>
            {round.points.toString()}
          </h2>
        )}
      </div>
    </div>
  );
};

interface DataResult {
  result: Map<number, Round[]>;
  totals: Map<string, number>;
}

const constructTable = (
  rounds: Round[],
  players: Map<string, Player>
): DataResult => {
  const result = new Map<number, Round[]>();
  const totals = new Map<string, number>();

  rounds
    .sort((a, b) => {
      const cp = b.roundIndex - a.roundIndex;
      if (cp === 0) {
        const p = players.get(a.playerId);

        if (p?.isHost) {
          return -1;
        } else {
          return 1;
        }
      }

      return cp;
    })
    .forEach((r) => {
      if (!result.has(r.roundIndex)) {
        result.set(r.roundIndex, []);
      }

      result.get(r.roundIndex)?.push(r);

      if (!totals.has(r.playerId)) {
        totals.set(r.playerId, 0);
      }

      const oldPoints = totals.get(r.playerId) || 0;
      totals.set(r.playerId, r.points + oldPoints);
    });

  return { result, totals };
};

export default Rounds;
