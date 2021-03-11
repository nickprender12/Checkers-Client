import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../context/socket";
import {
  Header,
  PreLobby,
  GameWindow,
  ChatWindow,
  ChatInput,
  ChatList,
} from "../index";

import { Wrapper, Container } from "./styles";

export default function AppWindow() {
  const [inLobby, setInLobby] = useState(true);
  const [userList, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("user disconnected", (users) => {
      setUserList(users);
    });
    socket.on("new user", (users) => {
      setUserList(users);
    });
    socket.on("current user", (user) => {
      setCurrentUser(user);
      setInLobby(false);
    });
    return () => {
      socket.off("user disconnected");
      socket.off("new user");
      socket.off("current user");
    };
  }, [socket]);

  return (
    <div>
      {!inLobby ? (
        <Wrapper>
          <Header />
          <Container>
            <GameWindow
              userList={userList}
              currentUser={currentUser}
            ></GameWindow>
            <ChatWindow>
              <ChatList user={currentUser} />
              <ChatInput user={currentUser} userList={userList} />
            </ChatWindow>
          </Container>
        </Wrapper>
      ) : (
        <Wrapper>
          <Header />
          <PreLobby />
        </Wrapper>
      )}
    </div>
  );
}
