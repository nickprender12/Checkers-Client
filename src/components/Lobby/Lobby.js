import React from 'react'
import styled from "styled-components";


export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`
    

export default function Lobby(props) {

  return (
    <Wrapper>
      {props.children}
    </Wrapper>
  )
}
