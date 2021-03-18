import styled from "styled-components";

export const GameBox = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  /* height: 90%; */
  border-right: 1px solid rgba(36, 39, 59, 0.6);
  padding: 1rem;
  @media screen and (max-width: 500px) {
    /* width: 100vw;
    height: 57%; */
    height: 90%;
    border-bottom: 1px solid rgba(36, 39, 59, 0.6);
  }
`;
