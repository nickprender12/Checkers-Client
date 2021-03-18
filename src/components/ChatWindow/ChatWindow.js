import React from 'react'
import { Wrapper } from './styles'

export default function ChatWindow(props) {

  return (
    <Wrapper>
      {props.children}
    </Wrapper>
  )
}
