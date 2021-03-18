import styled from "styled-components";

export const BoardWrapper = styled.div`
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