import React from 'react'
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* height: 50px; */
  /* padding-top: 5px; */
  margin-bottom: 15px;
  /* border: 1px solid rgba(36, 39, 59, 0.6); */
  color: white;
  /* font-weight: bold; */
`

export default function GameStatusBar({activePlayer, players}) {
  let player = players.filter((player) => player.color === activePlayer)

  return (
    <Wrapper>
      {`${player[0].name}'s turn (${player[0].color === 'red' ? 'yellow' : 'blue'})`}
    </Wrapper>
  )
}
