import React from "react";
import { PieceWrapper } from "./styles";

export default function GamePiece(props) {
  const { pieceData } = props;
  return (
    <PieceWrapper
      style={
        pieceData.color === "red"
          ? { backgroundColor: "rgb(224, 173, 20)" } //yellow
          : { backgroundColor: "RGBA(17, 166, 227, 1)" } //blue
      }
      pieceData={pieceData}
    >
      {pieceData.isKing ? "K" : null}
    </PieceWrapper>
  );
}
