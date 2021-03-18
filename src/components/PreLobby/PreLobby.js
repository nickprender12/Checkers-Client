import React, { useState, useContext } from "react";
import { SocketContext } from "../../context/socket";
import { Wrapper, Header, Form, Input, Button } from './styles'

export default function PreLobby() {
  const socket = useContext(SocketContext);
  const [username, setUsername] = useState("");

  const initNewUser = (name) => {
    socket.emit("new user", name);
  };

  const handleChange = (e) => setUsername(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    initNewUser(username);
  };

  return (
    <Wrapper>
      <Header>Join game lobby</Header>
      <p>Create a username</p>
      <Form action="" onSubmit={handleSubmit}>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={handleChange}
          autoComplete="off"
          placeholder={"username"}
          autoFocus
        />
      </Form>
      <Button>Enter</Button>
    </Wrapper>
  );
}
