import styled from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* flex: 0;  */
  color: white;
  width: 47rem;
  /* height: 40rem; */
  height: 70vh;
  min-height: 40rem;
  margin-top: 5rem;
  overflow: hidden;
  background-color: rgba(36, 39, 59, 0.3);
  border-radius: 20px;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  @media screen and (max-width: 500px) {
    width: 100vw;
    border-radius: 0px;
    margin-top: 0px;
    height: 90vh;
    font-size: 1.5rem;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 90%;
  @media screen and (max-width: 500px) {
    flex-direction: column;
    font-size: 1.25rem;
    align-items: center
  }
`;