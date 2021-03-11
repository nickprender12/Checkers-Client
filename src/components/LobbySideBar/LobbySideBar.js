import React from "react";
import styled from "styled-components";

import { GameList, UserList } from "../index";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  background-color: rgba(36, 39, 59, 0.3);
`;

export const GameSection = styled.section``;

export const UsersSection = styled.section``;

export default function LobbySideBar() {
  const handleClick = () => {
    console.log("clicked!");
  };

  return (
    <Wrapper>
      <GameSection>
        <h3>Join game</h3>
        <GameList />
        <button onClick={handleClick}>Start New Game</button>
      </GameSection>
      <UsersSection>
        <h3>Users online</h3>
        <UserList />
      </UsersSection>
    </Wrapper>
  );
}
