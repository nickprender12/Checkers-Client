import styled from "styled-components";

export const CellWrapper = styled.div`
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
