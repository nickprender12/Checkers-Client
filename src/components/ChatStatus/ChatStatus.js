import React, { useContext, useState } from "react";
import styled from "styled-components";
import { SocketContext } from "../../context/socket";

const Wrapper = styled.div`
  /* background-color: rgba(36, 39, 59, 0.5); */
  font-size: 0.7rem;
  padding: 0.25rem;
  /* margin: .2rem; */
  /* height: 5%; */
  /* justify-content: center; */
  /* border-bottom: 1px solid rgba(255 255 255 / 35%); */
  color: rgba(255 255 255 / 85%);
`;

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
