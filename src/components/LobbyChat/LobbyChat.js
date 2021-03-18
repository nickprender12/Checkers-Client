import React from "react";
import { ChatInput, ChatList } from "../index";
import { Wrapper } from "./styles";

export default function LobbyChat({ user, userList }) {
  return (
    <Wrapper>
      <ChatList userList={userList} />
      <ChatInput userList={userList} user={user} />
    </Wrapper>
  );
}
