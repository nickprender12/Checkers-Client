import React, { useState, useContext } from "react";

import styled from "styled-components";
import ChatBubble from "../ChatBubble";
import { TimeAgo } from "../../utils/TimeAgo";
import { SocketContext } from "../../context/socket";

const MessageWindow = styled.div`
  display: flex;
  /* flex: 0; */
  border-bottom: 1px solid rgba(255 255 255 / 35%);
  overflow: scroll;
  overflow-x: hidden; /*removes horizontal scroll bar */
  flex-direction: column-reverse;
  height: 90%;

  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: rgb(1 2 3 / 10%);
  }

  ::-webkit-scrollbar {
    width: 6px;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgb(1 2 3 / 40%);
    border-radius: 10px;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    /* height: 75%; */
    /* margin: 0; */
  }
`;
const Messages = styled.div`
  /* justify-content: right; */
  /* align-items: right; */
  /* text-align: left; */
  /* margin: 20px; */
`;

const Msg = styled.div`
  /* justify-content: right; */
  text-align: right;
  text-align: ${(props) => (props.actPlayer ? "right" : "left")};
  padding-right: 0.5rem;
`;

const TimeStamp = styled.div`
  color: rgba(225, 225, 225, 0.9);
  font-size: small;
  font-weight: thin;
`;

export default function ChatList(props) {
  const { user } = props;

  const [messageLog, setMessageLog] = useState([]);

  const socket = useContext(SocketContext);

  socket.on("chat message", (messages) => {
    setMessageLog(messages);
  });

  let messages = messageLog.map(({ message, date, id }, idx) => (
    <Msg key={idx} actPlayer={user.id === id}>
      <ChatBubble actPlayer={user.id === id} userColor={user.color}>{message}</ChatBubble>
      <TimeStamp>
        <TimeAgo timestamp={date} />
      </TimeStamp>
    </Msg>
  ));

  return (
    <MessageWindow>
      <Messages>{messages}</Messages>
    </MessageWindow>
  );
}
