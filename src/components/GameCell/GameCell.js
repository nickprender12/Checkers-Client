import React from "react";
import { GamePiece } from "../index";
import isOdd from "../../utils/utils";
import styled from "styled-components";

const CellWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12.5%;
  height: 12.5%;
  @media screen and (max-width: 500px) {
    width: 12.5%;
  height: 12.5%;
    /* border-bottom: 1px solid rgba(36, 39, 59, 0.6); */
  }
`;

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
