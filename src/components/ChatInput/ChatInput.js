import React, { useState, useContext } from "react";
import { SocketContext } from '../../context/socket'
import styled from "styled-components";
import ChatStatus from '../ChatStatus'

const MessageBar = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: center;
  align-content: center;
  /* height: 10%; */
`;

const TextField = styled.div`
  /* padding-top: 5%; */
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  @media screen and (max-width: 500px) {
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  border: 1px solid rgba(255 255 255 / 35%);
  border-radius: 20px;
`;

const Input = styled.input`
  margin: 0.5rem;
  flex-grow: 2;
  border: none;
  background-color: transparent;
  color: #fff;
  &:focus {
    outline: none;
  }
  ::placeholder {
    color: white;
    font-size: 1em;
  }
`;

const Btn = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  font-size: large;
  color: #fff;
`;

export default function ChatInput(props) {
  const { user, userList } = props;

  const socket = useContext(SocketContext);

  const [message, setMessage] = useState("");

  const sendMessage = (msg) => {
    socket.emit("chat message", { user, msg });
  };

  const sendIsTyping = () => {
    socket.emit("user is typing");
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    if (userList.length > 1) {
      sendIsTyping();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  return (
    <MessageBar>
      <ChatStatus userList={userList} currentUser={user}/>
      <TextField>
        <Form action="" onSubmit={handleSubmit}>
          <Input
            type="text"
            value={message}
            placeholder={"message"}
            onChange={handleChange}
            autoComplete="off"
            autoFocus
            repeat="true"
          />
          <Btn>{">"}</Btn>
        </Form>
      </TextField>
    </MessageBar>
  );
}
