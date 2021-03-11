import React from "react";
import styled from "styled-components";

const PieceWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75%;
  height: 75%;
  /* border: 1px solid black; */
  border-radius: 100px;
  border: ${props => props.pieceData.isKing ? '1px solid white' : 'none'};
  -webkit-box-shadow: ${props => props.pieceData.isKing ? '1px 0px 15px 0px #FFFFFF;' : 'none'};
  box-shadow: ${props => props.pieceData.isKing ? '1px 0px 15px 0px #FFFFFF;' : 'none'};
`;

export default function GamePiece(props) {
  const { pieceData } = props;
  return (
    <PieceWrapper
      style={
        pieceData.color === "red"
        ? { backgroundColor: "rgb(224, 173, 20)" } //yellow
          : { backgroundColor: "RGBA(17, 166, 227, 1)" } //blue
      } pieceData={pieceData}
    >
      {pieceData.isKing ? "K" : null}
    </PieceWrapper>
  );
}
