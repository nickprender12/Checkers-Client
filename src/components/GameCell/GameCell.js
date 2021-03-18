import React from "react";
import { GamePiece } from "../index";
import isOdd from "../../utils/utils";
import { CellWrapper } from "./styles";

export default function GameCell(props) {
  const {
    board,
    cellData,
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
  let locationSum = cellData.location[0] + cellData.location[1];

  const handleClickCell = (e) => {
    e.preventDefault();
    if (
      cellData.piece &&
      cellData.piece.color === activePlayer &&
      cellData.piece.id === userId
    ) {
      setActivePieceLoc(cellData.location);
      setActivePiece(cellData);
      showMoves(board, cellData.location[1], cellData.location[0]);
    }
    if (cellData.available) {
      movePiece(cellData.location, players);
      changeTurn();
    }
  };

  return (
    <CellWrapper
      onClick={handleClickCell}
      style={
        cellData.location === activePieceLoc || cellData.available
          ? { backgroundColor: "rgb(214, 214, 214)" }
          : {
              backgroundColor: isOdd(locationSum)
                ? "transparent"
                : "rgba(36, 39, 59, 0.6)",
            }
      }
    >
      {cellData.piece ? <GamePiece pieceData={cellData.piece} /> : <div></div>}
    </CellWrapper>
  );
}
