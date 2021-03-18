import React from "react";
import { Bubble } from './styles'

export default function ChatBubble(props) {
  const { actPlayer, userColor } = props;
  return (
    <Bubble activePlayer={actPlayer} userColor={userColor}>
      {props.children}
    </Bubble>
  );
}
