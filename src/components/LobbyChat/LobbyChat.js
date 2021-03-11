import React from 'react'
import { ChatInput, ChatList } from '../index'
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  background-color: rgba(36, 39, 59, 0.3);
  width: 75%;
  /* Height: 100%; */
  border: 1px solid black;
  /* @media screen and (max-width: 500px) {
    height: 38%;
    width: 100%;
  } */
`

export default function LobbyChat({user, userList}) {
  return (
    <Wrapper>
      <ChatList userList={userList}/>
      <ChatInput userList={userList} user={user}/>
    </Wrapper>
  )
}
