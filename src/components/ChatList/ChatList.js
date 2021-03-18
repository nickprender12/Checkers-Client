import React, { useState, useContext } from "react";

import ChatBubble from "../ChatBubble";
import { TimeAgo } from "../../utils/TimeAgo";
import { SocketContext } from "../../context/socket";
import { MessageWindow, Messages, Msg, TimeStamp } from "./styles";

export default function ChatList(props) {
  const { user } = props;

  const [messageLog, setMessageLog] = useState([]);

  const socket = useContext(SocketContext);

  socket.on("chat message", (messages) => {
    setMessageLog(messages);
  });

  let messages = messageLog.map(({ message, date, id }, idx) => (
    <Msg key={idx} actPlayer={user.id === id}>
      <ChatBubble actPlayer={user.id === id} userColor={user.color}>
        {message}
      </ChatBubble>
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
