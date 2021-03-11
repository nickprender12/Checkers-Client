import React from 'react'
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  background-color: rgba(36, 39, 59, 0.3);
  width: 30%;
  Height: 100%;
  @media screen and (max-width: 500px) {
    height: 38%;
    width: 100%;
  }
`

export default function ChatWindow(props) {

  return (
    <Wrapper>
      {props.children}
    </Wrapper>
  )
}