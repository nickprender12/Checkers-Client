import React from "react";
import { GameCell } from "../index";
import { BoardWrapper } from './styles'

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
