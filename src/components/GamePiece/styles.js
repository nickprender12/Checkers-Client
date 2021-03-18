import styled from "styled-components";

export const PieceWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75%;
  height: 75%;
  /* border: 1px solid black; */
  border-radius: 100px;
  border: ${(props) => (props.pieceData.isKing ? "1px solid white" : "none")};
  -webkit-box-shadow: ${(props) =>
    props.pieceData.isKing ? "1px 0px 15px 0px #FFFFFF;" : "none"};
  box-shadow: ${(props) =>
    props.pieceData.isKing ? "1px 0px 15px 0px #FFFFFF;" : "none"};
`;
