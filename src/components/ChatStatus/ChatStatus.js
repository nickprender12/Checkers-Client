import React, { useContext, useState } from "react";
import { SocketContext } from "../../context/socket";
import { Wrapper } from "./styles";

export default function ChatStatus({ currentUser, userList }) {
  const socket = useContext(SocketContext);
  const [isTyping, setIsTyping] = useState(false);

  const notTyping = () => {
    setIsTyping(false);
  };

  let opponent;

  const getOpponentName = () => {
    opponent = userList.filter((user) => user.name !== currentUser.name);
    return opponent[0].name;
  };

  socket.on("user is typing", () => {
    if (isTyping) {
      return;
    } else {
      setIsTyping(true);
      setTimeout(notTyping, 1500);
    }
  });

  return (
    <Wrapper>
      {userList.length > 1 ? (
        isTyping ? (
          <div>{`${getOpponentName()} is typing...`}</div>
        ) : (
          <div>{`Conversation with ${getOpponentName()}`}</div>
        )
      ) : (
        <div>{`Waiting for opponent...`}</div>
      )}
    </Wrapper>
  );
}
