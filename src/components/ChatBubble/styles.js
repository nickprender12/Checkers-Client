import styled from "styled-components";

export const Bubble = styled.section`
  display: inline-block;
  color: white;
  text-align: left;
  /* text-align: ${(props) => (props.activePlayer ? "left" : "right")}; */
  /* align-content: center;
  align-items: center; */
  /* background-color: ${(props) =>
    props.activePlayer ? "rgba(17, 100, 227, 1)" : "rgba(224, 173, 20, .7)"}; */
  background-color: ${(props) =>
    props.activePlayer && props.userColor === "yellow" 
      ? "rgba(224, 173, 20, .7)"
      : props.activePlayer && props.userColor === "blue" 
      ? "rgba(17, 100, 227, 1)" 
      : !props.activePlayer && props.userColor === "yellow"
      ? "rgba(17, 100, 227, 1)"
      : "rgba(224, 173, 20, .7)"
    };
  max-width: 85%;
  word-wrap: break-word;
  padding: 0.6rem;
  margin: 0.5rem;
  border-radius: 15px 5px 15px;
  border-radius: ${(props) =>
    props.activePlayer ? "5px 15px 5px;" : "15px 5px 15px;"};
  @media screen and (max-width: 500px) {
    max-width: 85%;
    font-size: 1rem;
  }
  @media screen and (max-width: 900px) {
    max-width: 85%;
    font-size: 1rem;
  }
`;