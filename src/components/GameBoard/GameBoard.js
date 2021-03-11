import React from "react";
import { GameCell } from "../index";
import styled from "styled-components";

const BoardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-flow: row wrap;
  width: 500px;
  height: 500px;
  border: 1px solid rgba(36, 39, 59, 0.6);
  @media screen and (max-width: 500px) {
    width: 370px;
    height: 370px;
    /* border-bottom: 1px solid rgba(36, 39, 59, 0.6); */
  }
`;

export default function GameBoard(props) {
  const {
    board,
    activePlayer,
    activePieceLoc,
    setActivePieceLoc,
    showMoves,
    players,
    movePiece,
    changeTurn,
    setActivePiece,
    userId,
  } = props;
  return (
    <BoardWrapper>
      {board.map((row) => {
        return row.map((cellData) => {
          return (
            <GameCell
              key={cellData.location}
              cellData={cellData}
              board={board}
              activePlayer={activePlayer}
              activePieceLoc={activePieceLoc}
              setActivePieceLoc={setActivePieceLoc}
              showMoves={showMoves}
              players={players}
              movePiece={movePiece}
              changeTurn={changeTurn}
              setActivePiece={setActivePiece}
              userId={userId}
            />
          );
        });
      })}
    </BoardWrapper>
  );
}
