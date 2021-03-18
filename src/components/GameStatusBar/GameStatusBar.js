import React from "react";
import { Wrapper } from "./styles";

export default function GameStatusBar({ activePlayer, players }) {
  let player = players.filter((player) => player.color === activePlayer);

  return (
    <Wrapper>
      {`${player[0].name}'s turn (${
        player[0].color === "red" ? "yellow" : "blue"
      })`}
    </Wrapper>
  );
}
