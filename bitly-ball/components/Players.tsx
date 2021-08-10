import { useState } from "react"
import { Player } from "../types/Player";

type PlayersProps = {
  players: Map<string, Player>;
};

const Players: React.FC<PlayersProps> = (props) => {
  
  return (
    <>
      {
        Array.from(props.players).map((player) => 
          <div key={player[1].id}>
            <h1>{player[1].name}</h1>
          </div>
        )
      }
    </>
  )
}

export default Players;